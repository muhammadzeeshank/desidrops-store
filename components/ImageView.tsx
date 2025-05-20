"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageData } from "@/types";
interface Props {
  images: ImageData[];
}
const ImageView = ({ images }: Props) => {
  const [active, setActive] = useState(images[0]);
  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active?.key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-[550px] min-h-[450px] border border-foreground/20 rounded-md group overflow-hidden"
        >
          <Image
            src={active.url}
            alt="productImage"
            width={700}
            height={700}
            priority
            className="w-full h-96 max-h-[550px] min-h-[500px] object-contain group-hover:scale-110 hoverEffect rounded-md"
          />
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-6 gap-2 h-20 md:h-28">
        {images.map((image) => (
          <button
            key={image.key}
            onClick={() => setActive(image)}
            className={`border rounded-md overflow-hidden hover:cursor-pointer ${
              active.key === image.key ? "ring-1 ring-foreground" : ""
            }`}
          >
            <Image
              src={image.url}
              alt={`Thumbnail ${image.key}`}
              width={100}
              height={100}
              className="w-full h-auto object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
