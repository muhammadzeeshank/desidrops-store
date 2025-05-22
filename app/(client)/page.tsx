import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";
import Image from "next/image";

export default function Home() {
  return (
    <Container className="py-10">
      <HomeBanner />
      <ProductGrid />
    </Container>
  );
}
