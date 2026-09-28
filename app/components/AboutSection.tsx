"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLang } from "@/app/context/LanguageContext";
import { Heart, Target, Eye } from "lucide-react";

export default function AboutSection() {
  const { t } = useLang();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" ref={ref} className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1 bg-orange-100 text-[#e76f51] rounded-full text-sm font-bold mb-3">
            {t("Our Story", "हमारी कहानी")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-800">
            {t("About ", "हमारे बारे में – ")}
            <span className="text-[#e76f51]">
              {t("Rhythm Foundation", "रिदम फाउंडेशन")}
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Illustration / Image block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-gradient-to-br from-orange-100 via-yellow-50 to-pink-100 flex items-center justify-center">
              {/* Decorative school scene */}
              <div className="text-center p-8">
                <div className="text-8xl mb-4">🏫</div>
                <div className="flex justify-center gap-4 text-5xl">
                  <span>📚</span><span>🎨</span><span>⚽</span>
                </div>
                <div className="flex justify-center gap-4 text-5xl mt-3">
                  <span>🎵</span><span>🌱</span><span>🏆</span>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-[#f4a435] text-white rounded-2xl px-4 py-3 shadow-xl font-black text-sm text-center">
              Est. <br />2012
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-gray-600 text-lg leading-relaxed">
              {t(
                "Rhythm Foundation School was established with a simple yet powerful belief — every child deserves to learn in an environment filled with joy, curiosity, and care. Located in the heart of Sasaram, Bihar, we have been nurturing young minds since 2012.",
                "रिदम फाउंडेशन स्कूल की स्थापना एक सरल लेकिन शक्तिशाली विश्वास के साथ की गई थी — प्रत्येक बच्चा खुशी, जिज्ञासा और देखभाल से भरे वातावरण में सीखने का हकदार है। सासाराम, बिहार के दिल में स्थित, हम 2012 से युवा मन का पोषण कर रहे हैं।"
              )}
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              {t(
                "We offer holistic education from Nursery to Class 10, blending academic excellence with character building, creativity, and community values.",
                "हम नर्सरी से कक्षा 10 तक समग्र शिक्षा प्रदान करते हैं, जो शैक्षणिक उत्कृष्टता को चरित्र निर्माण, रचनात्मकता और सामुदायिक मूल्यों के साथ जोड़ती है।"
              )}
            </p>

            {/* Mission/Vision/Values cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                {
                  icon: <Target className="w-6 h-6 text-[#e76f51]" />,
                  title: t("Mission", "मिशन"),
                  desc: t("Quality education for every child", "हर बच्चे के लिए गुणवत्तापूर्ण शिक्षा"),
                  bg: "bg-orange-50",
                },
                {
                  icon: <Eye className="w-6 h-6 text-[#9c7fe0]" />,
                  title: t("Vision", "विज़न"),
                  desc: t("Empowered, value-driven citizens", "सशक्त, मूल्य-आधारित नागरिक"),
                  bg: "bg-purple-50",
                },
                {
                  icon: <Heart className="w-6 h-6 text-[#f06292]" />,
                  title: t("Values", "मूल्य"),
                  desc: t("Honesty, Respect, Excellence", "ईमानदारी, सम्मान, उत्कृष्टता"),
                  bg: "bg-pink-50",
                },
              ].map((card) => (
                <div key={card.title} className={`${card.bg} rounded-2xl p-4 text-center`}>
                  <div className="flex justify-center mb-2">{card.icon}</div>
                  <div className="font-bold text-gray-800 text-sm">{card.title}</div>
                  <div className="text-gray-500 text-xs mt-1">{card.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
