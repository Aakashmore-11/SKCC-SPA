import React from 'react';
import { motion } from 'framer-motion';

const AnnouncementBanner = () => {
  return (
    <div className="bg-[#0A0A0F] border-b border-white/5 overflow-hidden py-1.5 whitespace-nowrap relative z-[110]">
      <motion.div
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="font-black text-[10px] uppercase tracking-[0.2em] inline-block text-yellow-400"
      >
        <span className="mx-8">✨ Admissions Open 2026-27</span>
        <span className="mx-8">Limited Seats for Free Summer Batch (April - June)</span>
        <span className="mx-8">Classes 1-12 & College Excellence ✨</span>
      </motion.div>
    </div>
  );
};

export default AnnouncementBanner;
