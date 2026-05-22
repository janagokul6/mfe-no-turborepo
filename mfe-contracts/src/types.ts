export type User = {
  id?: string | number;
  email?: string;
  name?: string;
  [key: string]: any;
};

export type Product = {
  id?: string | number;
  title?: string;
  name?: string;
  price?: number;
  image?: string;
  thumbnail?: string;
  [key: string]: any;
};

export type CartItem = {
  productId: any;
  qty?: number;
  title?: string;
  price?: number;
};

export type Cart = {
  items?: CartItem[];
  userId?: any;
  [key: string]: any;
};

export type OrderItem = {
  productId: any;
  title?: string;
  price?: number;
  qty?: number;
  image?: string;
};

export type Order = {
  id: string;
  userId: string;
  createdAt: string;
  items: OrderItem[];
  total: number;
  status: string;
};
