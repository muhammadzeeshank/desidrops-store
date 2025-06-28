"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store";
import { motion } from "framer-motion";
import { Check, Home } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearCart = useCartStore((state) => state.resetCart);
  const router = useRouter();

  useEffect(() => {
    if (orderNumber) {
      clearCart();
    } else {
      router.replace("/");
    }
  }, [orderNumber, clearCart, router]);

  if (!orderNumber) return null;

  return (
    <div className="py-10 bg-muted flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-background rounded-2xl shadow-2xl px-8 py-12 max-w-xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
        >
          <Check className="text-background w-12 h-12" />
        </motion.div>

        <h1 className="text-3xl font-bold text-foreground mb-4">
          Order Confirmed!
        </h1>
        <div className="space-y-4 mb-8 text-left">
          <p className="text-foreground/80">
            Thank you for your purchase. We&apos;re processing your order and
            will ship it soon. A confirmation email with your order details will
            be sent to your inbox shortly.
          </p>
          <p className="text-foreground/80">
            Order Number:{" "}
            <span className="text-foreground font-semibold">{orderNumber}</span>
          </p>
        </div>

        <div className="bg-muted border border-foreground/10 rounded-lg p-4 mb-8">
          <h2 className="font-semibold text-foreground/90 mb-2">
            What&apos;s Next?
          </h2>
          <ul className="text-foreground/80 text-sm space-y-1">
            <li>Check your email for order confirmation</li>
            <li>We&apos;ll notify you when your order ships</li>
            <li>Track your order status anytime</li>
          </ul>
        </div>

        <div className="flex items-center justify-center gap-5">
          <Button
            asChild
            className="font-semibold transition-all duration-300 cursor-pointer"
          >
            <Link href="/">
              <Home className="w-5 h-5" />
              Home
            </Link>
          </Button>
          {/* <Button
            variant="outline"
            asChild
            className="font-semibold transition-all duration-300 cursor-pointer"
          >
            <Link href="/orders">
              <Package className="w-5 h-5" />
              Orders
            </Link>
          </Button> */}
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
