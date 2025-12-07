import { GoogleGenAI, Chat } from "@google/genai";
import { PRODUCTS } from "../constants";

let chatSession: Chat | null = null;

const formatProductContext = () => {
  return PRODUCTS.map(p => 
    `- ${p.name} (${p.category}): ${p.price} VND. Đặc điểm: ${p.features.join(', ')}. Mô tả: ${p.description}`
  ).join('\n');
};

export const initializeChat = () => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.warn("API Key is missing for Gemini");
        return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `Bạn là trợ lý bán hàng ảo thông minh của cửa hàng "BaloViet".
        Nhiệm vụ của bạn là tư vấn balo cho khách hàng dựa trên nhu cầu của họ (sinh viên, nhân viên văn phòng, du lịch, ngân sách, kích thước laptop).
        
        Đây là danh sách sản phẩm hiện có của cửa hàng:
        ${formatProductContext()}
        
        Quy tắc trả lời:
        1. Luôn thân thiện, lịch sự, xưng hô là "mình" và gọi khách là "bạn".
        2. Chỉ giới thiệu các sản phẩm có trong danh sách trên.
        3. Nếu khách hỏi về sản phẩm không có, hãy khéo léo gợi ý sản phẩm tương tự trong danh sách.
        4. Trả lời ngắn gọn, súc tích (dưới 100 từ) trừ khi khách hỏi chi tiết.
        5. Đơn vị tiền tệ là VND.
        6. Cuối câu trả lời nên gợi ý khách "Thêm vào giỏ hàng" nếu họ có vẻ thích.
        `,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to init chat", error);
    return null;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initializeChat();
  }
  
  if (!chatSession) {
      return "Xin lỗi, hệ thống tư vấn đang bảo trì. Vui lòng thử lại sau.";
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "Xin lỗi, mình chưa hiểu ý bạn.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã xảy ra lỗi kết nối. Vui lòng thử lại.";
  }
};
