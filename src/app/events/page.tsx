import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventsCalendarSection from "@/components/EventsCalendarSection";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <EventsCalendarSection pageMode />
      <Footer />
    </div>
  );
}
