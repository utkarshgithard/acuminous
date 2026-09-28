"use client";

import { motion } from "framer-motion";
import { Phone, ClipboardList, Star, Sparkles } from "lucide-react";
import { useLang } from "@/app/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLang();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 rainbow-gradient opacity-90" />

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-2xl" />

      {/* Floating stars */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white/40"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 360],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <Star className="w-4 h-4 fill-current" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/30"
        >
          <Sparkles className="w-4 h-4" />
          {t("Admissions Open 2026–27", "प्रवेश खुले हैं 2026–27")}
        </motion.div>

        {/* School Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black text-white drop-shadow-lg leading-tight"
        >
          {t("Rhythm Foundation", "रिदम फाउंडेशन")}
          <br />
          <span className="text-yellow-200">{t("School", "स्कूल")}</span>
        </motion.h1>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-2 text-white/80 font-semibold text-lg tracking-wide"
        >
          📍 {t("Sasaram, Bihar", "सासाराम, बिहार")}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-white/90 text-xl md:text-2xl font-semibold italic"
        >
          &ldquo;{t("Learning with Joy, Growing with Values.", "खुशी से सीखो, मूल्यों के साथ बढ़ो।")}&rdquo;
        </motion.p>

        {/* Class Range */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 flex flex-wrap justify-center gap-2"
        >
          {["Nursery", "LKG", "UKG", "1–5", "6–8", "9–10"].map((cls) => (
            <span
              key={cls}
              className="px-3 py-1 bg-white/20 text-white text-sm font-bold rounded-full border border-white/30"
            >
              {t(`Class ${cls}`, `कक्षा ${cls}`)}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#admissions"
            id="hero-apply-btn"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#e76f51] font-black text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
          >
            <ClipboardList className="w-5 h-5" />
            {t("Apply for Admission", "प्रवेश के लिए आवेदन करें")}
          </a>
          <a
            href="tel:+917XXXXXXXXX"
            id="hero-call-btn"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur text-white font-black text-lg rounded-full border-2 border-white hover:bg-white hover:text-[#e76f51] transition-all duration-200 shadow-xl"
          >
            <Phone className="w-5 h-5" />
            {t("Call Now", "अभी कॉल करें")}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-14 grid grid-cols-3 gap-4 max-w-xl mx-auto"
        >
          {[
            { num: "500+", en: "Happy Students", hi: "खुश छात्र" },
            { num: "20+", en: "Expert Teachers", hi: "अनुभवी शिक्षक" },
            { num: "12+", en: "Years of Trust", hi: "वर्षों का विश्वास" },
          ].map((stat) => (
            <div
              key={stat.num}
              className="glass-card rounded-2xl py-4 px-2 text-center"
            >
              <div className="text-2xl font-black text-white">{stat.num}</div>
              <div className="text-white/80 text-xs font-semibold mt-1">
                {t(stat.en, stat.hi)}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 20C1200 70 960 0 720 30C480 60 240 10 0 40Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
