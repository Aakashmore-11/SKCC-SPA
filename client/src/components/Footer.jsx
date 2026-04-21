import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, BookOpen, ArrowRight } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { useContent } from '../ContentContext';
import { navigation } from '../data/content';

const Footer = () => {
  const { instituteInfo } = useContent();
  return (
    <footer className="bg-[#0A0A0F] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-8 group">
              <div className="bg-yellow-400 p-2 rounded-xl group-hover:rotate-6 transition-transform">
                <BookOpen className="text-black w-6 h-6" />
              </div>
              <span className="font-black text-2xl tracking-tight">SKCC</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">
              Pioneering excellence in primary and secondary coaching. We build the foundations of future success through personalized attention.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-yellow-400 hover:text-black transition-all">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/shekhar_kumar_coaching_classes?igsh=Y2ZhZnlncG5haWF6" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-yellow-400 hover:text-black transition-all">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href={`https://wa.me/${instituteInfo.whatsapp}`} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-yellow-400 hover:text-black transition-all">
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-8">Navigation</h3>
            <ul className="space-y-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-gray-500 hover:text-yellow-400 text-sm font-medium transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-8">Quick Contact</h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-gray-500 text-sm leading-relaxed">{instituteInfo.address}</span>
              </li>
              {instituteInfo.contact.map((phone) => (
                <li key={phone} className="flex items-center space-x-4 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-gray-500 text-sm font-medium">{phone}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-8">Newsletter</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-6">Stay updated with our latest batch schedules and academic tips.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-yellow-400 transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-400 text-black p-1.5 rounded-lg hover:bg-yellow-300 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} Shekhar Kumar Coaching Classes. All Rights Reserved.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-[10px] text-gray-600 hover:text-white uppercase font-bold tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] text-gray-600 hover:text-white uppercase font-bold tracking-widest transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
