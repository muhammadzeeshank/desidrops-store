import { OrderDTO, OrderDTOSchema, OrderProduct } from "@/lib/schemas/place-order";
import { NextRequest, NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backendClient";
import { getProductsBySlugs } from "@/sanity/helpers";
import { Product } from "@/sanity.types";

function generateOrderNumber(): string {
  // e.g. ORD-20240621-XYZ123
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const date = new Date().toISOString().split("T")[0].replace(/-/g, "");
  return `ORD-${date}-${random}`;
}

export async function POST(req: NextRequest) {
  try {
    console.log("place order called");
    const body = await req.json();
    console.log('body: ', body)
    const parsed = OrderDTOSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", issues: parsed.error.format() },
        { status: 400 }
      );
    }

    const orderData: OrderDTO = parsed.data;
    const orderNumber = generateOrderNumber();
    const orderDate = new Date().toISOString();

    // Extract slugs from the product list
    const productSlugs = orderData.products.map((p) => p.slug);
    const sanityProducts = await getProductsBySlugs(productSlugs);

    const slugToIdMap = Object.fromEntries(
      sanityProducts.map((p) => [p.slug.current, p._id])
    );

    orderData.products = orderData.products.map((p) => ({
      ...p,
      id: slugToIdMap[p.slug] || "", 
    }));

    // Create a map for price lookup
    const priceMap = Object.fromEntries(
      sanityProducts.map((p) => {
        const price = p.price;
        const discount = p.discount ?? 0;
        const discountedPrice = price - (price * discount) / 100;

        return [
          p.slug.current,
          {
            price,
            discountedPrice,
          },
        ];
      })
    );

    // calculate total price
    const totalPrice = orderData.products.reduce((acc, item) => {
      const price = priceMap[item.slug] || 0;
      return acc + price.price * item.quantity;
    }, 0);

    // calculate discounted amount
    const amountDiscount = orderData.products.reduce((acc, item) => {
      const price = priceMap[item.slug] || 0;
      return acc + price.discountedPrice * item.quantity;
    }, 0);

    // Create final order object
    const finalOrder = {
      ...orderData,
      orderNumber,
      totalPrice,
      amountDiscount,
      orderDate,
      status: "pending",
      currency: "PKR",
    };
    console.log("finalOrder: ", finalOrder)

    const order = await createOrderInSanity(finalOrder);

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        orderNumber,
        data: orderData,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error placing order:", error);
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 }
    );
  }
}

export async function createOrderInSanity(orderData: any) {
  const {
    orderNumber,
    customerName,
    customerEmail,
    currency,
    amountDiscount,
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
    amountDiscount,
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
