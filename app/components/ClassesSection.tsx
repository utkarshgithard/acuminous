"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLang } from "@/app/context/LanguageContext";

const classes = [
  { emoji: "🌱", name: "Pre-Nursery", hi: "प्री-नर्सरी", age: "2.5–3 yrs", color: "from-green-100 to-emerald-200", border: "border-green-300", badge: "bg-green-500" },
  { emoji: "🌸", name: "Nursery", hi: "नर्सरी", age: "3–4 yrs", color: "from-pink-100 to-rose-200", border: "border-pink-300", badge: "bg-pink-500" },
  { emoji: "🦋", name: "LKG", hi: "एलकेजी", age: "4–5 yrs", color: "from-yellow-100 to-amber-200", border: "border-yellow-300", badge: "bg-yellow-500" },
  { emoji: "⭐", name: "UKG", hi: "यूकेजी", age: "5–6 yrs", color: "from-orange-100 to-orange-200", border: "border-orange-300", badge: "bg-orange-500" },
  { emoji: "📖", name: "Class 1–2", hi: "कक्षा 1–2", age: "6–8 yrs", color: "from-sky-100 to-blue-200", border: "border-sky-300", badge: "bg-sky-500" },
  { emoji: "🔬", name: "Class 3–5", hi: "कक्षा 3–5", age: "8–11 yrs", color: "from-violet-100 to-purple-200", border: "border-violet-300", badge: "bg-violet-500" },
  { emoji: "🧮", name: "Class 6–8", hi: "कक्षा 6–8", age: "11–14 yrs", color: "from-teal-100 to-cyan-200", border: "border-teal-300", badge: "bg-teal-500" },
  { emoji: "🎓", name: "Class 9–10", hi: "कक्षा 9–10", age: "14–16 yrs", color: "from-red-100 to-rose-200", border: "border-red-300", badge: "bg-red-500" },
];

export default function ClassesSection() {
  const { t, lang } = useLang();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="classes" ref={ref} className="py-20 px-4 bg-[#fff8f0] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1 bg-yellow-100 text-[#f4a435] rounded-full text-sm font-bold mb-3">
            {t("Academics", "शैक्षणिक")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-800">
            {t("Classes ", "कक्षाएँ ")}
            <span className="text-[#f4a435]">{t("Offered", "उपलब्ध")}</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            {t(
              "From playful beginnings to board exam excellence — we've got every stage covered.",
              "खेलपूर्ण शुरुआत से बोर्ड परीक्षा की उत्कृष्टता तक — हम हर चरण को कवर करते हैं।"
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {classes.map((cls, i) => (
            <motion.div
              key={cls.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className={`relative bg-gradient-to-br ${cls.color} border ${cls.border} rounded-3xl p-5 flex flex-col items-center text-center shadow hover:shadow-xl transition-all cursor-pointer group`}
            >
              <span className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {cls.emoji}
              </span>
              <h3 className="font-black text-gray-800 text-base leading-tight">
                {lang === "en" ? cls.name : cls.hi}
              </h3>
              <div className={`mt-3 px-3 py-1 ${cls.badge} text-white text-xs rounded-full font-semibold`}>
                {t(`Age: ${cls.age}`, `आयु: ${cls.age}`)}
              </div>

              {/* Hover detail */}
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-600 font-medium">
                <a href="#admissions" className="underline text-[#e76f51]">
                  {t("Enquire →", "पूछें →")}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
