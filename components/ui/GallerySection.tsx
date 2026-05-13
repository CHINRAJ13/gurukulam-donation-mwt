"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "./SectionWrapper";
import SectionHeader from "./SectionHeader";
import { galleryImages } from "@/lib/gallery-data";

export default function GallerySection() {
  // Show only the first 8 images
  const displayImages = galleryImages.slice(0, 8);

  return (
    <SectionWrapper id="gallery" bg="white">
      <SectionHeader 
        title="Temple Construction Gallery" 
        subtitle="Witness the divine geometry taking shape through the dedication of our community." 
      />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {displayImages.map((image, i) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-surface-dim shadow-sm"
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link 
          href="/gallery" 
          className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-premium hover:bg-primary/90 transition-all hover:-translate-y-1"
        >
          View All Construction Images
        </Link>
      </div>
    </SectionWrapper>
  );
}
