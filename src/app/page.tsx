import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClassesSection from "@/components/ClassesSection";
import InstructorSection from "@/components/InstructorSection";
import AssistantInstructorsSection from "@/components/AssistantInstructorsSection";
import HistorySection from "@/components/HistorySection";
import EventsCalendarSection from "@/components/EventsCalendarSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ClassesSection />
      <InstructorSection />
      <AssistantInstructorsSection />
      <HistorySection />
      <EventsCalendarSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
