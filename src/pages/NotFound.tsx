import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-lg">
          <h1 className="text-[8rem] sm:text-[10rem] font-black leading-none text-gradient-green select-none">
            404
          </h1>

          <div className="w-16 h-px bg-gradient-green mx-auto my-6" />

          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Page Not Found
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">
            The path{" "}
            <code className="text-primary/80 bg-muted px-2 py-0.5 rounded text-sm">
              {location.pathname}
            </code>{" "}
            does not exist. It may have been moved or removed.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-3 rounded-md font-semibold hover:scale-105 transition-all shadow-gold"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
