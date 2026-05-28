import { Facebook, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

export const SOCIAL_URLS = {
  facebook: "https://www.facebook.com/profile.php?id=61578078313350",
  instagram: "https://www.instagram.com/chicagominamidojo_/",
} as const;

type SocialLinksProps = {
  className?: string;
  variant?: "default" | "hero";
  facebookUrl?: string;
  instagramUrl?: string;
};

const linkStyles = {
  default:
    "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-transparent hover:border-primary/40 hover:scale-105 transition-all",
  hero: "w-14 h-14 rounded-full flex items-center justify-center text-foreground border border-foreground/30 hover:border-primary hover:text-primary hover:scale-105 transition-all",
};

export default function SocialLinks({
  className,
  variant = "default",
  facebookUrl = SOCIAL_URLS.facebook,
  instagramUrl = SOCIAL_URLS.instagram,
}: SocialLinksProps) {
  const linkClass = linkStyles[variant];

  return (
    <div className={cn("flex items-center", className)}>
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className={linkClass}
      >
        <Facebook className="w-6 h-6" />
      </a>
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={linkClass}
      >
        <Instagram className="w-6 h-6" />
      </a>
    </div>
  );
}
