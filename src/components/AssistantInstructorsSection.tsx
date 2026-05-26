"use client";

import { useState } from "react";
import monicaPhoto from "@/assets/assistant-monica.png";
import terryPhoto from "@/assets/assistant-terry.png";
import maxPhoto from "@/assets/assistant-max.png";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { imageSrc, type ImageSource } from "@/lib/image";

type Assistant = {
  id: string;
  name: string;
  photo: ImageSource;
  bio: string;
};

const assistants: Assistant[] = [
  {
    id: "monica",
    name: "Monica Vilanueva",
    photo: monicaPhoto,
    bio: "Monica Villanueva started and taught at the Kodenkan Academy of Martial Arts in Thornton, Illinois, as a headinstructor to promote Danzan Ryu Jujitsu. Her martial arts journey began in 1983 with Tae Kwon Do. Shestarted studying Danzan Ryu Jujitsu in 1989 with the intent to develop a well-rounded martial arts background. A nationally certified Yodan (4th Degree Black Belt) and Senior Instructor with the American Judo and Jujitsu Federation (AJJF), she also holds a Sankyu (3rd Degree Brown Belt) in Judo. ",
  },
  {
    id: "terry",
    name: "Grandmaster Terry Pointer",
    photo: terryPhoto,
    bio: "With over Fifty years of teaching Martial Arts with a strong traditional approach and an openmind for new ideas and concepts for growth. Master Pointer attempts to help people find themselves, to discover their creativity and their capacity for overall growth through the study of Martial Arts. He believes that there is much growth in each person and sees his purpose as that of nourishing the seed so that his students potential may be reached. He is a US Army Veteran and has a 10th dan in AVM Self-Defense System, 9th Dan in Kempo Ryu Kan Kay Bugei, 8th Dan Shorin Ryu, 7th Dan Shuri Ryu, and a 1st Dan in Tae Kwon Do.",
  },
  {
    id: "max",
    name: "Max Banuelos",
    photo: maxPhoto,
    bio: "Max Banuelos is our Assistant Instructor and has 10 years of experience and has trained in Miyama Ryu.",
  },
];

const AssistantInstructorsSection = () => {
  const [selected, setSelected] = useState<Assistant | null>(null);

  return (
    <section id="assistant-instructors" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Assistant Instructors
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {assistants.map((a) => (
            <div key={a.id} className="text-center">
              <button
                type="button"
                onClick={() => setSelected(a)}
                className="group w-full max-w-xs mx-auto block rounded-lg overflow-hidden border-2 border-primary/20 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-secondary transition-colors"
                aria-label={`Read bio for ${a.name}`}
              >
                <div className="aspect-[3/4] bg-card overflow-hidden">
                  <img
                    src={imageSrc(a.photo)}
                    alt={a.name}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </button>
              <h3 className="font-serif font-bold text-lg text-foreground mt-4">{a.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-md sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl text-foreground text-center sm:text-left">
                  {selected.name}
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col sm:flex-row gap-6 items-start pt-2">
                <div className="shrink-0 mx-auto sm:mx-0 w-40 rounded-md overflow-hidden border-2 border-primary/20">
                  <img
                    src={imageSrc(selected.photo)}
                    alt={selected.name}
                    className="w-full h-auto object-cover aspect-[3/4]"
                  />
                </div>
                <p className="text-foreground/80 leading-relaxed text-sm sm:text-base flex-1">
                  {selected.bio}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AssistantInstructorsSection;
