import { backendClient } from "@/sanity/lib/backendClient";
import { OrderProduct, SanityOrderType } from "../schemas/place-order";

export async function createOrderInSanity(orderData: SanityOrderType) {
  const {
    orderNumber,
    customerName,
    customerEmail,
    currency,
    subTotal,
    standardDiscount,
    couponDiscountAmount,
    totalDiscount,
    totalPrice,
    products,
    status,
    orderDate,
    clerkUserId,
    customerPhone,
    postalCode,
    customerAddress,
    city
  } = orderData;

  const sanityProducts = products.map((item: OrderProduct) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: item.id,
    },
    quantity: item.quantity,
  }));

  const orderDoc = {
    _type: "order",
    orderNumber,
    customerName,
    email: customerEmail,
    currency,
    subTotal,
    standardDiscount,
    couponDiscount: couponDiscountAmount,
    totalDiscount,
    totalPrice,
    status,
    orderDate,
    products: sanityProducts,
    clerkUserId,
    phone: customerPhone,
    postalCode,
    address: customerAddress,
    city
  };

  return backendClient.create(orderDoc);
}