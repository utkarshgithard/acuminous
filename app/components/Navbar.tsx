"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, BookOpen } from "lucide-react";
import { useLang } from "@/app/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "#about", en: "About", hi: "हमारे बारे में" },
  { href: "#classes", en: "Classes", hi: "कक्षाएँ" },
  { href: "#why-us", en: "Why Us", hi: "क्यों चुनें" },
  { href: "#admissions", en: "Admissions", hi: "प्रवेश" },
  { href: "#gallery", en: "Gallery", hi: "गैलरी" },
  { href: "#contact", en: "Contact", hi: "संपर्क" },
];

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="#hero" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full rainbow-gradient flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <span className={`font-black text-lg ${scrolled ? "text-[#e76f51]" : "text-white drop-shadow"}`}>
              Rhythm
            </span>
            <span className={`block text-xs font-semibold tracking-wide ${scrolled ? "text-gray-500" : "text-white/80 drop-shadow"}`}>
              Foundation School
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold hover:text-[#e76f51] transition-colors ${
                scrolled ? "text-gray-700" : "text-white drop-shadow"
              }`}
            >
              {lang === "en" ? item.en : item.hi}
            </a>
          ))}

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 rounded-full border-2 border-[#e76f51] text-[#e76f51] text-sm font-bold hover:bg-[#e76f51] hover:text-white transition-all"
          >
            {lang === "en" ? "हिंदी" : "EN"}
          </button>

          <a
            href="#admissions"
            className="px-4 py-2 rounded-full bg-[#e76f51] text-white text-sm font-bold shadow hover:bg-[#d45f40] hover:scale-105 transition-all"
          >
            {t("Apply Now", "अभी आवेदन करें")}
          </a>
        </nav>

        {/* Mobile: lang toggle + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleLang}
            className={`px-2 py-1 rounded-full border text-xs font-bold transition-all ${
              scrolled
                ? "border-[#e76f51] text-[#e76f51]"
                : "border-white text-white"
            }`}
          >
            {lang === "en" ? "हिंदी" : "EN"}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-lg ${scrolled ? "text-gray-700" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/98 backdrop-blur-md border-t border-orange-100 shadow-lg overflow-hidden"
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="py-3 px-3 rounded-lg text-gray-700 font-semibold hover:bg-orange-50 hover:text-[#e76f51] transition-all text-base"
                >
                  {lang === "en" ? item.en : item.hi}
                </a>
              ))}
              <a
                href="#admissions"
                onClick={() => setIsOpen(false)}
                className="mt-2 py-3 text-center rounded-full bg-[#e76f51] text-white font-bold hover:bg-[#d45f40] transition-all"
              >
                {t("Apply for Admission", "प्रवेश के लिए आवेदन करें")}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
