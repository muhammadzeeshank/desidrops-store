"use client";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import Loading from "@/components/Loading";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { urlFor } from "@/sanity/lib/image";
import useCartStore from "@/store";
import { Heart, ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const [loading] = useState(false);
  const groupedItems = useCartStore((state) => state.getGroupedItems());
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <Loading />;
  }
  const handleResetCart = () => {
    const confirmed = window.confirm("Are you sure to reset your Cart?");
    if (confirmed) {
      resetCart();
      toast.success("Your cart reset successfully!");
    }
  };

  const handleCheckout = async () => {
    router.push("/checkout");
  };

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product deleted successfully!");
  };
  return (
    <div className="bg-muted pb-52 md:pb-10 flex-grow">
      <Container>
        {groupedItems?.length ? (
          <>
            <div className="flex items-center gap-2 py-5">
              <ShoppingBag className="h-6 w-6 text-foreground" />
              <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            </div>
            <div className="grid lg:grid-cols-3 md:gap-8">
              {/* Product View start */}
              <div className="lg:col-span-2 rounded-lg">
                <div className="border bg-background rounded-md">
                  {groupedItems?.map(({ product }) => {
                    const itemCount = getItemCount(product?._id);
                    return (
                      <div
                        key={product?._id}
                        className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                      >
                        <div className="flex flex-1 items-start gap-2 h-36 md:h-44">
                          {product?.images && (
                            <div className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group">
                              <Image
                                src={urlFor(product.images[0]).url()}
                                alt="productImage"
                                width={500}
                                height={500}
                                loading="lazy"
                                className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 overflow-hidden transition-transform duration-500"
                              />
                            </div>
                          )}
                          <div className="h-full flex flex-1 flex-col justify-between py-1">
                            <div className="flex flex-col gap-0.5 md:gap-1.5">
                              <h2 className="text-base font-semibold line-clamp-1">
                                {product?.name}
                              </h2>
                              <p className="text-sm text-lightColor font-medium">
                                {product?.intro}
                              </p>
                              <p className="text-sm capitalize">
                                Variant:{" "}
                                <span className="font-semibold">
                                  {/* {product?.variant} */}
                                </span>
                              </p>
                              <p className="text-sm capitalize">
                                Status:{" "}
                                <span className="font-semibold">
                                  {/* {product?.status} */}
                                </span>
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Heart className="w-4 h-4 md:w-5 md:h-5 mr-1 text-foreground/50 hover:text-red-600 hoverEffect" />
                                  </TooltipTrigger>
                                  <TooltipContent className="font-bold">
                                    Add to Favorite
                                  </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Trash
                                      onClick={() =>
                                        handleDeleteProduct(product?._id)
                                      }
                                      className="w-4 h-4 md:w-5 md:h-5 mr-1 text-foreground/50 hover:text-red-600 hoverEffect"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent className="font-bold bg-red-600 text-white">
                                    Delete product
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                          <PriceFormatter
                            amount={(product?.price as number) * itemCount}
                            className="font-bold text-lg"
                          />
                          <QuantityButtons product={product} />
                        </div>
                      </div>
                    );
                  })}
                  <Button
                    onClick={handleResetCart}
                    className="m-5 font-semibold"
                    variant="destructive"
                  >
                    Reset Cart
                  </Button>
                </div>
              </div>

              {/* Product View end */}

              <div className="lg:col-span-1">
                <div className="hidden md:inline-block w-full bg-background p-6 rounded-lg border">
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
                    <Button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full cursor-pointer rounded-full font-semibold tracking-wide"
                      size="lg"
                    >
                      {loading ? "Processing" : "Proceed to Checkout"}
                    </Button>
                    {/* <Link
                      href="/"
                      className="text-center text-sm text-foreground hover:underline border border-darkColor/50 rounded-full flex items-center justify-center py-2 hover:bg-darkColor/5 hover:border-darkColor hoverEffect"
                    >
                      <Image
                        src={paypalLogo}
                        className="w-20"
                        alt="paypalLogo"
                      />
                    </Link> */}
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
                    <Button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full rounded-full font-semibold tracking-wide"
                      size="lg"
                    >
                      {loading ? "Processing" : "Proceed to Checkout"}
                    </Button>
                    {/* <Link
                      href="/"
                      className="text-center text-sm text-foreground hover:underline border border-darkColor/50 rounded-full flex items-center justify-center py-2 hover:bg-darkColor/5 hover:border-darkColor hoverEffect"
                    >
                      <Image
                        src={paypalLogo}
                        className="w-20"
                        alt="paypalLogo"
                      />
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </div>
  );
};

export default CartPage;
