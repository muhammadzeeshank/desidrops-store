"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
// import useCartStore from "@/store";
import { cn } from "@/lib/utils";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";
import { Product } from "@/types";
import useCartStore from "@/store";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  const itemCount = getItemCount(product?.id);

  const isOutOfStock = product?.stock === 0;

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
      {itemCount ? (
        <div className="text-sm w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={() => {
            addItem(product);
            toast.success(
              `${product?.name?.substring(0, 12)}... added successfully!`
            );
          }}
          disabled={isOutOfStock}
          className={cn(
            "w-full bg-transparent text-foreground shadow-none border border-foreground/30 font-semibold tracking-wide hover:text-background cursor-pointer hoverEffect",
            className
          )}
        >
          Add to cart
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
