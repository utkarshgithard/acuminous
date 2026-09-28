"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLang } from "@/app/context/LanguageContext";
import {
  Heart, ShieldCheck, BookOpen, Palette,
  Trophy, Users, Leaf, Music,
} from "lucide-react";

const features = [
  {
    icon: <Heart className="w-7 h-7" />,
    en: "Caring Teachers",
    hi: "देखभाल करने वाले शिक्षक",
    desc_en: "Experienced, nurturing educators who treat every child as their own.",
    desc_hi: "अनुभवी, पोषण करने वाले शिक्षक जो हर बच्चे को अपना मानते हैं।",
    color: "text-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    en: "Activity-Based Learning",
    hi: "गतिविधि-आधारित शिक्षा",
    desc_en: "Learning through doing — projects, experiments, and hands-on activities.",
    desc_hi: "करके सीखना — परियोजनाएँ, प्रयोग और व्यावहारिक गतिविधियाँ।",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    en: "Safe Campus",
    hi: "सुरक्षित परिसर",
    desc_en: "CCTV-monitored, secure environment where children thrive without worry.",
    desc_hi: "सीसीटीवी-निगरानी, सुरक्षित वातावरण जहाँ बच्चे बिना चिंता के फलते-फूलते हैं।",
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  {
    icon: <Leaf className="w-7 h-7" />,
    en: "Value Education",
    hi: "मूल्य शिक्षा",
    desc_en: "Instilling honesty, respect, and moral values alongside academics.",
    desc_hi: "शिक्षाविदों के साथ ईमानदारी, सम्मान और नैतिक मूल्यों को स्थापित करना।",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    icon: <Palette className="w-7 h-7" />,
    en: "Creative Arts & Crafts",
    hi: "रचनात्मक कला एवं शिल्प",
    desc_en: "Fostering creativity through art, craft, music, and cultural programs.",
    desc_hi: "कला, शिल्प, संगीत और सांस्कृतिक कार्यक्रमों के माध्यम से रचनात्मकता को बढ़ावा।",
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  {
    icon: <Trophy className="w-7 h-7" />,
    en: "Sports & Competitions",
    hi: "खेल एवं प्रतियोगिताएँ",
    desc_en: "Regular sports days, quizzes, and inter-school competitions.",
    desc_hi: "नियमित खेल दिवस, प्रश्नोत्तरी और अंतर-विद्यालय प्रतियोगिताएँ।",
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    icon: <Users className="w-7 h-7" />,
    en: "Parent Partnership",
    hi: "अभिभावक भागीदारी",
    desc_en: "Regular PTMs, WhatsApp updates, and an open-door policy for parents.",
    desc_hi: "नियमित पीटीएम, व्हाट्सएप अपडेट और अभिभावकों के लिए खुले दरवाजे की नीति।",
    color: "text-cyan-500",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
  },
  {
    icon: <Music className="w-7 h-7" />,
    en: "Music & Performing Arts",
    hi: "संगीत एवं प्रदर्शन कला",
    desc_en: "Weekly music, dance, and drama sessions for holistic development.",
    desc_hi: "समग्र विकास के लिए साप्ताहिक संगीत, नृत्य और नाटक सत्र।",
    color: "text-pink-500",
    bg: "bg-pink-50",
    border: "border-pink-200",
  },
];

export default function WhyUsSection() {
  const { t, lang } = useLang();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="why-us" ref={ref} className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-bold mb-3">
            {t("Our Strengths", "हमारी ताकत")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-800">
            {t("Why Choose ", "क्यों चुनें ")}
            <span className="text-[#9c7fe0]">{t("Rhythm?", "रिदम?")}</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            {t(
              "We don't just teach — we inspire, protect, and grow your child into a confident, compassionate individual.",
              "हम सिर्फ पढ़ाते नहीं — हम आपके बच्चे को एक आत्मविश्वासी, दयालु व्यक्ति बनाने के लिए प्रेरित, सुरक्षित और विकसित करते हैं।"
            )}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat, i) => (
            <motion.div
              key={feat.en}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className={`${feat.bg} border ${feat.border} rounded-3xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-lg transition-all group`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center ${feat.color} group-hover:scale-110 transition-transform`}>
                {feat.icon}
              </div>
              <h3 className="font-black text-gray-800 text-base">
                {lang === "en" ? feat.en : feat.hi}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {lang === "en" ? feat.desc_en : feat.desc_hi}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
