import { Product } from "@/types";

export const dummyProducts: Product[] = [
  {
    id: "1",
    name: "100% Organic Canola Oil",
    intro: "Cold-pressed, nutrient-rich canola oil for everyday cooking.",
    description:
      "Our 100% organic canola oil is extracted using cold-press technology to retain maximum nutrients. Ideal for frying, baking, or drizzling on salads.",
    slug: "organic-canola-oil",
    images: [
      {
        key: "1",
        url: "https://assets.iflscience.com/assets/articleNo/71323/aImg/71678/canola-oil-o.webp",
      },
      {
        key: "2",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1kY0GpkQtcjoEC9Nbh82iX7FRDr7LYTfcQg&s",
      },
    ],
    price: 1200,
    discount: 10,
    stock: 150,
    createdAt: new Date("2024-12-01T10:00:00Z"),
    updatedAt: new Date("2025-05-19T08:30:00Z"),
    categoryId: "oil-products",
  },
  {
    id: "2",
    name: "Organic Desi Ghee",
    intro: "Pure and traditional ghee made from grass-fed cow milk.",
    description:
      "Our organic desi ghee is slow-cooked to preserve rich aroma and essential nutrients. Perfect for traditional cooking and daily use.",
    slug: "organic-desi-ghee",
    images: [
      {
        url: "https://cdn.shopaccino.com/refresh/articles/organic-desi-ghee-426160_l.jpg?v=531",
        key: "1",
      },
    ],
    price: 2200,
    discount: 15,
    stock: 90,
    createdAt: new Date("2025-01-15T11:00:00Z"),
    updatedAt: new Date("2025-05-19T08:30:00Z"),
    categoryId: "dairy-products",
  },
];
