import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../ContentContext';

const Gallery = () => {
  const { gallery, toppers } = useContent();
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null); // index into filteredGallery

  const categories = ['All', 'Event', 'Activity', 'Classroom'];
  const filteredGallery = filter === 'All'
    ? gallery
    : gallery.filter(img => img.category === filter);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  // Lightbox navigation
  const openLightbox = (idx) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const goNext = () => setLightbox((prev) => (prev + 1) % filteredGallery.length);
  const goPrev = () => setLightbox((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── PAGE HEADER ── */}
        <motion.div
          initial="hidden" animate="visible"
          className="mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase mb-4"
          >
            Our Memories
          </motion.p>
          <motion.h1
            variants={fadeUp} custom={1}
            className="text-5xl md:text-7xl font-black text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Gallery &
            <br />
            <span className="text-gray-600 italic">Achievements.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp} custom={2}
            className="text-gray-500 text-lg max-w-xl"
          >
            A visual journey through our events, classroom moments, and the outstanding achievements of our students.
          </motion.p>
        </motion.div>

        {/* ── HALL OF FAME (STUDENT ACHIEVEMENTS) ── */}
        {toppers.length > 0 && (
          <section className="mb-28">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex items-center gap-3 mb-10"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-2 text-yellow-400">
                <Trophy size={20} />
                <span className="text-xs font-black uppercase tracking-[0.25em]">Hall of Fame</span>
              </motion.div>
              <motion.div variants={fadeUp} custom={1} className="flex-grow h-px bg-white/5" />
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {toppers.map((t, idx) => (
                <motion.div
                  key={t.id}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} custom={idx}
                  className="group relative"
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#111] relative">
                    <img
                      src={t.image}
                      alt={t.name}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1590650516494-23251a17dd0c?q=80&w=500&auto=format&fit=crop'; }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Bottom gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-bold text-sm leading-tight">{t.name}</h3>
                        <Sparkles size={12} className="text-yellow-400 flex-shrink-0" />
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-yellow-400 font-bold">{t.grade}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400">{t.year}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ── GALLERY SECTION ── */}
        <section>
          {/* Filter tabs */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-wrap items-center gap-2 mb-10"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${filter === cat
                    ? 'bg-yellow-400 text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-xs text-gray-600 font-bold">
              {filteredGallery.length} photos
            </span>
          </motion.div>

          {/* Photo grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((img, idx) => (
                <motion.div
                  layout
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                  onClick={() => openLightbox(idx)}
                  className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group"
                >
                  <img
                    src={img.url}
                    alt="Gallery"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filteredGallery.length === 0 && (
            <div className="text-center py-24">
              <p className="text-gray-500 font-bold text-sm">No photos in this category yet.</p>
            </div>
          )}
        </section>
      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox !== null && filteredGallery[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
            >
              <X size={28} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 md:left-8 text-white/40 hover:text-white transition-colors z-10 p-2"
            >
              <ChevronLeft size={36} />
            </button>

            {/* Image */}
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={filteredGallery[lightbox].url}
              alt="Gallery Full"
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            />

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 md:right-8 text-white/40 hover:text-white transition-colors z-10 p-2"
            >
              <ChevronRight size={36} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-xs font-bold">
              {lightbox + 1} / {filteredGallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
