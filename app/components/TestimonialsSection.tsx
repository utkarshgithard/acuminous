"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLang } from "@/app/context/LanguageContext";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: { en: "Priya Singh", hi: "प्रिया सिंह" },
    role: { en: "Mother of Aryan (Class 5)", hi: "आर्यन की माँ (कक्षा 5)" },
    quote: {
      en: "Rhythm School has transformed my son completely. His confidence, communication, and love for learning have grown tremendously. The teachers are like family.",
      hi: "रिदम स्कूल ने मेरे बेटे को पूरी तरह बदल दिया है। उसका आत्मविश्वास, संचार और सीखने की लालसा बहुत बढ़ी है। शिक्षक परिवार जैसे हैं।",
    },
    avatar: "🧕",
    rating: 5,
    color: "from-orange-50 to-pink-50",
    border: "border-orange-200",
  },
  {
    name: { en: "Ramesh Kumar", hi: "रमेश कुमार" },
    role: { en: "Father of Priya (Class 8)", hi: "प्रिया के पिता (कक्षा 8)" },
    quote: {
      en: "My daughter's academic results have improved significantly. The activity-based approach makes her genuinely enjoy studying. Best investment I've made.",
      hi: "मेरी बेटी के शैक्षणिक परिणामों में उल्लेखनीय सुधार हुआ है। गतिविधि-आधारित दृष्टिकोण उसे पढ़ाई का सच्चा आनंद देता है। यह मेरा सबसे अच्छा निवेश है।",
    },
    avatar: "👨",
    rating: 5,
    color: "from-blue-50 to-purple-50",
    border: "border-blue-200",
  },
  {
    name: { en: "Sunita Devi", hi: "सुनीता देवी" },
    role: { en: "Mother of Riya & Rohit (Nursery & Class 3)", hi: "रिया और रोहित की माँ (नर्सरी और कक्षा 3)" },
    quote: {
      en: "I have two children in Rhythm School and both are thriving. The school genuinely cares about every child's well-being, not just marks.",
      hi: "मेरे दो बच्चे रिदम स्कूल में हैं और दोनों खूब आगे बढ़ रहे हैं। स्कूल वास्तव में हर बच्चे की भलाई की परवाह करता है, सिर्फ अंकों की नहीं।",
    },
    avatar: "👩",
    rating: 5,
    color: "from-green-50 to-teal-50",
    border: "border-green-200",
  },
];

export default function TestimonialsSection() {
  const { lang, t } = useLang();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="testimonials" ref={ref} className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold mb-3">
            ⭐ {t("Parent Reviews", "अभिभावक समीक्षाएँ")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-800">
            {t("What ", "क्या कहते हैं ")}
            <span className="text-[#f4a435]">{t("Parents Say", "अभिभावक")}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t_, i) => (
            <motion.div
              key={t_.name.en}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className={`bg-gradient-to-br ${t_.color} border ${t_.border} rounded-3xl p-7 flex flex-col gap-5 shadow hover:shadow-xl transition-all`}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-[#f4a435] opacity-60" />

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(t_.rating)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-gray-700 italic leading-relaxed text-sm flex-1">
                &ldquo;{lang === "en" ? t_.quote.en : t_.quote.hi}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/50">
                <span className="text-4xl">{t_.avatar}</span>
                <div>
                  <div className="font-black text-gray-800">
                    {lang === "en" ? t_.name.en : t_.name.hi}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {lang === "en" ? t_.role.en : t_.role.hi}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
