import AddToCartButton from "@/components/AddToCartButton";
import BuyNowButton from "@/components/BuyNowButton";
import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import Section from "@/components/Section";
import { getProductBySlug } from "@/sanity/helpers";
import { urlFor } from "@/sanity/lib/image";
import { Check, CheckCircle, Heart, ScanHeart } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Cache data to avoid multiple DB calls since it's used in both generateMetadata and the component
const getProductData = cache(getProductBySlug);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // IMPORTANT FOR SEO
  const { slug } = await params;
  const productSlugDecoded = decodeURIComponent(slug);
  const product = await getProductData(productSlugDecoded);

  return {
    title: product?.name,
    description: product?.description,
  };
}

// TODO: Add these to db
const benefits = [
  "Promotes heart health with healthy unsaturated fats.",
  "Rich source of Omega-3 and Omega-6 fatty acids.",
  "Supports cholesterol balance naturally.",
  "Cold-pressed without chemicals or high heat.",
  "Contains antioxidants like Vitamin E for skin & immunity.",
  "Low in saturated fat, ideal for everyday cooking.",
  "High smoke point makes it great for frying and grilling.",
  "No artificial preservatives or additives.",
  "Suitable for both desi and western dishes.",
];

const ProductPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const product = await getProductData(slug);

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <Container>
        <div className="flex flex-col md:flex-row gap-10 py-10">
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
            {product?.stock ? (
              <p className="bg-accent w-24 text-center text-accent-foreground text-sm py-2.5 font-semibold rounded-lg">
                In Stock
              </p>
            ) : (
              <p className="bg-destructive w-24 text-center text-destructive-foreground text-sm py-2.5 font-semibold rounded-lg">
                Out of Stock
              </p>
            )}

            <p className="text-sm text-foreground/60 tracking-wide">
              {product?.description}
            </p>
            <div className="w-full">
              <div
                id="paymentMethod"
                className="bg-primary/10 border border-ring rounded-md px-3 py-2.5 text-sm text-muted-foreground"
              >
                1 Liter
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2.5 lg:gap-5">
              <AddToCartButton product={product} />
              <BuyNowButton product={product} />
              {/* <button className="border-2 border-foreground/30 text-foreground/60 px-2.5 py-1.5 rounded-md hover:text-foreground hover:border-foreground hoverEffect">
              <Heart className="w-5 h-5" />
            </button> */}
            </div>
            {/* <ProductCharacteristics product={product} /> */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-foreground/20 py-5 -mt-2">
              <div className="flex items-center gap-2 text-sm text-foreground hover:text-ring hoverEffect">
                <Heart className="text-lg" />
                <p>100% Pure & Organic</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground hover:text-ring  hoverEffect">
                <ScanHeart className="text-lg" />
                <p>Health-Focused</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground hover:text-ring  hoverEffect">
                <Check className="text-lg" />
                <p>Cold Pressed</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <div className="border border-foreground/20 text-center p-3 hover:border-primary hoverEffect rounded-md">
                <p className="text-base font-semibold text-foreground">COD</p>
                <p className="text-sm text-foreground/50">Cash On Delivery</p>
              </div>
              {/* <div className="border border-darkBlue/20 text-center p-3 hover:border-darkBlue hoverEffect rounded-md">
              <p className="text-base font-semibold text-foreground">
                Flexible Payment
              </p>
              <p className="text-sm text-foreground/50">
                Pay with Multiple Credit Cards
              </p>
            </div> */}
            </div>
          </div>
        </div>
        <Section title="Health Benefits of Organic Canola Oil">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Image */}
            <div className="md:w-1/2 w-full relative h-72 md:h-[400px]">
              <Image
                src={urlFor(product?.images[0]).url()} // Replace with actual image path
                alt="Organic Canola Oil Bottle"
                fill
                className="object-cover rounded-2xl shadow-md"
                priority
              />
            </div>

            {/* Text Content */}
            <div className="md:w-1/2 w-full">
              <ul className="space-y-4 text-foreground/80 text-base leading-relaxed">
                {benefits.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-primary mt-1 w-5 h-5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

                <Section title="FAQ s">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Image */}
            <div className="md:w-1/2 w-full relative h-72 md:h-[400px]">
              <Image
                src={urlFor(product?.images[0]).url()} // Replace with actual image path
                alt="Organic Canola Oil Bottle"
                fill
                className="object-cover rounded-2xl shadow-md"
                priority
              />
            </div>

            {/* Text Content */}
            <div className="md:w-1/2 w-full">
              <ul className="space-y-4 text-foreground/80 text-base leading-relaxed">
                {benefits.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-primary mt-1 w-5 h-5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
};

export default ProductPage;
