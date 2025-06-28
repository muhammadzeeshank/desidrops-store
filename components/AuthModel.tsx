"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import SignIn from "./SignIn";

export function AuthDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer text-sm font-semibold text-foreground/70 hover:text-foreground hoverEffect">
          <User className="h-5 w-5" />
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <Logo>Desi Home</Logo>
          </DialogTitle>
        </DialogHeader>

        <SignIn />
      </DialogContent>
    </Dialog>
  );
}
