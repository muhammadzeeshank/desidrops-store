import React from "react";
import SocialMedia from "./SocialMedia";
import Link from "next/link";
import { Separator } from "./ui/separator";
import Logo from "./Logo";
import Container from "./Container";
import { ModeSwitcher } from "./ModeSwitcher";
const footerLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    title: "Return Policy",
    href: "/return-policy",
  },
];

const Footer = () => {
  return (
    <div className="bg-background flex flex-col border-t">
      <footer>
        <div className="max-w-screen-xl mx-auto">
          <div className="pb-12 pt-8 flex flex-col justify-start items-center">
            <ModeSwitcher />
            <Logo>Desi Home</Logo>
            <ul className="mt-6 flex items-center justify-center gap-4 flex-wrap">
              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-foreground font-medium"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Separator />
          <Container>
            {" "}
            <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
              {/* Copyright */}
              <span className="text-muted-foreground">
                &copy; {new Date().getFullYear()}{" "}
                <Link href="/" target="_blank">
                  Desi Home
                </Link>
                . All rights reserved.
              </span>
              <SocialMedia />
            </div>
          </Container>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
