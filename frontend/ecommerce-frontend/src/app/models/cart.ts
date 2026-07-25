export interface CartItem {
  _id: string;
  quantity: number;

  productId: {
    _id: string;
    title: string;
    description: string;
    price: number;
    finalPrice: number;
    images: string[];
  };
}

export interface CartResponse {
  message: string;
  data: CartItem[];
}