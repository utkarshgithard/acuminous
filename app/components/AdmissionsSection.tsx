"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { useLang } from "@/app/context/LanguageContext";
import {
  CheckCircle, Loader2, FileText, Phone,
  User, GraduationCap, Mail, MessageSquare,
} from "lucide-react";

const enquirySchema = z.object({
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  childName: z.string().min(2, "Child name must be at least 2 characters"),
  classApplied: z.string().min(1, "Please select a class"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  message: z.string().max(500).optional(),
});

type EnquiryForm = z.infer<typeof enquirySchema>;

const steps = [
  { num: "01", en: "Fill the Enquiry Form below", hi: "नीचे दिया गया जाँच फॉर्म भरें" },
  { num: "02", en: "Our team calls you within 24 hours", hi: "हमारी टीम 24 घंटे में कॉल करती है" },
  { num: "03", en: "Visit school for a campus tour", hi: "परिसर भ्रमण के लिए स्कूल आएं" },
  { num: "04", en: "Submit documents & complete admission", hi: "दस्तावेज़ जमा करें और प्रवेश पूरा करें" },
];

const documents = [
  { en: "Birth Certificate", hi: "जन्म प्रमाण पत्र" },
  { en: "Previous School Transfer Certificate (if applicable)", hi: "पिछले स्कूल का स्थानांतरण प्रमाण पत्र (यदि लागू हो)" },
  { en: "Last Year Report Card", hi: "पिछले वर्ष की मार्कशीट" },
  { en: "Aadhar Card of Child & Parent", hi: "बच्चे और अभिभावक का आधार कार्ड" },
  { en: "4 Passport Size Photographs", hi: "4 पासपोर्ट साइज फोटो" },
  { en: "Residential Proof (for local applicants)", hi: "निवास प्रमाण (स्थानीय आवेदकों के लिए)" },
];

const classOptions = [
  "Pre-Nursery", "Nursery", "LKG", "UKG",
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
];

export default function AdmissionsSection() {
  const { t, lang } = useLang();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryForm>({ resolver: zodResolver(enquirySchema) });

  const onSubmit = async (data: EnquiryForm) => {
    setSubmitting(true);
    setError(null);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    // Fallback: if EmailJS is not configured, open WhatsApp with the enquiry
    if (!serviceId || serviceId === "your_service_id") {
      const msg = encodeURIComponent(
        `Hello, I want to enquire about admission.\n\n` +
        `Parent: ${data.parentName}\nChild: ${data.childName}\n` +
        `Class: ${data.classApplied}\nPhone: ${data.phone}` +
        (data.message ? `\nMessage: ${data.message}` : "")
      );
      window.open(`https://wa.me/91XXXXXXXXXX?text=${msg}`, "_blank");
      setSubmitted(true);
      reset();
      setSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          parent_name: data.parentName,
          child_name: data.childName,
          class_applied: data.classApplied,
          phone: data.phone,
          email: data.email || "Not provided",
          message: data.message || "No message",
        },
        publicKey
      );
      setSubmitted(true);
      reset();
    } catch {
      setError(
        t(
          "Failed to send. Please call us directly or message on WhatsApp.",
          "भेजने में विफल। कृपया सीधे कॉल करें या WhatsApp पर संदेश करें।"
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="admissions" ref={ref} className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1 bg-orange-100 text-[#e76f51] rounded-full text-sm font-bold mb-3">
            🎓 {t("Admissions Open 2026–27", "प्रवेश खुले हैं 2026–27")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-800">
            {t("Join the ", "जुड़ें ")}
            <span className="text-[#e76f51]">{t("Rhythm Family", "रिदम परिवार से")}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Steps + Documents */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Steps */}
            <div>
              <h3 className="font-black text-xl text-gray-800 mb-5 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#e76f51]" />
                {t("How to Apply", "आवेदन कैसे करें")}
              </h3>
              <div className="space-y-4">
                {steps.map((step) => (
                  <div key={step.num} className="flex gap-4 items-start">
                    <div className="w-10 h-10 flex-shrink-0 rainbow-gradient rounded-xl flex items-center justify-center text-white font-black text-sm shadow">
                      {step.num}
                    </div>
                    <p className="text-gray-600 font-medium pt-2 leading-snug">
                      {lang === "en" ? step.en : step.hi}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="font-black text-xl text-gray-800 mb-5 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#4caf81]" />
                {t("Documents Required", "आवश्यक दस्तावेज़")}
              </h3>
              <ul className="space-y-2">
                {documents.map((doc) => (
                  <li key={doc.en} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-[#4caf81] mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{lang === "en" ? doc.en : doc.hi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-3xl p-7 shadow-xl border border-orange-100">
              <h3 className="font-black text-xl text-gray-800 mb-6">
                {t("Admission Enquiry Form", "प्रवेश जाँच फॉर्म")}
              </h3>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h4 className="font-black text-2xl text-gray-800 mb-2">
                      {t("Enquiry Received! 🎉", "पूछताछ प्राप्त हुई! 🎉")}
                    </h4>
                    <p className="text-gray-500 mb-6">
                      {t(
                        "Our team will contact you within 24 working hours.",
                        "हमारी टीम 24 कार्य घंटों के भीतर आपसे संपर्क करेगी।"
                      )}
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 bg-[#e76f51] text-white font-bold rounded-full hover:bg-[#d45f40] transition-colors"
                    >
                      {t("Submit Another Enquiry", "और एक पूछताछ भेजें")}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    {/* Parent Name */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        <User className="w-4 h-4 inline mr-1 text-[#e76f51]" />
                        {t("Parent / Guardian Name *", "अभिभावक का नाम *")}
                      </label>
                      <input
                        {...register("parentName")}
                        id="parentName"
                        type="text"
                        placeholder={t("Enter your name", "अपना नाम दर्ज करें")}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-[#e76f51] focus:outline-none transition-colors"
                      />
                      {errors.parentName && (
                        <p className="text-red-500 text-xs mt-1">{errors.parentName.message}</p>
                      )}
                    </div>

                    {/* Child Name */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        <User className="w-4 h-4 inline mr-1 text-[#f4a435]" />
                        {t("Child's Name *", "बच्चे का नाम *")}
                      </label>
                      <input
                        {...register("childName")}
                        id="childName"
                        type="text"
                        placeholder={t("Enter child's name", "बच्चे का नाम दर्ज करें")}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-[#f4a435] focus:outline-none transition-colors"
                      />
                      {errors.childName && (
                        <p className="text-red-500 text-xs mt-1">{errors.childName.message}</p>
                      )}
                    </div>

                    {/* Class */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        <GraduationCap className="w-4 h-4 inline mr-1 text-[#9c7fe0]" />
                        {t("Class Applying For *", "किस कक्षा के लिए आवेदन *")}
                      </label>
                      <select
                        {...register("classApplied")}
                        id="classApplied"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-[#9c7fe0] focus:outline-none transition-colors bg-white"
                      >
                        <option value="">{t("Select a class", "कक्षा चुनें")}</option>
                        {classOptions.map((cls) => (
                          <option key={cls} value={cls}>{cls}</option>
                        ))}
                      </select>
                      {errors.classApplied && (
                        <p className="text-red-500 text-xs mt-1">{errors.classApplied.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        <Phone className="w-4 h-4 inline mr-1 text-[#4fc3f7]" />
                        {t("Mobile Number *", "मोबाइल नंबर *")}
                      </label>
                      <input
                        {...register("phone")}
                        id="phone"
                        type="tel"
                        placeholder="9XXXXXXXXX"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-[#4fc3f7] focus:outline-none transition-colors"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Email (optional) */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        <Mail className="w-4 h-4 inline mr-1 text-[#4caf81]" />
                        {t("Email (Optional)", "ईमेल (वैकल्पिक)")}
                      </label>
                      <input
                        {...register("email")}
                        id="email"
                        type="email"
                        placeholder="example@gmail.com"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-[#4caf81] focus:outline-none transition-colors"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        <MessageSquare className="w-4 h-4 inline mr-1 text-gray-400" />
                        {t("Message (Optional)", "संदेश (वैकल्पिक)")}
                      </label>
                      <textarea
                        {...register("message")}
                        id="message"
                        rows={3}
                        placeholder={t("Any specific questions?", "कोई विशेष प्रश्न?")}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-gray-400 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {error && (
                      <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      id="submit-enquiry"
                      disabled={submitting}
                      className="w-full py-4 bg-[#e76f51] text-white font-black text-lg rounded-xl hover:bg-[#d45f40] disabled:opacity-60 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {t("Sending...", "भेज रहे हैं...")}
                        </>
                      ) : (
                        t("Send Enquiry", "पूछताछ भेजें")
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400">
                      {t(
                        "Or WhatsApp us directly →",
                        "या सीधे WhatsApp करें →"
                      )}{" "}
                      <a
                        href="https://wa.me/91XXXXXXXXXX"
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-600 font-semibold underline"
                      >
                        +91-XXXXXXXXXX
                      </a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
