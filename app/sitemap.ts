import { Category, Product } from "@/sanity.types";
import { getAllCategories, getAllProducts } from "@/sanity/helpers";
import { MetadataRoute } from "next";

export const baseUrl = process.env.DESIHOME_BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allProducts = await getAllProducts();
  const allCategories = await getAllCategories();

  const productPages: MetadataRoute.Sitemap = allProducts.map(
    (product: Product) => {
      return {
        url: `${baseUrl}/product/${product.slug.current}`,
        lastModified: product._updatedAt.split("T")[0],
        priority: 1,
      };
    }
  );
  const categoryPages: MetadataRoute.Sitemap = allCategories.map(
    (category: Category) => ({
      url: `${baseUrl}/category/${category?.slug?.current}`,
      lastModified: category._updatedAt.split("T")[0],
      priority: 0.9,
    })
  );

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2025-06-29").toISOString().split("T")[0],
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2025-06-29").toISOString().split("T")[0],
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2025-06-29").toISOString().split("T")[0],
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/return-policy`,
      lastModified: new Date("2025-06-29").toISOString().split("T")[0],
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];

  return [...productPages, ...categoryPages, ...staticPages];
}
