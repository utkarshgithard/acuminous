"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLang } from "@/app/context/LanguageContext";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactSection() {
  const { t } = useLang();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" ref={ref} className="py-20 px-4 bg-[#fff8f0] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-bold mb-3">
            {t("Find Us", "हमसे मिलें")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-800">
            {t("Contact ", "संपर्क ")}
            <span className="text-[#4caf81]">{t("Us", "करें")}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            {[
              {
                icon: <MapPin className="w-6 h-6 text-[#e76f51]" />,
                label: t("Address", "पता"),
                value: t(
                  "Rhythm Foundation School, [Your Street], Sasaram, Rohtas, Bihar – 821115",
                  "रिदम फाउंडेशन स्कूल, [आपकी गली], सासाराम, रोहतास, बिहार – 821115"
                ),
                bg: "bg-orange-50 border-orange-200",
              },
              {
                icon: <Phone className="w-6 h-6 text-[#4fc3f7]" />,
                label: t("Phone / WhatsApp", "फोन / व्हाट्सएप"),
                value: "+91-XXXXXXXXXX",
                href: "tel:+91XXXXXXXXXX",
                bg: "bg-blue-50 border-blue-200",
              },
              {
                icon: <Mail className="w-6 h-6 text-[#4caf81]" />,
                label: t("Email", "ईमेल"),
                value: "info@rhythmschool.in",
                href: "mailto:info@rhythmschool.in",
                bg: "bg-green-50 border-green-200",
              },
              {
                icon: <Clock className="w-6 h-6 text-[#9c7fe0]" />,
                label: t("Office Hours", "कार्यालय समय"),
                value: t(
                  "Mon – Sat: 8:00 AM – 3:00 PM\nSun: Closed",
                  "सोम – शनि: सुबह 8:00 – दोपहर 3:00\nरवि: बंद"
                ),
                bg: "bg-purple-50 border-purple-200",
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-start gap-4 p-5 rounded-2xl border ${item.bg} shadow-sm`}
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-gray-600 hover:text-[#e76f51] transition-colors whitespace-pre-line">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-600 whitespace-pre-line">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="pt-2">
              <p className="font-bold text-gray-700 mb-3">{t("Follow Us", "हमें फॉलो करें")}</p>
              <div className="flex gap-3">
                {[
                  { label: "Facebook", emoji: "📘", href: "#" },
                  { label: "Instagram", emoji: "📸", href: "#" },
                  { label: "YouTube", emoji: "▶️", href: "#" },
                  { label: "WhatsApp", emoji: "💬", href: "https://wa.me/91XXXXXXXXXX" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-[#e76f51] hover:text-[#e76f51] transition-all shadow-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{s.emoji}</span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.5504743786485!2d84.0293!3d24.9485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d4f56e27e4a1d%3A0x3ba8e7cde7c25d18!2sSasaram%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rhythm Foundation School Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
