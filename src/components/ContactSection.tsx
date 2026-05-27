"use client";

import { MapPin, Phone, Clock, Facebook, Instagram } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaults = {
  phone: "708-515-3656",
  address: "1835 Dixie Hwy|Bldg B, Suite #202|Flossmoor, IL",
  address_url: "https://www.google.com/maps/place/1835+Dixie+Hwy+Bldg+B,+Suite+%23202,+Flossmoor,+IL+60422",
  hours: "Mon–Thu: 3:30–7:00|Fri-Sun: By Appointment",
  map_embed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.5!2d-87.6834!3d41.5425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e13e5c2a1b1b1%3A0x0!2s1835+Dixie+Hwy%2C+Flossmoor%2C+IL+60422!5e0!3m2!1sen!2sus!4v1700000000000",
  facebook_url: "https://www.facebook.com/profile.php?id=61578078313350",
  instagram_url: "https://www.instagram.com/chicagominamidojo_/",
};

const ContactSection = () => {
  const c = useSiteContent("contact", defaults);

  const items = [
    {
      icon: Phone,
      title: "Call Us",
      lines: [c.phone],
      href: `tel:${c.phone.replace(/[^0-9]/g, "")}`,
    },
    {
      icon: MapPin,
      title: "Visit Us",
      lines: c.address.split("|"),
      href: c.address_url,
    },
    {
      icon: Clock,
      title: "Hours",
      lines: c.hours.split("|"),
    },
  ];

  return (
    <section id="contact" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary tracking-[0.2em] uppercase text-sm font-medium mb-3">
            Get In Touch
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Contact Us
          </h2>
          <div className="flex justify-center items-center gap-4 mt-6">
            <a
              href={c.facebook_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-transparent hover:border-primary/40 hover:scale-105 transition-all"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href={c.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-transparent hover:border-primary/40 hover:scale-105 transition-all"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-card border border-border rounded-lg p-8 text-center hover:border-primary/40 transition-colors"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif font-bold text-lg text-foreground mb-3">{item.title}</h3>
              <div className="space-y-1">
                {item.lines.map((line) =>
                  item.href ? (
                    <a
                      key={line}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={line} className="text-muted-foreground text-sm">{line}</p>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-4xl mx-auto rounded-lg overflow-hidden border border-border shadow-lg">
          <iframe
            title="Chicago Minami Dojo Location"
            src={c.map_embed}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
