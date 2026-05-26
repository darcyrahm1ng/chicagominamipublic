"use client";

import collage1 from "@/assets/collage-1.jpg";
import collage2 from "@/assets/collage-2.jpeg";
import collage3 from "@/assets/collage-3.jpeg";
import collage4 from "@/assets/collage-4.jpeg";
import collage5 from "@/assets/collage-5.jpeg";
import collage6 from "@/assets/collage-6.jpeg";
import collage7 from "@/assets/collage-7.jpg";
import collage8 from "@/assets/collage-8.jpg";
import collage9 from "@/assets/collage-9.jpeg";
import { useSiteContent } from "@/hooks/useSiteContent";
import { imageSrc } from "@/lib/image";

const defaultPhotos = [
  { url: imageSrc(collage1), alt: "Shihan Diane teaching a young student kick techniques" },
  { url: imageSrc(collage2), alt: "Large group photo at international jujutsu seminar" },
  { url: imageSrc(collage3), alt: "Shihan Diane with a student at seminar" },
  { url: imageSrc(collage9), alt: "Shihan Diane tying a belt for a young student" },
  { url: imageSrc(collage8), alt: "Diane Wallander training at Northwestern in 1983" },
  { url: imageSrc(collage5), alt: "Women's jujutsu group photo with certificates" },
  { url: imageSrc(collage7), alt: "Gasshuku 2011 Kaiden Menkyo group photo" },
  { url: imageSrc(collage4), alt: "Shihan Diane with fellow practitioner" },
  { url: imageSrc(collage6), alt: "Black belt practitioners with certificates" },
];

const defaults = {
  photos: [] as { url: string; alt: string }[],
};

const GallerySection = () => {
  const c = useSiteContent("gallery", defaults);
  const photos = c.photos?.length ? c.photos : defaultPhotos;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary tracking-[0.2em] uppercase text-sm font-medium mb-3">
            Our Community
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Gallery
          </h2>
        </div>

        <div className="columns-2 md:columns-3 gap-4 max-w-5xl mx-auto">
          {photos.map((photo: any, i: number) => (
            <div
              key={i}
              className="mb-4 break-inside-avoid rounded-lg overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-colors"
            >
              <img
                src={photo.url || photo.src}
                alt={photo.alt}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
