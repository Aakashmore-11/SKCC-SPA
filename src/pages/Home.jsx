import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, GraduationCap, CheckCircle, Users, Star, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-banner.jpeg';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

import { useContent } from '../ContentContext';

const Home = () => {
  const { instituteInfo } = useContent();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <div className="overflow-hidden bg-[#0A0A0F] text-white">

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-24 pb-16 overflow-hidden"
      >
        {/* Geometric grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Glow orbs */}
        <div aria-hidden className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div aria-hidden className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] rounded-full bg-yellow-400/10 blur-[100px]" />

        <div className="relative max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div className="z-10">
            <motion.span
              variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 px-4 py-2 rounded-full mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse inline-block" />
              Admissions Open 2026–27
            </motion.span>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-[clamp(2.4rem,6vw,5rem)] font-black leading-[1.02] tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Shape Your
              <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #FBBF24, #F59E0B)' }}>
                Future
              </span>
              <br />
              <span className="text-gray-300">With Us.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md"
            >
              Expert coaching for Classes 1–12 &amp; College in Surat. We build
              foundations that last a lifetime — one student at a time.
            </motion.p>

            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/admission"
                className="group inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm tracking-wide px-7 py-4 rounded-full transition-all duration-300"
              >
                Join Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold text-sm tracking-wide px-7 py-4 rounded-full transition-all duration-300 hover:bg-white/5"
              >
                Explore Courses
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={4}
              className="mt-12 flex items-center gap-5"
            >
              <div className="flex -space-x-2">
                {['S', 'R', 'A', 'K'].map((l, i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-[#0A0A0F] flex items-center justify-center text-xs font-bold">
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">15000+ happy students</p>
              </div>
            </motion.div>
          </div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden md:block"
          >
            <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <div className="absolute -inset-3 rounded-3xl border border-white/5 z-0" />
              <motion.div style={{ y: imgY }} className="w-full h-full">
                <img
                  src={instituteInfo.heroImage || heroImage}
                  alt="Shekhar Kumar Coaching Classes"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4">
                <p className="text-3xl font-black text-white">26+</p>
                <p className="text-xs text-gray-400 mt-0.5">Years of Excellence</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
        >
          <p className="text-[10px] tracking-widest uppercase">Scroll</p>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* ─── SUMMER BATCH BANNER ─── */}
      <section className="relative py-6 px-6 bg-[#0A0A0F] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1a1200, #2a1e00, #1a1200)', border: '1px solid rgba(251,191,36,0.3)' }}
          >
            {/* Diagonal stripes accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'repeating-linear-gradient(-45deg, #FBBF24 0, #FBBF24 1px, transparent 0, transparent 50%)',
                backgroundSize: '12px 12px',
              }}
            />

            {/* Glow */}
            <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-yellow-400/10 blur-[80px]" />

            <div className="relative z-10 px-8 md:px-16 py-14 md:py-20 text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase mb-4"
              >
                Limited Seats Available
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-7xl font-black text-white mb-3 leading-none"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Summer Vacation
                <br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #FBBF24, #FDE68A)' }}>
                  Batch 2026
                </span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                className="flex items-center justify-center gap-4 my-8"
              >
                <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">From</p>
                  <p className="text-white font-bold text-lg">1 April</p>
                </div>
                <div className="text-gray-500 text-2xl font-light">—</div>
                <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">To</p>
                  <p className="text-white font-bold text-lg">1 June</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 150 }}
                className="inline-block bg-yellow-400 text-black font-black text-4xl md:text-6xl px-8 py-4 rounded-2xl mb-6 tracking-tight"
              >
                100% FREE
              </motion.div>

              <p className="text-gray-500 text-sm">* First 50 students only. Enroll to secure your seat.</p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <Link
                  to="/admission"
                  className="group inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm tracking-wide px-8 py-4 rounded-full transition-all duration-300"
                >
                  Book Your Free Seat
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-32 px-6 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="mb-20"
          >
            <p className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Why Us</p>
            <h2
              className="text-4xl md:text-6xl font-black text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Built for Student
              <br />
              <span className="text-gray-600">Success.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <GraduationCap className="w-6 h-6" />,
                num: '01',
                title: 'Expert Faculty',
                desc: 'Passionate, experienced teachers who know what it takes to help every student achieve their personal best.',
                accent: 'from-blue-500/20 to-blue-600/5',
                border: 'border-blue-500/20',
                iconBg: 'bg-blue-500/20 text-blue-400',
              },
              {
                icon: <Users className="w-6 h-6" />,
                num: '02',
                title: 'Big Class',
                desc: 'Every child deserves personal attention. Our Big Class rooms ensure no student is ever left behind.',
                accent: 'from-yellow-500/20 to-yellow-600/5',
                border: 'border-yellow-500/20',
                iconBg: 'bg-yellow-500/20 text-yellow-400',
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                num: '03',
                title: 'Quality Infrastructure',
                desc: 'A safe, modern, and inspiring learning environment that encourages curiosity and deep focus.',
                accent: 'from-green-500/20 to-green-600/5',
                border: 'border-green-500/20',
                iconBg: 'bg-green-500/20 text-green-400',
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`relative rounded-3xl border ${f.border} bg-gradient-to-br ${f.accent} p-8 overflow-hidden group cursor-default`}
              >
                {/* Number watermark */}
                <span className="absolute -top-2 -right-2 text-[7rem] font-black text-white/[0.03] leading-none select-none">
                  {f.num}
                </span>

                <div className={`w-12 h-12 rounded-2xl ${f.iconBg} flex items-center justify-center mb-6`}>
                  {f.icon}
                </div>

                <h3 className="text-white font-bold text-xl mb-3">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>

                <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-gray-600 group-hover:text-gray-400 transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-4xl md:text-6xl font-black text-white mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ready to start your
            <br />
            <span className="text-yellow-400">journey?</span>
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            custom={1}
            className="text-gray-400 text-lg mb-10"
          >
            Join hundreds of students who have transformed their academic future
            at Shekhar Kumar Coaching Classes.
          </motion.p>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            custom={2}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/admission"
              className="group inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm tracking-wide px-8 py-4 rounded-full transition-all duration-300"
            >
              Apply Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/5"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;