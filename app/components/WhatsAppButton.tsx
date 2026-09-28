"use client";

import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/91XXXXXXXXXX?text=Hello%2C%20I%20want%20to%20know%20more%20about%20Rhythm%20Foundation%20School%20admissions."
      target="_blank"
      rel="noreferrer"
      id="whatsapp-float"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25d366] rounded-full flex items-center justify-center shadow-2xl cursor-pointer relative whatsapp-pulse"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-9 h-9 fill-white"
      >
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.821.734 5.469 2.018 7.773L0 32l8.434-2.009A15.937 15.937 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.855 22.676c-.33.929-1.928 1.779-2.646 1.836-.718.058-1.398.348-4.71-1.004-3.97-1.632-6.527-5.675-6.728-5.939-.2-.263-1.641-2.181-1.641-4.165s1.056-2.955 1.452-3.36c.396-.404.866-.505 1.155-.505.289 0 .578.003.831.015.267.013.625-.101.978.748.363.877 1.234 3.017 1.344 3.237.11.22.183.478.036.766-.147.289-.22.467-.432.72-.213.251-.448.562-.638.754-.213.213-.434.443-.186.869.247.426 1.099 1.814 2.361 2.939 1.621 1.446 2.992 1.893 3.42 2.103.427.21.676.175.926-.105.249-.278 1.063-1.242 1.347-1.668.284-.426.569-.354.959-.213.39.141 2.479 1.168 2.904 1.381.426.212.709.318.815.495.107.177.107 1.008-.224 1.936z" />
      </svg>
    </motion.a>
  );
}
