"use client";
import Logo from "./Logo";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed min-h-screen w-full bg-background left-0 top-0 flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-1">
        <Logo>Desi Home</Logo>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex items-center space-x-2 text-primary"
        >
          <Loader2 className="animate-spin" />
          <span className="font-semibold tracking-wide">
            Desi Home is loading...
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
