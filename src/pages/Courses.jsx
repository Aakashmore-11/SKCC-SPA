import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Users, Clock, Sparkles, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent } from "../ContentContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const FEATURES = [
  { icon: <Users size={12} />, text: "Personalized Batches" },
  { icon: <Clock size={12} />, text: "Flexible Schedules" },
  { icon: <Sparkles size={12} />, text: "Doubt Solving" },
];

const Courses = () => {
  const { courses } = useContent();

  return (
    <div className="relative pt-32 pb-40 bg-[#06060A] overflow-hidden">

      {/* Ambient Glows */}
      <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-yellow-400/4 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-indigo-500/4 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* ── HEADER ── */}
        <div className="mb-20 max-w-3xl">
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible"
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-10 bg-yellow-400/40" />
            <p className="text-yellow-400 text-[10px] font-black tracking-[0.4em] uppercase">
              Elite Curriculum
            </p>
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-5xl md:text-7xl font-black text-white leading-[1.0] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Sculpting{" "}
            <span className="text-gray-600 italic block">Excellence.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-base text-gray-500 max-w-xl leading-relaxed"
          >
            Specialized coaching programs engineered to bridge the gap between
            classroom theory and real-world mastery. Choose your success path.
          </motion.p>
        </div>

        {/* ── STATS ROW ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={3}
          className="grid grid-cols-3 mb-16 border-t border-b border-white/5"
        >
          {[
            { num: "12+", label: "Programs" },
            { num: "98%", label: "Satisfaction" },
            { num: "500+", label: "Alumni placed" },
          ].map((s, i) => (
            <div
              key={i}
              className={`py-6 ${i !== 2 ? "border-r border-white/5" : ""} ${i !== 0 ? "pl-8" : ""}`}
            >
              <p
                className="text-3xl font-black text-white mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {s.num}
              </p>
              <p className="text-[11px] uppercase tracking-widest text-gray-600 font-bold">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── COURSE LIST ── */}
        <div className="flex flex-col">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id || idx}
              variants={fadeUp} initial="hidden" animate="visible" custom={idx + 4}
              className="group grid grid-cols-[56px_1fr_auto] items-start gap-6 py-8 border-b border-white/5 hover:bg-white/[0.02] transition-colors duration-300 rounded-xl px-3 -mx-3 cursor-pointer"
            >
              {/* Index */}
              <p
                className="text-2xl text-gray-700 font-black pt-1 text-right"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {String(idx + 1).padStart(2, "0")}
              </p>

              {/* Body */}
              <div>
                <h3
                  className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight group-hover:text-yellow-400 transition-colors duration-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {course.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 max-w-xl">
                  {course.description || course.desc}
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {FEATURES.map((feat, fi) => (
                    <div
                      key={fi}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-700 group-hover:text-gray-500 transition-colors duration-300"
                    >
                      <span className="text-yellow-400/50">{feat.icon}</span>
                      {feat.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Arrow */}
              <Link
                to="/admission"
                className="mt-1 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-600 group-hover:border-yellow-400 group-hover:text-yellow-400 group-hover:bg-yellow-400/10 transition-all duration-300 flex-shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── CTA BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-24 border border-white/5 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/8 blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-black" />
              </div>
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-yellow-400">
                Zero Risk · April – June
              </p>
            </div>
            <h2
              className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Experience the{" "}
              <span className="text-yellow-400 italic">SKCC Premium</span> Mode.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Join our exclusive evaluation batches and experience Surat's top
              pedagogy before you commit.
            </p>
          </div>

          <Link
            to="/admission"
            className="relative z-10 flex-shrink-0 bg-yellow-400 text-black px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] hover:bg-white active:scale-95 transition-all"
          >
            Secure Free Trial
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default Courses;