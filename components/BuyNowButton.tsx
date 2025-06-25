"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useCartStore from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface Props {
  product: Product;
  className?: string;
}

const BuyNowButton = ({ product, className }: Props) => {
  const { setBuyNowItem } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const isOutOfStock = product?.stock === 0;

  const handleCheckout = () => {
    setBuyNowItem(product); // add product to cart
    router.push("/checkout?from=buy-now"); // then go to checkout
  };

  // Use useEffect to set isClient to true after component mounts
  // This ensures that the component only renders on the client-side
  // Preventing hydration errors due to server/client mismatch

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  return (
    <div className="w-full h-12 flex items-center">
      <Button
        onClick={handleCheckout}
        disabled={isOutOfStock}
        className={cn(
          "w-full bg-primary text-background shadow-none border border-foreground/30 font-semibold tracking-wide hover:text-background cursor-pointer hoverEffect",
          className
        )}
      >
        Buy Now
      </Button>
    </div>
  );
};

export default BuyNowButton;
