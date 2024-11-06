/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { Brand } from '@/types/brand';

export const brands: Brand[] = [
  {
    id: 'skechers',
    name: 'SKECHERS',
    descriptionKey: 'skechersDescription',
    mainImage: 'https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/skechers/skechers2.jpg',
    images: Array.from({ length: 4 }, (_, i) => `https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/skechers/skechers${i + 2}.jpg`),
  },
  {
    id: 'ispo',
    name: 'ISPO+',
    descriptionKey: 'ispoDescription',
    mainImage: 'https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/ispo/ispo1.jpg',
    images: Array.from({ length: 4 }, (_, i) => `https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/ispo/ispo${i + 1}.jpg`),
  },
  {
    id: 'hoka',
    name: 'HOKA',
    descriptionKey: 'hokaDescription',
    mainImage: 'https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/hoka/hoka1.jpg',
    images: Array.from({ length: 4 }, (_, i) => `https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/hoka/hoka${i + 1}.jpg`),
  },
  {
    id: 'bvlgari',
    name: 'BVLGARI',
    descriptionKey: 'bvlgariDescription',
    mainImage: 'https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/bvlgari/bvlgari1.jpg',
    images: Array.from({ length: 4 }, (_, i) => `https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/bvlgari/bvlgari${i + 1}.jpg`),
  },
  {
    id: 'bma',
    name: 'BMA INTERNATIONAL FZE',
    descriptionKey: 'bmaDescription',
    mainImage: 'https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/redtag/redtag1.jpg',
    images: Array.from({ length: 4 }, (_, i) => `https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/redtag/redtag${i + 1}.jpg`),
  },
  {
    id: 'aldo',
    name: 'ALDO',
    descriptionKey: 'aldoDescription',
    mainImage: 'https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/aldo/aldo1.jpg',
    images: Array.from({ length: 4 }, (_, i) => `https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/aldo/aldo${i + 1}.jpg`),
  },
];

function WorksPortfolio() {
  const router = useRouter();
  const [hoveredBrand, setHoveredBrand] = useState<number | null>(null);
  const [currentImages, setCurrentImages] = useState(brands.map(() => 0));
  const t = useTranslations('WorksPortfolio');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages(prevImages => 
        prevImages.map((img, index) => 
          hoveredBrand === index ? img : (img + 1) % brands[index].images.length
        )
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [hoveredBrand]);

  const handleImageClick = (brandIndex: number) => {
    setCurrentImages(prevImages => 
      prevImages.map((img, index) => 
        index === brandIndex ? (img + 1) % brands[brandIndex].images.length : img
      )
    );
  };

  const handleViewMore = (brandId: string) => {
    router.push(`/works/${brandId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {brands.map((brand) => (
        <motion.div
          key={brand.id}
          className="relative aspect-video overflow-hidden cursor-pointer"
          whileHover="hover"
          initial="initial"
          variants={{
            initial: { scale: 1 },
            // hover: { scale: 1.02 }
          }}
        >
          {/* Main Image */}
          <Image
            src={brand.mainImage}
            alt={`${brand.name} portfolio`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300"
          />

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center"
            variants={{
              initial: { opacity: 0 },
              hover: { opacity: 0.95 }
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{brand.name}</h2>
            <p className="text-sm md:text-base text-white text-center max-w-md mb-6 px-4">
              {t(brand.descriptionKey)}
            </p>
            <motion.button
              onClick={() => handleViewMore(brand.id)}
              className="group flex items-center space-x-2 text-white border border-white px-6 py-2 rounded-full
                         hover:bg-white hover:text-black transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View More</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </motion.button>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default WorksPortfolio;