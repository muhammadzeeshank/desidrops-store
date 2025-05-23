"use client";

import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import CheckoutForm from "@/components/CheckoutForm";
import Container from "@/components/Container";
import PriceFormatter from "@/components/PriceFormatter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import React, { useState } from "react";

function CheckoutPage() {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const groupedItems = useCartStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      console.log("user: ", user);
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };

      console.log("metadata: ", metadata);
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };
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
            <div className="lg:col-span-2 rounded-lg max-h-[calc(100vh-100px)] pr-2">
              <div className="border bg-background rounded-md">
                <div className="p-6">
                  <CheckoutForm />
                  <Button className="w-full cursor-pointer font-semibold tracking-wide">
                    {loading ? "Processing" : "Place Order"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Checkout form end */}

            <div className="lg:col-span-1">
              <div className="hidden md:inline-block w-full bg-background p-6 rounded-lg border sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>SubTotal</span>
                    <PriceFormatter amount={getSubTotalPrice()} />
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <PriceFormatter
                      amount={getSubTotalPrice() - getTotalPrice()}
                    />
                  </div>

                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>

                    <PriceFormatter
                      amount={useCartStore?.getState().getTotalPrice()}
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
                    <PriceFormatter amount={getSubTotalPrice()} />
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <PriceFormatter
                      amount={getSubTotalPrice() - getTotalPrice()}
                    />
                  </div>

                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>

                    <PriceFormatter
                      amount={useCartStore?.getState().getTotalPrice()}
                      className="text-lg font-bold text-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>{" "}
      </Container>
    </div>
  );
}

export default CheckoutPage;
