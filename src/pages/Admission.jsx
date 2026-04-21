import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useContent } from '../ContentContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Admission = () => {
  const { courses = [], submissions = [], updateSubmissions } = useContent();
  const formRef = useRef();
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    studentClass: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.studentName.trim()) newErrors.studentName = 'Name required';
    if (!formData.parentName.trim()) newErrors.parentName = 'Parent name required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = '10-digit phone required';
    if (!formData.studentClass) newErrors.studentClass = 'Class choice required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      // Save to Local CMS state for "Live Data"
      const newSubmission = {
        ...formData,
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        status: 'Pending'
      };
      updateSubmissions([newSubmission, ...submissions]);

      // 1. Send Notification to Owner
      const SERVICE_ID = "service_lhouxq5";
      const ADMIN_TEMPLATE_ID = "template_ukrfgms";
      const AUTO_REPLY_TEMPLATE_ID = "template_mlayuve";
      const PUBLIC_KEY = "NaNjSteKgLoSCigTV";

      Promise.all([
        emailjs.sendForm(SERVICE_ID, ADMIN_TEMPLATE_ID, formRef.current, PUBLIC_KEY),
        emailjs.sendForm(SERVICE_ID, AUTO_REPLY_TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      ])
        .then(() => {
          setIsSubmitting(false);
          setSubmitted(true);
        })
        .catch((error) => {
          setIsSubmitting(false);
          alert(`Submission failed. Please check your EmailJS Template ID. Error: ${error.text || 'Unknown'}`);
          console.error('EmailJS Error:', error);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-6 pt-32">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-white/[0.03] p-16 rounded-[3rem] shadow-2xl max-w-xl border border-white/5"
        >
          <div className="bg-yellow-400 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(250,204,21,0.2)]">
            <CheckCircle className="text-black w-14 h-14" />
          </div>
          <h2 className="text-4xl font-black text-white mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Application Sent!</h2>
          <p className="text-gray-400 mb-10 text-lg leading-relaxed">
            Thank you for choosing SKCC excellence. Your enquiry has been sent to our administrator. We will contact you within 24 hours to schedule your visit.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn-primary px-12"
          >
            Submit Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        {/* Text Section */}
        <div className="lg:sticky lg:top-32">
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible"
            className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase mb-4"
          >
            Admissions
          </motion.p>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-5xl md:text-7xl font-black text-white leading-tight mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Claim Your
            <br />
            <span className="text-gray-600 italic">Spot.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-lg text-gray-400 mb-12"
          >
            Secure a seat in Surat's most personalized educational hub. Our batches fill up quickly — apply early to ensure focus on your child's growth.
          </motion.p>

          <div className="space-y-12">
            {[
              { num: '01', title: 'Details', desc: 'Submit your student and parent contact information.' },
              { num: '02', title: 'Consult', desc: 'Visit our center for a personal consultation.' },
              { num: '03', title: 'Launch', desc: 'Secure the enrollment and begin the journey.' }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp} initial="hidden" animate="visible" custom={idx + 3}
                className="flex items-start gap-6 border-l border-white/10 pl-8"
              >
                <div className="text-3xl font-black text-white/5 select-none">{step.num}</div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-1 uppercase tracking-tight">{step.title}</h4>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/[0.02] p-10 md:p-14 rounded-[3rem] border border-white/5 relative overflow-hidden"
        >
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 blur-[100px] -mr-32 -mt-32" />

          <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Student Name</label>
                <input
                  type="text"
                  name="student_name"
                  placeholder="Enter full name"
                  className={`w-full bg-white/[0.03] border ${errors.studentName ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 transition-colors`}
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Parent Name</label>
                <input
                  type="text"
                  name="parent_name"
                  placeholder="Guardian's name"
                  className={`w-full bg-white/[0.03] border ${errors.parentName ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 transition-colors`}
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Email ID</label>
              <input
                type="email"
                name="user_email"
                placeholder="email@example.com"
                className={`w-full bg-white/[0.03] border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 transition-colors`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Active Phone Number</label>
              <input
                type="tel"
                name="phone_number"
                placeholder="10-digit mobile"
                className={`w-full bg-white/[0.03] border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 transition-colors`}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Target Class</label>
              <div className="relative">
                <select
                  name="target_class"
                  className={`w-full appearance-none bg-white/[0.03] border ${errors.studentClass ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-yellow-400/50 transition-colors cursor-pointer`}
                  value={formData.studentClass}
                  onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                >
                  <option value="" className="bg-[#0A0A0F]">Choose academic level...</option>
                  {courses?.map((course, idx) => (
                    <option key={idx} value={course.name} className="bg-[#0A0A0F]">
                      {course.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Additional Context</label>
              <textarea
                rows="4"
                name="message"
                placeholder="How can we help?"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 transition-colors resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full btn-primary py-5 flex items-center justify-center space-x-3 text-base ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Submit Application</span>
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Admission;
