"use client";

import defaultInstructorImg from "@/assets/instructor.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";
import { imageSrc } from "@/lib/image";

const defaults = {
  image: "",
  subtitle: "Meet Your Sensei",
  name: "Diane Wallander",
  badge: "8th Degree Black Belt",
  bio: "Diane Wallander has walked the martial arts path for 40+ years, instructing thousands of people to defend themselves.\n\nShe is a Shihan, or Master Teacher, with an 8th-degree Black Belt in Miyama Ryu Combat Ju Jutsu.\n\nDriven by a passion to inspire her students, Shihan Diane's approach to teaching jujutsu aims to deliver sharp, reality-based self-defense skills, and to equip students with powerful and practical self-defense strategies.",
  stats: [
    { num: "40+", label: "Years Experience" },
    { num: "1000+", label: "Students Taught" },
    { num: "8th", label: "Degree Black Belt" },
  ],
};

const InstructorSection = () => {
  const c = useSiteContent("instructor", defaults);
  const imgSrc = imageSrc(c.image || defaultInstructorImg);
  const paragraphs = (c.bio || "").split("\n").filter((p: string) => p.trim());
  const stats = c.stats?.length ? c.stats : defaults.stats;

  return (
    <section id="instructor" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary tracking-[0.2em] uppercase text-sm font-medium mb-3">
            {c.subtitle}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            {c.name}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="relative">
            <div className="rounded-lg overflow-hidden border-2 border-primary/20">
              <img
                src={imgSrc}
                alt={c.name}
                className="w-full h-[500px] object-cover object-top"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground font-serif font-bold text-sm px-4 py-2 rounded-md">
              {c.badge}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              {paragraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              {stats.map((stat: any) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-primary font-serif">{stat.num}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
