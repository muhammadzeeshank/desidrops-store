import { cn } from "@/lib/utils";
import { FaFacebook } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLink = [
  // {
  //   title: "TikTok",
  //   href: "https://www.youtube.com",
  //   icon: <Linkedin className="w-5 h-5" />,
  // },
  {
    title: "Facebook",
    href: "https://www.facebook.com/people/Desi-Home/61576587128640",
    icon: <FaFacebook className="w-5 h-5" />,
  },
  // {
  //   title: "Instagram",
  //   href: "https://www.instagram.com/desihome",
  //   icon: <FaInstagram className="w-5 h-5" />,
  // },
];

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5 text-foreground/60", className)}>
        {socialLink.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 border rounded-full hover:text-foreground hover:border-foreground hoverEffect",
                  iconClassName
                )}
              >
                {item.icon}
              </a>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "bg-background text-foreground font-semibold border",
                tooltipClassName
              )}
            >
              {item.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
