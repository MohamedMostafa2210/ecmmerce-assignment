export interface Order {
  _id: string;
  userId: string;
  status: string;
  totalPrice: number;
  finalPrice: number;
  createdAt: string;
  items?: OrderItem[];
}

export interface OrderItem {
  _id: string;
  productId: any;
  quantity: number;
  price: number;
}
