import defaultHeroBg from "@/assets/hero-bg.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaults = {
  image: "",
  subtitle: "Chicago Minami Dojo - Flossmoor IL",
  headline: "$99 Trial Offer — Train with Grandmaster Diane in Flossmoor",
  cta_primary: "Join Our Classes",
  cta_secondary: "Call Now",
};

const HeroSection = () => {
  const c = useSiteContent("hero", defaults);
  const bgSrc = c.image || defaultHeroBg;

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
        <p className="text-2xl mb-10 animate-fade-up [animation-delay:300ms] opacity-0 max-w-xl mx-auto font-serif font-bold md:text-5xl">
          {c.headline.includes("$99") ? (
            <>
              <span className="text-amber-400">{c.headline.split("—")[0]?.trim()}</span>{" "}
              <span className="text-foreground">— {c.headline.split("—").slice(1).join("—").trim()}</span>
            </>
          ) : (
            <span className="text-foreground">{c.headline}</span>
          )}
        </p>
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
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
