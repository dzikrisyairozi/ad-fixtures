import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const images = [
  'https://res.cloudinary.com/ad-fixtures/image/upload/v1728640240/ad-fixtures/factory/factory1.jpg',
  'https://res.cloudinary.com/ad-fixtures/image/upload/v1728640240/ad-fixtures/factory/factory2.jpg',
  'https://res.cloudinary.com/ad-fixtures/image/upload/v1728640240/ad-fixtures/factory/factory3.jpg',
  'https://res.cloudinary.com/ad-fixtures/image/upload/v1728640240/ad-fixtures/factory/factory4.jpg',
];

function Hero() {
    const t = useTranslations('Index');
    const [currentImage, setCurrentImage] = React.useState(0);
  
    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 5000);
  
      return () => clearInterval(timer);
    }, []);
  
    return (
      <section className="relative h-[512px] md:h-screen overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImage]}
              alt={t('factoryImageAlt', { number: currentImage + 1 })}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end items-start p-4 md:p-8 lg:p-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4"
        >
          {t('companyName')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-xs sm:text-sm md:text-base text-gray-200 mb-4 sm:mb-6 md:mb-8 max-w-xl sm:max-w-2xl uppercase"
        >
          {t('slogan')}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-md text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          {t('shopNow')}
        </motion.button>
      </div>
      </section>
    );
  }

export default Hero;