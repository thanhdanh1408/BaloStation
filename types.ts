export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'student' | 'office' | 'travel';
  image: string;
  description: string;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type ViewState = 'home' | 'products' | 'cart' | 'checkout' | 'success';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
