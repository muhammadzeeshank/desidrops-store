"use client";

import CheckoutForm, {
  CheckoutFormRef,
  CheckoutFormType,
} from "@/components/CheckoutForm";
import Container from "@/components/Container";
import Loading from "@/components/Loading";
import PriceFormatter from "@/components/PriceFormatter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrderDTO, OrderProduct } from "@/lib/schemas/place-order";
import { urlFor } from "@/sanity/lib/image";
import useCartStore from "@/store";
import { useUser } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import router from "next/router";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

function CheckoutPage() {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    getBuyNowTotalPrice,
    getBuyNowSubTotalPrice,
    clearBuyNowItem,
    resetCart,
  } = useCartStore();

  const [loading, setLoading] = useState(false);
  const groupedItems = useCartStore((state) => state.getGroupedItems());
  const buyNowItem = useCartStore((state) => state.getBuyNowItem());
  const [isBuyNowItem, setIsBuyNowItem] = useState(false);
  const itemsToRender =
    isBuyNowItem && buyNowItem ? [buyNowItem] : groupedItems;
  const discount = isBuyNowItem
    ? getBuyNowSubTotalPrice() - getBuyNowTotalPrice()
    : getSubTotalPrice() - getTotalPrice();
  const { user } = useUser();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  useEffect(() => {
    if (from === "buy-now") {
      setIsBuyNowItem(true);
    }
  }, [from]);

  const transformToOrderDTO = (form: CheckoutFormType): OrderDTO => {
    const products: OrderProduct[] = itemsToRender.map((item) => ({
      slug: item.product.slug.current,
      quantity: item.quantity,
      id: ""
    }));

    return {
      customerName: `${form.firstname} ${form.lastname}`,
      customerEmail: form.email,
      customerPhone: form.phone,
      customerAddress: form.address,
      city: form.city,
      postalCode: form.postalcode,
      paymentMethod: form.paymentMethod,
      products,
      clerkUserId: null,
    };
  };

  const handlePlaceOrder = async (checkoutFormData: CheckoutFormType) => {
    console.log("here")
    try {
          console.log("item:  ...", itemsToRender)

      const orderData = transformToOrderDTO(checkoutFormData);
      console.log("orderDatatoPush: ", orderData)

      const response = await fetch("/api/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("API Error:", error);
        // show error toast
        return;
      }

      const result = await response.json();
      // console.log("Order placed successfully:", result);
      toast.success("Order placed!");
      resetCart();
      clearBuyNowItem();
      router.push("/success");
    } catch (error) {
      // console.error("Network or unexpected error:", error);
      toast.error("Something went wrong!");
    }
  };

  // const handlePlaceOrder = async () => {
  //   setLoading(true);
  //   try {
  //     console.log("user: ", user);
  //     const metadata: Metadata = {
  //       orderNumber: crypto.randomUUID(),
  //       customerName: user?.fullName ?? "Unknown",
  //       customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
  //       clerkUserId: user!.id,
  //     };

  //     console.log("metadata: ", metadata);
  //     const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
  //     if (checkoutUrl) {
  //       window.location.href = checkoutUrl;
  //     }
  //   } catch (error) {
  //     console.error("Error creating checkout session:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const formRef = useRef<CheckoutFormRef>(null);
  const handleValidityChange = (valid: boolean) => {
    setIsFormValid(valid);
  };
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <Loading />;
  }

  return (
    <div className="bg-muted pb-52 md:pb-10 flex-grow">
      <Container>
        <>
          <div className="flex items-center gap-2 py-5">
            <ShoppingBag className="h-6 w-6 text-foreground" />
            <h1 className="text-2xl font-semibold">checkout</h1>
          </div>
          <div className="grid lg:grid-cols-3 md:gap-8">
            {/* Checkout form start */}
            <div className="lg:col-span-2 rounded-lg">
              <div className="border bg-background rounded-md">
                <div className="p-6">
                  <CheckoutForm
                    ref={formRef}
                    onSubmit={handlePlaceOrder}
                    onValidityChange={handleValidityChange}
                  />
                  <Button
                    onClick={() => formRef.current?.submit()}
                    className="w-full cursor-pointer font-semibold tracking-wide"
                    disabled={!isFormValid}
                  >
                    {loading ? "Processing" : "Complete Order"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Checkout form end */}

            <div className="lg:col-span-1">
              <div className="hidden md:inline-block w-full bg-background p-6 rounded-lg border sticky top-16">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="border-b mb-4 bg-background ">
                  {itemsToRender?.map(({ product }) => {
                    const itemCount = isBuyNowItem
                      ? 1
                      : getItemCount(product?._id);
                    return (
                      <div
                        key={product?._id}
                        className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                      >
                        <div className="flex flex-1 items-center gap-2">
                          {product?.images && (
                            <div className="relative border p-0.5 md:p-1 mr-2 rounded-md group">
                              <Image
                                src={urlFor(product.images[0]).url()}
                                alt="productImage"
                                width={300}
                                height={300}
                                loading="lazy"
                                className="w-32 md:w-16 h-32 md:h-16 object-cover group-hover:scale-105 overflow-hidden transition-transform duration-500"
                              />
                              {
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                                  {isBuyNowItem ? 1 : itemCount}
                                </span>
                              }
                            </div>
                          )}
                          <div className="flex flex-1 flex-col items-center py-1">
                            <h2 className="text-sm font-semibold ">
                              {product?.name}
                            </h2>
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-between p-0.5 md:p-1">
                          <PriceFormatter
                            amount={(product?.price as number) * itemCount}
                            className="font-bold text-sm"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>SubTotal</span>
                    <PriceFormatter
                      amount={
                        isBuyNowItem
                          ? getBuyNowSubTotalPrice()
                          : getSubTotalPrice()
                      }
                    />
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <PriceFormatter amount={discount} />
                  </div>

                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>

                    <PriceFormatter
                      amount={
                        isBuyNowItem
                          ? getBuyNowTotalPrice()
                          : useCartStore?.getState().getTotalPrice()
                      }
                      className="text-lg font-bold text-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Order summary mobile view */}
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-background pt-2">
              <div className="bg-background p-4 rounded-lg border mx-4">
                <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>SubTotal</span>
                    <PriceFormatter
                      amount={
                        isBuyNowItem
                          ? getBuyNowSubTotalPrice()
                          : getSubTotalPrice()
                      }
                    />
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <PriceFormatter
                      amount={
                        isBuyNowItem
                          ? getBuyNowSubTotalPrice() - getBuyNowTotalPrice()
                          : getSubTotalPrice() - getTotalPrice()
                      }
                    />
                  </div>

                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>

                    <PriceFormatter
                      amount={
                        isBuyNowItem
                          ? getBuyNowTotalPrice()
                          : useCartStore?.getState().getTotalPrice()
                      }
                      className="text-lg font-bold text-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </Container>
    </div>
  );
}

export default CheckoutPage;
