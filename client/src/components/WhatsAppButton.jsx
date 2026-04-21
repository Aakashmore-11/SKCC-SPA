import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useContent } from '../ContentContext';

const WhatsAppButton = () => {
  const { instituteInfo, getWhatsAppUrl } = useContent();
  
  return (
    <a
      href={getWhatsAppUrl(instituteInfo.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[150] bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-100 opacity-20 transition-transform duration-500" />
      <FaWhatsapp size={32} className="relative z-10" />
    </a>
  );
};

export default WhatsAppButton;
