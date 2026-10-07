"use client";

import defaultHeroBg from "@/assets/hero-bg.jpg";
import SocialLinks from "@/components/SocialLinks";
import { useSiteContent } from "@/hooks/useSiteContent";
import { imageSrc } from "@/lib/image";
import { ChevronDown } from "lucide-react";

const defaults = {
  image: "",
  subtitle: "Chicago Minami Dojo - Flossmoor IL",
  headline: "Free Uniform Offer — $135 per month — First Week Free",
  cta_primary: "Join Our Classes",
  cta_secondary: "Call Now",
};

function splitHeadline(headline: string) {
  const parts = headline
    .split(/\s*[—–-]\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
  return {
    title: parts[0] ?? headline,
    details: parts.slice(1),
  };
}

const HeroSection = () => {
  const c = useSiteContent("hero", defaults);
  const bgSrc = imageSrc(c.image || defaultHeroBg);
  const { title, details } = splitHeadline(c.headline);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={bgSrc}
        alt="Martial artist tying black belt in dojo"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 overlay-dark" />
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <p className="text-primary tracking-[0.3em] uppercase text-sm font-medium mb-4 animate-fade-up">
          {c.subtitle}
        </p>
        <div className="mb-10 animate-fade-up [animation-delay:300ms] opacity-0 max-w-2xl mx-auto">
          <p className="font-serif font-bold text-4xl md:text-6xl leading-tight tracking-tight text-amber-400">
            {title}
          </p>
          {details.length > 0 && (
            <p className="mt-5 text-base md:text-xl font-medium tracking-wide text-foreground/90">
              {details.map((detail, i) => (
                <span key={detail}>
                  {i > 0 && <span className="mx-2.5 text-primary/80" aria-hidden>·</span>}
                  {detail}
                </span>
              ))}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:500ms] opacity-0">
          <a
            href="#classes"
            className="bg-gradient-gold text-primary-foreground px-8 py-4 rounded-md font-semibold text-sm tracking-wider uppercase shadow-gold hover:scale-105 transition-transform"
          >
            {c.cta_primary}
          </a>
          <a
            href="tel:7085153656"
            className="border border-foreground/30 text-foreground px-8 py-4 rounded-md font-semibold text-sm tracking-wider uppercase hover:border-primary hover:text-primary transition-colors"
          >
            {c.cta_secondary}
          </a>
        </div>
        <SocialLinks
          variant="hero"
          className="justify-center gap-4 mt-6 animate-fade-up [animation-delay:700ms] opacity-0"
        />
      </div>
      <a
        href="#classes"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-foreground/50 hover:text-primary transition-colors"
      >
        <ChevronDown className="w-8 h-8" strokeWidth={2} />
      </a>
    </section>
  );
};

export default HeroSection;
