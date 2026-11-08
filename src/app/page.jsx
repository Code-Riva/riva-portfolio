import AtmosphericBackground from "@/components/AtmosphericBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectGallery from "@/components/ProjectGallery";
import ServicesSection from "@/components/ServicesSection";
import EnvironmentSection from "@/components/EnvironmentSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div id="top" className="relative flex min-h-screen flex-col">
      {/* Shared Atmospheric Dynamic Background */}
      <AtmosphericBackground />

      {/* Foreground Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main id="main-content" className="flex-1">
          <Hero />
          <ProjectGallery />
          <ServicesSection />
          <EnvironmentSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
