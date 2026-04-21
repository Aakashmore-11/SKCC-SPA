import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { useContent } from '../ContentContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Contact = () => {
  const { instituteInfo } = useContent();

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-20">
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible"
            className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase mb-4"
          >
            Connection
          </motion.p>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-5xl md:text-7xl font-black text-white leading-tight mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Let's Start the
            <br />
            <span className="text-gray-600">Conversation.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-gray-400 text-lg max-w-xl"
          >
            We're here to answer every academic question you have. Reach out via your preferred channel.
          </motion.p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {[
            { icon: <Phone className="w-5 h-5" />, title: 'Call Us', detail: instituteInfo.contact.join(' / ') },
            { icon: <MapPin className="w-5 h-5" />, title: 'Visit Us', detail: instituteInfo.address },
            { icon: <Clock className="w-5 h-5" />, title: 'Hours', detail: 'Mon - Sat: 8 AM - 7 PM' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp} initial="hidden" animate="visible" custom={idx + 3}
              className="card-premium flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                {item.icon}
              </div>
              <h3 className="text-white font-black uppercase text-xs tracking-widest mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Map + Contact */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/3 h-[500px] rounded-[3rem] overflow-hidden border border-white/5 relative group"
          >
            <iframe
              src="https://www.google.com/maps?q=Shekhar%20Kumar%20Coaching%20Classes&hl=en&z=17&t=k&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>

            <div className="absolute inset-0 pointer-events-none border-[12px] border-[#0A0A0F] rounded-[3rem]" />
          </motion.div>

          {/* Right Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 flex flex-col justify-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 blur-[100px] -mr-32 -mt-32" />

            <h2 className="text-3xl font-black text-white mb-6 leading-tight italic">
              Instant <br /> Responses.
            </h2>

            <p className="text-gray-500 mb-10 text-sm italic">
              Experience zero wait times. Chat with our enrollment team directly on WhatsApp for batch timings and fee structures.
            </p>

            <div className="space-y-4">
              <a
                href={`https://wa.me/${instituteInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-5 rounded-2xl font-black flex items-center justify-center space-x-3 transition-all transform hover:scale-[1.02]"
              >
                <FaWhatsapp className="w-6 h-6" />
                <span className="uppercase tracking-widest text-xs">WhatsApp Us</span>
              </a>

              <div className="flex justify-center gap-4 pt-6">
                <a href="#" className="p-4 rounded-xl bg-white/5 text-gray-400 hover:text-white">
                  <FaFacebookF />
                </a>
                <a href="https://www.instagram.com/shekhar_kumar_coaching_classes?igsh=Y2ZhZnlncG5haWF6" className="p-4 rounded-xl bg-white/5 text-gray-400 hover:text-white">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;