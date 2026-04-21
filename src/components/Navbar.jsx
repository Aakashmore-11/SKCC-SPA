import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { navigation } from '../data/content';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed left-0 right-0 z-[100] transition-all duration-500 px-6 ${scrolled ? 'top-6' : 'top-10'
      }`}>
      <div className={`max-w-7xl mx-auto transition-all duration-500 ${scrolled
        ? 'bg-[#0A0A0F]/80 backdrop-blur-2xl border border-white/10 rounded-full py-3 px-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]'
        : 'bg-transparent py-0 px-0'
        }`}>
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-0 group-hover:opacity-40 transition-opacity blur-md" />
              <div className="bg-yellow-00 p-0.5 rounded-full relative">
                <img src={logo} alt="SKCC Logo" className="w-18 h-18 object-contain rounded-full" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight text-white leading-none">SKCC</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-yellow-400 font-bold hidden sm:block">Excellence</span>
            </div>
          </Link>

          {/* Center: Main Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="relative group py-2"
              >
                <span className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${location.pathname === item.href ? 'text-yellow-400' : 'text-gray-400 group-hover:text-white'
                  }`}>
                  {item.name}
                </span>
                {location.pathname === item.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right: CTA (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/admission"
              className="group relative inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-[11px] uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Enroll Now</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-400 transition-colors p-2 relative z-[101]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Full Screen Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#0A0A0F]/98 backdrop-blur-xl z-[100] flex flex-col justify-center items-center"
          >
            <div className="flex flex-col space-y-8 text-center">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-4xl font-black tracking-tighter ${location.pathname === item.href
                      ? 'text-yellow-400'
                      : 'text-white/40 hover:text-white'
                      }`}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-12"
              >
                <Link
                  to="/admission"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary px-12 py-5 text-lg"
                >
                  Apply Now
                </Link>
              </motion.div>
            </div>

            {/* Background Branding for Mobile Menu */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] pointer-events-none select-none italic whitespace-nowrap">
              SKCC 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
