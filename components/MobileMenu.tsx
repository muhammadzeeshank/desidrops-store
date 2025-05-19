"use client";

import { AlignLeft } from "lucide-react";
import { useState } from "react";
import Sidebar from "./SideBar";

const MobileMenu = ({ items }: { items: string[] }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <button onClick={toggleSidebar}>
        <AlignLeft className="w-6 h-6 hover:text-hoverColor hoverEffect md:hidden" />
      </button>
      <div className="md:hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          items={items}
        />
      </div>
    </>
  );
};

export default MobileMenu;