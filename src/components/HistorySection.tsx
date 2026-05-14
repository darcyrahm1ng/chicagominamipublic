import defaultHistoryBg from "@/assets/history-dojo.jpg";
import defaultShinanImg from "@/assets/shinan-pereira.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const defaultFullHistory = `The beginnings of Miyama Ryu Combat Jujutsu stretch back over half a century. In 1942 Antonio Pereira, a young American soldier, was participating in a hand-to-hand demonstration. When ordered to punch one of the instructors in the face, he complied, only to find himself whipped around into a choke hold. Pereira learned as much as he could during World War II and focused on specialized combat methods. He continued to experiment and practice with the techniques, refining them sometimes under life and death situations. After the war, his warrior's quest for additional knowledge took him to many schools in search of martial prowess. In 1950, he began a formal study of judo with the Lefcoker brothers. He then began to research how victims of crime were attacked and devise methods of practical defense.

In 1960 he opened a martial arts school on Tremont Avenue, in the South Bronx, New York. He called his rough-and-tumble method of fighting Combato. But the puzzle was still not complete. In 1962 he embarked on a journey to Japan. His plan was to study from the source, and perhaps to gain a better sense of the martial principles. As he observed the practice at the Aiki Kai (Aikido school), Pereira recognized similarities to what he had been doing all along. Pereira set out to learn more refined methods. His fierce resolve and dedication won him many honors. Among them were, a teaching certificate from O-Sensei Ueshiba (son of the founder of Aikido), and a Ni dan in Judo from the Kodokan (the birthplace of Judo).

Pereira then returned to the United States and resumed teaching at the Tremont School. Periera would later earn a San Mokuroku in Sosuishitsu Ryu Jujutsu, a Koryu (Jujutsu), from the then current Headmaster Professor Shitama. Knowing that the Western life style and philosophy differs from the Eastern, he adapted the physical techniques and mind set of the Samurai to the culture of the dangerous streets of the modern, urban South Bronx. In effect, he created one of the few combat methods suited for today's streets. He combined elements of Judo, Aikido, Koryu Jujutsu, Karate, Boxing, and the less organized–but no less effective–element of Western street-style fighting.

In 1964 he formalized the name of his eclectic method Miyama Ryu Jujutsu, which means School of the Three Mountains in English, or Tremont in French. This was the avenue on which the school was located. In 1973 Pereira researched the classical ranking system of Japanese systems. He decided to use the ranking structure and nomenclature of the Japanese martial arts, both classical and modern. He took the title of Shinan, which means originator.

Shinan Pereira died in 1999. His legacy survives and the practice of Miyama Ryu Combat Jujutsu continues in New York, Miami, Chicago, the Dominican Republic, The Bahamas. Not only is Miyama Ryu Combat Jujutsu taught to civilians, but it has been used in the design of courses for United States Federal agents and taught at police and law enforcement academies across the world.`;

const defaults = {
  bg_image: "",
  founder_image: "",
  founder_caption: "Shinan Antonio Pereira",
  subtitle: "Our Legacy",
  title: "Our History",
  quote:
    "We are committed to preserving the core principles of traditional Jujutsu, honoring the spirit of the ancient Japanese Dojo. The rigorous training program at the Chicago Minami Dojo inspires students to develop body, mind and spirit in their personal journey of empowerment.",
  full_history: defaultFullHistory,
};

const HistorySection = () => {
  const c = useSiteContent("history", defaults);
  const bgSrc = c.bg_image || defaultHistoryBg;
  const founderSrc = c.founder_image || defaultShinanImg;
  const historyParagraphs = (c.full_history || defaultFullHistory)
    .split("\n")
    .filter((p: string) => p.trim());

  return (
    <section id="history" className="relative py-24 overflow-hidden">
      <img
        src={bgSrc}
        alt="Traditional Japanese dojo interior"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 overlay-dark" />
      <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
        <p className="text-primary tracking-[0.2em] uppercase text-sm font-medium mb-3">
          {c.subtitle}
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
          {c.title}
        </h2>
        <figure className="mb-8">
          <img
            src={founderSrc}
            alt={c.founder_caption}
            className="w-48 h-auto mx-auto rounded-md border-2 border-primary/20"
          />
          <figcaption className="mt-2 text-sm font-serif italic text-muted-foreground">
            {c.founder_caption}
          </figcaption>
        </figure>
        <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-serif italic">
          {c.quote}
        </p>
        <div className="mt-10">
          <Dialog>
            <DialogTrigger asChild>
              <button className="inline-block border border-primary text-primary px-8 py-4 rounded-md font-semibold text-sm tracking-wider uppercase hover:bg-primary hover:text-primary-foreground transition-all">
                Read More
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] p-0">
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="font-serif text-2xl md:text-3xl text-foreground">
                  Our Founder's Story
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="px-6 pb-6 max-h-[60vh]">
                <figure className="mb-6 text-center">
                  <img
                    src={founderSrc}
                    alt={c.founder_caption}
                    className="w-48 h-auto mx-auto rounded-md border-2 border-primary/20"
                  />
                  <figcaption className="mt-2 text-sm font-serif italic text-muted-foreground">
                    {c.founder_caption}
                  </figcaption>
                </figure>
                <div className="space-y-4 text-foreground/80 leading-relaxed pr-4">
                  {historyParagraphs.map((p: string, i: number) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
