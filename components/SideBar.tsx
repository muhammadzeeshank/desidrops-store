import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "motion/react";
import Logo from "./Logo";
import Link from "next/link";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, items }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-full bg-foreground/50 shadow-xl transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform ease-in-out duration-300`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        ref={sidebarRef}
        className="min-w-72 max-w-96 bg-muted h-full text-primary-foreground p-10 border-r border-r-hoverColor/30 flex flex-col gap-6"
      >
        <div className="flex items-center justify-between">
          <Logo className="text-foreground">Desi Drops</Logo>
          <button
            onClick={onClose}
            className="hover:text-red-500 hoverEffect cursor-pointer text-foreground"
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col gap-3.5 text-base font-semibold tracking-wide text-foreground/50">
          <Link
            onClick={onClose}
            href={"/"}
            className={`hover:text-foreground hoverEffect ${
              pathname === `/` && "text-foreground"
            }`}
          >
            Home
          </Link>
          {items?.map((item) => (
            <Link
              onClick={onClose}
              key={item}
              href={`/${item}`}
              className={`hover:text-foreground hoverEffect ${
                pathname === `/${item}` && "text-foreground"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
        <SocialMedia />
      </motion.div>
    </div>
  );
};

export default Sidebar;

