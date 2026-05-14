import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClassesSection from "@/components/ClassesSection";
import InstructorSection from "@/components/InstructorSection";
import HistorySection from "@/components/HistorySection";
import EventsCalendarSection from "@/components/EventsCalendarSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ClassesSection />
      <InstructorSection />
      <HistorySection />
      <EventsCalendarSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
