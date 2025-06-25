import { createOrderInSanity } from "@/lib/sanity/create-order";
import { OrderDTO, OrderDTOSchema, SanityOrderType } from "@/lib/schemas/place-order";
import { getProductsBySlugs } from "@/sanity/helpers";
import { NextRequest, NextResponse } from "next/server";

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
        const afterDiscountPrice = p.price;
        const discountPercent = p.discount ?? 0;
        const discountedAmount = (afterDiscountPrice * discountPercent) / 100;
        const price = afterDiscountPrice + discountedAmount;

        return [
          p.slug.current,
          {
            price,
            discountedAmount,
            afterDiscountPrice,
          },
        ];
      })
    );
    // calculate Subtotal (Before Any Discounts)
    const subTotal = orderData.products.reduce((acc, item) => {
      const prices = priceMap[item.slug] || 0;
      return acc + prices.price * item.quantity;
    }, 0);

    // calculate standard discount amount
    const standardDiscount = orderData.products.reduce((acc, item) => {
      const prices = priceMap[item.slug] || 0;
      return acc + prices.discountedAmount * item.quantity;
    }, 0);

    // calculate Total Price (After standard Discounts)
    const totalPriceBeforeCouponDiscount = orderData.products.reduce((acc, item) => {
      const prices = priceMap[item.slug] || 0;
      return acc + prices.afterDiscountPrice * item.quantity;
    }, 0);

    const couponDiscountAmount = 0;

    // calculate Total Price (After All Discounts)
    const totalPrice = totalPriceBeforeCouponDiscount - couponDiscountAmount;

    // calculate Total Discount Amount
    const totalDiscount = couponDiscountAmount + standardDiscount;

    // Create final order object
    const finalOrder: SanityOrderType = {
      ...orderData,
      subTotal,
      orderNumber,
      totalPrice,
      standardDiscount,
      couponDiscountAmount,
      totalDiscount,
      orderDate,
      status: "pending",
      currency: "PKR",
    };

    await createOrderInSanity(finalOrder);

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        orderNumber,
        data: orderData,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error placing order:", error);
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 }
    );
  }
}


