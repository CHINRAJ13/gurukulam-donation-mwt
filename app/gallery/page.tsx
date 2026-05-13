"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { galleryImages } from "@/lib/gallery-data";

export default function GalleryPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") setSelectedImageIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! + 1) % galleryImages.length);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <div className="min-h-screen bg-soft-gradient">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-surface-dim shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-main">Temple Construction Gallery</h1>
            <p className="text-sm text-text-muted">A visual journey of our sacred space coming to life.</p>
          </div>
          <Link 
            href="/" 
            className="px-6 py-2 bg-surface-dim hover:bg-surface-dark transition-colors rounded-xl font-bold text-sm border border-black/5"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % 12) * 0.05 }}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-surface-dim"
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50"
              onClick={() => setSelectedImageIndex(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Prev Button */}
            <button
              className="absolute left-4 md:left-8 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            {/* Image Container */}
            <div 
              className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video p-4 flex items-center justify-center"
              onClick={() => setSelectedImageIndex(null)} // Click outside to close
            >
              <motion.div 
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full cursor-default"
                onClick={(e) => e.stopPropagation()} // Prevent close on image click
              >
                <Image
                  src={galleryImages[selectedImageIndex].url}
                  alt={galleryImages[selectedImageIndex].alt}
                  fill
                  loading="eager"
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </motion.div>
            </div>

            {/* Next Button */}
            <button
              className="absolute right-4 md:right-8 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            
            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm tracking-widest uppercase font-bold">
              {selectedImageIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
