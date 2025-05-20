import React from "react";
import SocialMedia from "./SocialMedia";
import Link from "next/link";
import { Separator } from "./ui/separator";
import Logo from "./Logo";
const footerLinks = [
  {
    title: "Home",
    href: "#",
  },
  {
    title: "Help",
    href: "#",
  },
  {
    title: "Policy",
    href: "#",
  },
];

const Footer = () => {
  return (
    <div className="bg-background flex flex-col border-t">
      <footer>
        <div className="max-w-screen-xl mx-auto">
          <div className="py-12 flex flex-col justify-start items-center">
            <Logo>Desi Drops</Logo>
            <ul className="mt-6 flex items-center gap-4 flex-wrap">
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
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank">
                Desi Drops
              </Link>
              . All rights reserved.
            </span>
            {/* <div className="flex items-center gap-5 text-muted-foreground">
              <Link href="#" target="_blank">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank">
                <DribbbleIcon className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank">
                <TwitchIcon className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank">
                <GithubIcon className="h-5 w-5" />
              </Link>
            </div> */}
            <SocialMedia />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
