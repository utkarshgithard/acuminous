"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLang } from "@/app/context/LanguageContext";

const galleryItems = [
  { emoji: "🎊", label: { en: "Republic Day Celebration", hi: "गणतंत्र दिवस समारोह" }, bg: "from-blue-300 to-indigo-400" },
  { emoji: "🏃", label: { en: "Annual Sports Day", hi: "वार्षिक खेल दिवस" }, bg: "from-green-300 to-emerald-400" },
  { emoji: "🎭", label: { en: "Cultural Programme", hi: "सांस्कृतिक कार्यक्रम" }, bg: "from-pink-300 to-rose-400" },
  { emoji: "🎃", label: { en: "Halloween & Fun Day", hi: "फन डे" }, bg: "from-orange-300 to-amber-400" },
  { emoji: "🧹", label: { en: "Swachh Bharat Drive", hi: "स्वच्छ भारत अभियान" }, bg: "from-teal-300 to-cyan-400" },
  { emoji: "📖", label: { en: "Reading Week", hi: "पठन सप्ताह" }, bg: "from-violet-300 to-purple-400" },
  { emoji: "🌳", label: { en: "Tree Plantation Day", hi: "पेड़ लगाओ दिवस" }, bg: "from-lime-300 to-green-400" },
  { emoji: "🎓", label: { en: "Graduation Ceremony", hi: "दीक्षांत समारोह" }, bg: "from-yellow-300 to-orange-400" },
  { emoji: "🍰", label: { en: "Founder's Day", hi: "संस्थापना दिवस" }, bg: "from-red-300 to-rose-400" },
];

export default function GallerySection() {
  const { lang, t } = useLang();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="gallery" ref={ref} className="py-20 px-4 bg-[#fff8f0] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-bold mb-3">
            {t("Memories", "यादें")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-800">
            {t("School ", "स्कूल ")}
            <span className="text-[#f06292]">{t("Gallery", "गैलरी")}</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            {t(
              "Glimpses from the events and celebrations that make our school unique.",
              "उन आयोजनों और समारोहों की झलकियाँ जो हमारे स्कूल को अनोखा बनाते हैं।"
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-5">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.label.en}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ scale: 1.04 }}
              className={`bg-gradient-to-br ${item.bg} rounded-3xl flex flex-col items-center justify-center aspect-square shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group`}
            >
              <span className="text-6xl md:text-7xl group-hover:scale-125 transition-transform duration-300">
                {item.emoji}
              </span>
              <span className="mt-4 px-3 text-white font-bold text-xs md:text-sm text-center drop-shadow">
                {lang === "en" ? item.label.en : item.label.hi}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-gray-400 text-sm">
            {t("📸 More photos on our WhatsApp & Social Media", "📸 हमारे WhatsApp और सोशल मीडिया पर और फोटो देखें")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
