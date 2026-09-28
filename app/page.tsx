import { LanguageProvider } from "@/app/context/LanguageContext";
import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import AboutSection from "@/app/components/AboutSection";
import ClassesSection from "@/app/components/ClassesSection";
import WhyUsSection from "@/app/components/WhyUsSection";
import ActivitiesSection from "@/app/components/ActivitiesSection";
import AdmissionsSection from "@/app/components/AdmissionsSection";
import GallerySection from "@/app/components/GallerySection";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import ContactSection from "@/app/components/ContactSection";
import Footer from "@/app/components/Footer";
import WhatsAppButton from "@/app/components/WhatsAppButton";

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ClassesSection />
        <WhyUsSection />
        <ActivitiesSection />
        <AdmissionsSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </LanguageProvider>
  );
}
