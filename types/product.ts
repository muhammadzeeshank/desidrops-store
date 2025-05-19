export interface Product {
  id: string;
  name: string;
  intro: string;
  description?: string;
  slug: string;
  images: string[]; // URLs of images
  price: number;
  discount?: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId?: string;
}
