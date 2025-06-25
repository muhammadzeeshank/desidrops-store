import { z } from "zod";

export const OrderProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  quantity: z.number().min(1),
});

export type OrderProduct = z.infer<typeof OrderProductSchema>;


export type SanityOrderType = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  postalCode?: string;
  city?: string;

  currency: string;
  subTotal: number;
  standardDiscount?: number;
  couponDiscountAmount?: number;
  totalDiscount?: number;
  totalPrice: number;

  products: OrderProduct[];

  status?: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  orderDate?: string; 
  clerkUserId?: string | null;
};




export const OrderDTOSchema = z.object({
  customerName: z.string(),
  customerEmail: z.string().email(),
  customerPhone: z.string(),
  customerAddress: z.string(),
  city: z.string(),
  postalCode: z.string().optional(),
  paymentMethod: z.string(),
  currency: z.string().optional(),
  products: z.array(OrderProductSchema),
  status: z.enum(["pending", "paid", "shipped", "delivered", "cancelled"]).optional(),
  clerkUserId: z.string().nullable().optional(),
});

export type OrderDTO = z.infer<typeof OrderDTOSchema>;
