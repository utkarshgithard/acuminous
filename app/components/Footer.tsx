"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useLang } from "@/app/context/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-[#1a1a2e] text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full rainbow-gradient flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-black text-xl text-white">Rhythm Foundation School</div>
                <div className="text-white/50 text-sm">Sasaram, Bihar</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {t(
                "Learning with Joy, Growing with Values. Nurturing young minds since 2012.",
                "खुशी से सीखो, मूल्यों के साथ बढ़ो। 2012 से युवा मन का पोषण।"
              )}
            </p>
            <div className="mt-5 flex gap-2 flex-wrap">
              {["Nursery", "LKG/UKG", "Class 1–5", "Class 6–8", "Class 9–10"].map((cls) => (
                <span key={cls} className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/70">
                  {cls}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-white mb-4">{t("Quick Links", "त्वरित लिंक")}</h4>
            <ul className="space-y-2">
              {[
                { href: "#about", en: "About Us", hi: "हमारे बारे में" },
                { href: "#classes", en: "Classes Offered", hi: "कक्षाएँ" },
                { href: "#why-us", en: "Why Choose Us", hi: "क्यों चुनें" },
                { href: "#admissions", en: "Admissions", hi: "प्रवेश" },
                { href: "#gallery", en: "Gallery", hi: "गैलरी" },
                { href: "#contact", en: "Contact", hi: "संपर्क" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-white/60 hover:text-[#f4a435] transition-colors text-sm"
                  >
                    → {t(item.en, item.hi)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black text-white mb-4">{t("Contact", "संपर्क")}</h4>
            <div className="space-y-3 text-white/60 text-sm">
              <p>📍 {t("Sasaram, Rohtas, Bihar", "सासाराम, रोहतास, बिहार")}</p>
              <p>
                📞 <a href="tel:+91XXXXXXXXXX" className="hover:text-[#f4a435] transition-colors">+91-XXXXXXXXXX</a>
              </p>
              <p>
                ✉️ <a href="mailto:info@rhythmschool.in" className="hover:text-[#f4a435] transition-colors">info@rhythmschool.in</a>
              </p>
              <p>🕐 {t("Mon–Sat: 8 AM – 3 PM", "सोम–शनि: 8 AM – 3 PM")}</p>
            </div>

            <a
              href="#admissions"
              className="mt-6 inline-block px-5 py-2.5 bg-[#e76f51] text-white text-sm font-bold rounded-full hover:bg-[#d45f40] transition-colors"
            >
              {t("Apply Now →", "अभी आवेदन करें →")}
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
          <p>© 2026 Rhythm Foundation School, Sasaram, Bihar. {t("All rights reserved.", "सर्वाधिकार सुरक्षित।")}</p>
          <p>
            {t("Built with ❤️ for education", "शिक्षा के लिए ❤️ के साथ बनाया गया")}
          </p>
        </div>
      </div>
    </footer>
  );
}
