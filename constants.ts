import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Campus Mate Pro",
    price: 450000,
    category: 'student',
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    description: "Balo siêu nhẹ, chống nước, có ngăn đựng laptop 15.6 inch. Phù hợp cho sinh viên năng động.",
    features: ["Chống nước", "Ngăn Laptop 15.6\"", "Nhiều ngăn phụ"]
  },
  {
    id: 2,
    name: "Office Sleek",
    price: 850000,
    category: 'office',
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=800&q=80",
    description: "Thiết kế tối giản, sang trọng. Da tổng hợp cao cấp, phù hợp môi trường công sở.",
    features: ["Da PU cao cấp", "Form cứng cáp", "Ngăn chống sốc dày"]
  },
  {
    id: 3,
    name: "Tech Runner 2.0",
    price: 1200000,
    category: 'office',
    image: "https://images.unsplash.com/photo-1618389042491-095edb6613da?auto=format&fit=crop&w=800&q=80",
    description: "Balo công nghệ màu đen tuyền. Ngăn chứa rộng rãi cho dân IT, tích hợp cổng sạc.",
    features: ["Cổng sạc USB", "Chống trộm", "Ngăn Laptop 17\""]
  },
  {
    id: 4,
    name: "Student Basic",
    price: 320000,
    category: 'student',
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=800&q=80",
    description: "Bền bỉ, giá cả phải chăng. Màu vàng cá tính cho các bạn trẻ nổi bật.",
    features: ["Vải Canvas bền", "Nhẹ", "Giá sinh viên"]
  },
  {
    id: 5,
    name: "Nomad Weekender",
    price: 950000,
    category: 'travel',
    image: "https://images.unsplash.com/photo-1503160865267-af4660ce7bf2?auto=format&fit=crop&w=800&q=80",
    description: "Balo đa năng phong cách dã ngoại. Dung tích lớn 30L, chất liệu canvas bụi bặm.",
    features: ["Dung tích 30L", "Mở rộng 180 độ", "Đai trợ lực"]
  },
  {
    id: 6,
    name: "Classic Leather",
    price: 1500000,
    category: 'office',
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    description: "Đẳng cấp doanh nhân. Thiết kế thủ công tinh xảo, màu da bò tự nhiên.",
    features: ["Da cao cấp", "Bảo hành 2 năm", "Thiết kế Vintage"]
  },
  {
    id: 7,
    name: "Metro Slim",
    price: 650000,
    category: 'office',
    image: "https://images.unsplash.com/photo-1585916420730-d7f95e942d43?auto=format&fit=crop&w=800&q=80",
    description: "Mỏng nhẹ, thanh lịch. Thích hợp cho những ngày đi họp nhẹ nhàng.",
    features: ["Siêu mỏng", "Chống nước", "Ngăn tablet"]
  },
  {
    id: 8,
    name: "Urban Grey",
    price: 550000,
    category: 'student',
    image: "https://images.unsplash.com/photo-1509762774605-f07235a08f1f?auto=format&fit=crop&w=800&q=80",
    description: "Phong cách hiện đại, màu xám trung tính dễ phối đồ. Đệm vai êm ái.",
    features: ["Đệm vai dày", "Vải trượt nước", "Ngăn phụ tiện lợi"]
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'Tất cả' },
  { id: 'student', name: 'Sinh Viên' },
  { id: 'office', name: 'Văn Phòng' },
  { id: 'travel', name: 'Du Lịch' },
];