import logo from "@/assets/logo.avif";
import { imageSrc } from "@/lib/image";

const Footer = () => {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-4 flex flex-col items-center gap-3">
        <img src={imageSrc(logo)} alt="Chicago Minami Dojo" className="h-12 w-auto" />
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} Chicago Minami Dojo. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
