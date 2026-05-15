import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.avif";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Classes", href: "#classes" },
  { label: "Instructors", href: "#instructor" },
  { label: "History", href: "#history" },
  { label: "Events and Calendar", href: "#events-calendar" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Chicago Minami Dojo" className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors tracking-wider uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:7085153656"
            className="flex items-center gap-2 bg-gradient-gold text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:scale-105 transition-all shadow-gold"
          >
            <Phone className="w-4 h-4" />
            708-515-3656
          </a>
          <a
            href="https://app.chicagominamidojo.com/login"
            className="flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Members
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="flex flex-col px-4 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors tracking-wider uppercase"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:7085153656"
              className="flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold"
            >
              <Phone className="w-4 h-4" />
              708-515-3656
            </a>
            <a
              href="https://app.chicagominamidojo.com/login"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center border border-primary text-primary px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Members
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
