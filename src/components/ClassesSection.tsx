import defaultClassesImg from "@/assets/classes-jujutsu.jpg";
import { Baby, Swords, Users } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const iconMap: Record<string, any> = {
  "All Ages & Levels": Users,
  "Kids Classes": Baby,
  "Combat Jujutsu": Swords,
};

const defaultFeatures = [
  { title: "All Ages & Levels", desc: "Classes for beginners to advanced practitioners, adults and kids." },
  { title: "Kids Classes", desc: "Fun, structured classes that build confidence, discipline, and coordination for young martial artists." },
  { title: "Combat Jujutsu", desc: "Strategic self-defense focused on leverage and technique over brute force." },
];

const defaultStats = [
  { num: "3", label: "Class Types" },
  { num: "40+", label: "Years Legacy" },
  { num: "$99", label: "Trial Offer" },
];

const defaultOffers = [
  { title: "$99 Trial Offer", desc: "4-week New Student Trial. Experience our classes, instructors, and dojo. New students only — one trial per person.", cta: "Start Your Trial", featured: true },
  { title: "$135 Monthly Membership", desc: "Unlimited access to all classes. Train at your own pace with flexible scheduling and full dojo access.", cta: "Learn More", featured: false },
  { title: "Family Plan", desc: "Enroll the whole family and save. Discounts for each additional family member.", cta: "Get Details", featured: false },
];

const defaultSchedule = [
  { day: "Monday", time: "4:00 – 4:30 PM", className: "Little Ninjas" },
  { day: "Monday", time: "4:45 – 5:30 PM", className: "Kids Class" },
  { day: "Monday", time: "6:00 – 7:00 PM", className: "Teens & Adults" },
  { day: "Tuesday", time: "4:00 – 4:30 PM", className: "Little Ninjas" },
  { day: "Tuesday", time: "4:45 – 5:30 PM", className: "Kids Class" },
  { day: "Tuesday", time: "6:00 – 7:00 PM", className: "Teens & Adults" },
  { day: "Wednesday", time: "4:00 – 4:30 PM", className: "Little Ninjas" },
  { day: "Wednesday", time: "4:45 – 5:30 PM", className: "Kids Class" },
  { day: "Wednesday", time: "6:00 – 7:00 PM", className: "Teens & Adults" },
  { day: "Thursday", time: "4:00 – 4:30 PM", className: "Little Ninjas" },
  { day: "Thursday", time: "4:45 – 5:30 PM", className: "Kids Class" },
  { day: "Thursday", time: "6:00 – 7:00 PM", className: "Teens & Adults" },
  { day: "Friday", time: "By Appointment Only", className: "" },
  { day: "Saturday", time: "By Appointment Only", className: "" },
  { day: "Sunday", time: "By Appointment Only", className: "" },
];

const defaults = {
  image: "",
  subtitle: "Train With Purpose",
  title: "Classes for All Ages",
  description: "Our martial arts classes are designed to improve students' lives.",
  features: defaultFeatures,
  stats: defaultStats,
  offers: defaultOffers,
  schedule: defaultSchedule,
};

const ClassesSection = () => {
  const c = useSiteContent("classes", defaults);
  const imgSrc = c.image || defaultClassesImg;
  const features = c.features?.length ? c.features : defaultFeatures;
  const stats = c.stats?.length ? c.stats : defaultStats;
  const offers = c.offers?.length ? c.offers : defaultOffers;
  const schedule = c.schedule?.length ? c.schedule : defaultSchedule;

  const scheduleRows = (() => {
    const rows: { day: string; time: string; className: string; isFirst: boolean; span: number }[] = [];
    let i = 0;
    while (i < schedule.length) {
      const day = schedule[i].day;
      let span = 0;
      for (let j = i; j < schedule.length && schedule[j].day === day; j++) span++;
      for (let j = 0; j < span; j++) {
        rows.push({ ...schedule[i + j], isFirst: j === 0, span });
      }
      i += span;
    }
    return rows;
  })();

  return (
    <section id="classes" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary tracking-[0.2em] uppercase text-sm font-medium mb-3">{c.subtitle}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">{c.title}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <div className="relative">
            <div className="rounded-lg overflow-hidden border-2 border-primary/20">
              <img
                src={imgSrc}
                alt="Jujutsu training in the dojo"
                className="w-full h-[500px] object-cover object-top"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-foreground/80 text-lg leading-relaxed">{c.description}</p>

            <div className="space-y-5">
              {features.map((f: any) => {
                const Icon = iconMap[f.title] || Users;
                return (
                  <div key={f.title} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-foreground text-lg">{f.title}</h3>
                      <p className="text-muted-foreground text-sm">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
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

        <div className="max-w-5xl mx-auto mt-12 space-y-8">
          <div className="bg-card border border-border rounded-lg p-6 overflow-x-auto">
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">Class Schedule</h3>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-3 font-semibold text-foreground">Day</th>
                  <th className="py-2 px-3 font-semibold text-foreground">Time</th>
                  <th className="py-2 pl-3 font-semibold text-foreground">Class</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {scheduleRows.map((row, i) => (
                  <tr key={i} className={i < scheduleRows.length - 1 ? "border-b border-border/50" : ""}>
                    {row.isFirst && (
                      <td className="py-2 pr-3 font-medium text-foreground" rowSpan={row.span}>
                        {row.day}
                      </td>
                    )}
                    {row.className ? (
                      <>
                        <td className="py-2 px-3">{row.time}</td>
                        <td className="py-2 pl-3">{row.className}</td>
                      </>
                    ) : (
                      <td className="py-2 px-3" colSpan={2}>{row.time}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {offers.map((offer: any, i: number) => (
              <div
                key={offer.title}
                className={`bg-card border rounded-lg p-8 text-center ${
                  (offer.featured ?? i === 0) ? "border-primary ring-2 ring-primary/20" : "border-border"
                }`}
              >
                <h3 className="font-serif text-2xl font-bold text-primary mb-3">{offer.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{offer.desc}</p>
                <a
                  href="#contact"
                  className="inline-block bg-gradient-gold text-primary-foreground px-6 py-3 rounded-md text-sm font-semibold tracking-wider uppercase shadow-gold hover:scale-105 transition-transform"
                >
                  {offer.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassesSection;
