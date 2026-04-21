import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Award, GraduationCap, BookOpen, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../ContentContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const About = () => {
  const { staff } = useContent();

  return (
    <div className="bg-[#0A0A0F] overflow-hidden">

      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[70vh] flex items-end pb-20 pt-40 px-6">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
            alt="Classroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/80 to-[#0A0A0F]/40" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div initial="hidden" animate="visible">
            <motion.p
              variants={fadeUp}
              className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase mb-5"
            >
              About SKCC
            </motion.p>
            <motion.h1
              variants={fadeUp} custom={1}
              className="text-5xl md:text-8xl font-black text-white leading-[0.95] mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Building Futures,
              <br />
              <span className="text-gray-500 italic">One Student</span>
              <br />
              at a Time.
            </motion.h1>
            <motion.p
              variants={fadeUp} custom={2}
              className="text-gray-400 text-lg max-w-lg leading-relaxed"
            >
              Since our founding, we've been committed to transforming potential
              into performance through expert coaching and personal mentorship.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── STORY SECTION ─── */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Our Story</p>
              <h2
                className="text-3xl md:text-5xl font-black text-white leading-tight mb-8"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Born from a
                <br />
                <span className="text-gray-600">Simple Belief.</span>
              </h2>
              <div className="space-y-5">
                <p className="text-gray-300 text-lg leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Shekhar Kumar Coaching Classes was founded on the belief that every
                  student has untapped potential waiting to be discovered.
                </p>
                <p className="text-gray-500 leading-relaxed">
                  We create a nurturing environment where primary and secondary students
                  don't just learn subjects — they learn how to learn. Through personalized
                  attention and high standards, we build foundations that support academic
                  success for a lifetime.
                </p>
                <p className="text-gray-500 leading-relaxed">
                  Our approach combines experienced faculty, modern teaching methods,
                  and a deep commitment to each student's individual growth trajectory.
                </p>
              </div>
            </motion.div>

            {/* Stats panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { num: '26+', label: 'Years of Excellence', accent: 'text-yellow-400' },
                { num: '15K+', label: 'Students Coached', accent: 'text-blue-400' },
                { num: '98%', label: 'Satisfaction Rate', accent: 'text-green-400' },
                { num: '50+', label: 'Expert Faculty', accent: 'text-purple-400' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-center"
                >
                  <p className={`text-3xl md:text-4xl font-black ${stat.accent} mb-2`} style={{ fontFamily: "'Playfair Display', serif" }}>
                    {stat.num}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PILLARS ─── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-16"
          >
            <motion.p variants={fadeUp} className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">
              What Drives Us
            </motion.p>
            <motion.h2
              variants={fadeUp} custom={1}
              className="text-4xl md:text-6xl font-black text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Our Foundation.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Target className="w-6 h-6" />,
                title: 'Mission',
                text: 'To provide accessible, high-quality coaching that transforms academic challenges into lifelong strengths.',
                accent: 'from-yellow-500/20 to-yellow-600/5',
                border: 'border-yellow-500/20',
                iconBg: 'bg-yellow-500/15 text-yellow-400',
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: 'Values',
                text: 'Integrity, curiosity, and mutual respect are the threads that weave our educational community together.',
                accent: 'from-blue-500/20 to-blue-600/5',
                border: 'border-blue-500/20',
                iconBg: 'bg-blue-500/15 text-blue-400',
              },
              {
                icon: <Award className="w-6 h-6" />,
                title: 'Vision',
                text: 'To be the most trusted educational partner for students throughout their primary and secondary journey.',
                accent: 'from-green-500/20 to-green-600/5',
                border: 'border-green-500/20',
                iconBg: 'bg-green-500/15 text-green-400',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`relative rounded-2xl border ${item.border} bg-gradient-to-br ${item.accent} p-8 overflow-hidden cursor-default`}
              >
                <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY SKCC ─── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
            <motion.p variants={fadeUp} className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">
              The SKCC Difference
            </motion.p>
            <motion.h2
              variants={fadeUp} custom={1}
              className="text-4xl md:text-6xl font-black text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Why Parents
              <br />
              <span className="text-gray-600">Trust Us.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: <BookOpen className="w-5 h-5" />, title: 'Structured Curriculum', desc: 'Carefully designed lesson plans aligned with board exams and competitive preparation.' },
              { icon: <Users className="w-5 h-5" />, title: 'Personal Attention', desc: 'Optimized batch sizes ensure every student gets dedicated mentoring and support.' },
              { icon: <GraduationCap className="w-5 h-5" />, title: 'Proven Track Record', desc: '26 years of consistently producing top performers and academic achievers.' },
              { icon: <Target className="w-5 h-5" />, title: 'Doubt Resolution', desc: 'Dedicated doubt-clearing sessions and one-on-one mentorship for struggling concepts.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-yellow-400/20 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FACULTY ─── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
            <motion.p variants={fadeUp} className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">
              The Faculty
            </motion.p>
            <motion.h2
              variants={fadeUp} custom={1}
              className="text-4xl md:text-6xl font-black text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Meet Our
              <br />
              <span className="text-gray-600">Educators.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {staff.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-2xl relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-yellow-400 text-[9px] uppercase font-bold tracking-widest mb-0.5">{member.role}</p>
                    <h3 className="text-white font-bold text-sm leading-tight">{member.name}</h3>
                    <div className="flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <GraduationCap className="w-3 h-3 text-gray-400" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{member.qualification}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-4xl md:text-6xl font-black text-white mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Want to be part of
            <br />
            <span className="text-yellow-400">our story?</span>
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="text-gray-400 text-lg mb-10"
          >
            Join the SKCC family and experience the difference that expert coaching makes.
          </motion.p>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/admission"
              className="group inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm tracking-wide px-8 py-4 rounded-full transition-all duration-300"
            >
              Enroll Now
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

export default About;
