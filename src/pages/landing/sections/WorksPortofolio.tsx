import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const brands = [
  {
    name: 'SKECHERS',
    descriptionKey: 'skechersDescription',
    images: Array.from({ length: 4 }, (_, i) => `https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/skechers/skechers${i + 2}.jpg`),
  },
  {
    name: 'ISPO+',
    descriptionKey: 'ispoDescription',
    images: Array.from({ length: 4 }, (_, i) => `https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/ispo/ispo${i + 1}.jpg`),
  },
  {
    name: 'HOKA',
    descriptionKey: 'hokaDescription',
    images: Array.from({ length: 4 }, (_, i) => `https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/hoka/hoka${i + 1}.jpg`),
  },
  {
    name: 'BVLGARI',
    descriptionKey: 'bvlgariDescription',
    images: Array.from({ length: 4 }, (_, i) => `https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/bvlgari/bvlgari${i + 1}.jpg`),
  },
  {
    name: 'BMA INTERNATIONAL FZE',
    descriptionKey: 'bmaDescription',
    images: Array.from({ length: 4 }, (_, i) => `https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/redtag/redtag${i + 1}.jpg`),
  },
  {
    name: 'ALDO',
    descriptionKey: 'aldoDescription',
    images: Array.from({ length: 4 }, (_, i) => `https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/aldo/aldo${i + 1}.jpg`),
  },
];

function WorksPortfolio() {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[150vh]">
      {brands.map((brand, index) => (
        <motion.div
          key={brand.name}
          className="relative overflow-hidden cursor-pointer h-[50vh] md:h-auto"
          onMouseEnter={() => setHoveredBrand(index)}
          onMouseLeave={() => setHoveredBrand(null)}
          onClick={() => handleImageClick(index)}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImages[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={brand.images[currentImages[index]]}
                alt={`${brand.name} portfolio`}
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredBrand === index ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4 md:p-8"
          >
            <h2 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4">{brand.name}</h2>
            <p className="text-sm md:text-lg text-center w-2/3">{t(brand.descriptionKey)}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default WorksPortfolio;