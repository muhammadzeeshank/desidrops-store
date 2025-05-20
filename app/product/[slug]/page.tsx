import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import { dummyProducts } from "@/data/dummydata";
import { Heart } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = dummyProducts.find(product => product.slug === slug);

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <Container className="flex flex-col md:flex-row gap-10 py-10">
        {product?.images && <ImageView images={product?.images} />}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div>
            <p className="text-4xl font-bold mb-2">{product?.name}</p>
            <PriceView
              price={product?.price}
              discount={product?.discount}
              className="text-lg font-bold"
            />
          </div>
          {product?.stock && (
            <p className="bg-green-100 w-24 text-center text-green-600 text-sm py-2.5 font-semibold rounded-lg">
              In Stock
            </p>
          )}

          <p className="text-sm text-foreground/60 tracking-wide">
            {product?.description}
          </p>
          <div className="flex items-center gap-2.5 lg:gap-5">
            <AddToCartButton
              product={product}
              className="bg-foreground/80 text-background hover:bg-foreground hoverEffect"
            />
            {/* <button className="border-2 border-foreground/30 text-foreground/60 px-2.5 py-1.5 rounded-md hover:text-foreground hover:border-foreground hoverEffect">
              <Heart className="w-5 h-5" />
            </button> */}
          </div>
          {/* <ProductCharacteristics product={product} /> */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-foreground/20 py-5 -mt-2">
            <div className="flex items-center gap-2 text-sm text-foreground hover:text-red-600 hoverEffect">
              <FaRegQuestionCircle className="text-lg" />
              <p>Ask a question</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground hover:text-red-600 hoverEffect">
              <TbTruckDelivery className="text-lg" />
              <p>Delivery & Return</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground hover:text-red-600 hoverEffect">
              <FiShare2 className="text-lg" />
              <p>Share</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <div className="border border-darkBlue/20 text-center p-3 hover:border-darkBlue hoverEffect rounded-md">
              <p className="text-base font-semibold text-foreground">
                Free Shipping
              </p>
              <p className="text-sm text-foreground/50">
                Free shipping over order $120
              </p>
            </div>
            <div className="border border-darkBlue/20 text-center p-3 hover:border-darkBlue hoverEffect rounded-md">
              <p className="text-base font-semibold text-foreground">
                Flexible Payment
              </p>
              <p className="text-sm text-foreground/50">
                Pay with Multiple Credit Cards
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;