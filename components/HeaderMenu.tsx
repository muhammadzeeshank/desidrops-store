"use client";
// import { CATEGORIES_QUERYResult, Category } from "@/sanity.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderMenu = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold">
      <Link
        href={"/"}
        className={`hover:text-foreground hoverEffect relative group ${
          pathname === "/" ? "text-foreground" : "text-foreground/70"
        }`}
      >
        Home
        <span
          className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-1/2 group-hover:left-0 ${
            pathname === "/" && "w-1/2"
          }`}
        />
        <span
          className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-1/2 group-hover:right-0 ${
            pathname === "/" && "w-1/2"
          }`}
        />
      </Link>

      {/* <Link
        href={"/shop"}
        className={`hover:text-foreground hoverEffect relative group ${
          pathname === "/shop" ? "text-foreground" : "text-foreground/70"
        }`}
      >
        Shop
        <span
          className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-1/2 group-hover:left-0 ${
            pathname === "/shop" && "w-1/2"
          }`}
        />
        <span
          className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-1/2 group-hover:right-0 ${
            pathname === "/shop" && "w-1/2"
          }`}
        />
      </Link> */}
    </div>
  );
};

export default HeaderMenu;
