"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLang } from "@/app/context/LanguageContext";

const activities = [
  { emoji: "🎨", en: "Art & Craft Studio", hi: "कला एवं शिल्प स्टूडियो" },
  { emoji: "🔬", en: "Science Lab", hi: "विज्ञान प्रयोगशाला" },
  { emoji: "💻", en: "Computer Lab", hi: "कंप्यूटर लैब" },
  { emoji: "📚", en: "Library", hi: "पुस्तकालय" },
  { emoji: "⚽", en: "Sports Ground", hi: "खेल का मैदान" },
  { emoji: "🎵", en: "Music Room", hi: "संगीत कक्ष" },
  { emoji: "🌿", en: "Nature Garden", hi: "प्रकृति उद्यान" },
  { emoji: "🍱", en: "Hygienic Canteen", hi: "स्वच्छ कैंटीन" },
  { emoji: "🚌", en: "School Transport", hi: "स्कूल परिवहन" },
  { emoji: "🏥", en: "First Aid Room", hi: "प्राथमिक चिकित्सा कक्ष" },
  { emoji: "📡", en: "Smart Classrooms", hi: "स्मार्ट कक्षाएँ" },
  { emoji: "🎭", en: "Stage & Auditorium", hi: "मंच एवं सभागार" },
];

export default function ActivitiesSection() {
  const { t, lang } = useLang();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="activities" ref={ref} className="py-20 px-4 bg-gradient-to-br from-sky-50 via-white to-teal-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1 bg-sky-100 text-sky-600 rounded-full text-sm font-bold mb-3">
            {t("Campus Life", "परिसर जीवन")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-800">
            {t("Activities & ", "गतिविधियाँ एवं ")}
            <span className="text-[#4fc3f7]">{t("Facilities", "सुविधाएँ")}</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            {t(
              "World-class facilities to make learning an adventure every single day.",
              "सीखने को हर दिन एक रोमांच बनाने के लिए विश्व स्तरीय सुविधाएँ।"
            )}
          </p>
        </motion.div>

        {/* Activity Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {activities.map((act, i) => (
            <motion.div
              key={act.en}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg border border-gray-100 transition-all group cursor-pointer"
            >
              <span className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">
                {act.emoji}
              </span>
              <span className="text-xs font-bold text-gray-700 leading-tight">
                {lang === "en" ? act.en : act.hi}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Photo Gallery Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {[
            { emoji: "🎉", label: t("Annual Day 2025", "वार्षिकोत्सव 2025"), bg: "from-orange-200 to-pink-200" },
            { emoji: "🏅", label: t("Sports Day", "खेल दिवस"), bg: "from-sky-200 to-blue-200" },
            { emoji: "🎨", label: t("Art Exhibition", "कला प्रदर्शनी"), bg: "from-purple-200 to-indigo-200" },
            { emoji: "🌿", label: t("Eco Week", "पर्यावरण सप्ताह"), bg: "from-green-200 to-emerald-200" },
            { emoji: "🎵", label: t("Music Festival", "संगीत महोत्सव"), bg: "from-yellow-200 to-amber-200" },
            { emoji: "🏆", label: t("Prize Distribution", "पुरस्कार वितरण"), bg: "from-red-200 to-rose-200" },
          ].map((item) => (
            <div
              key={item.label}
              className={`bg-gradient-to-br ${item.bg} rounded-3xl p-8 flex flex-col items-center justify-center aspect-[4/3] shadow-md hover:shadow-xl transition-shadow`}
            >
              <span className="text-6xl mb-3">{item.emoji}</span>
              <span className="font-bold text-gray-700 text-sm text-center">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
