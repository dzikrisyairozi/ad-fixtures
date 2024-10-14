import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

function ProcessHub() {
  const t = useTranslations('ProcessHub');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section ref={ref} className="relative h-[60vh] md:h-screen">
      <Image
        src="https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/process_hub.jpg"
        alt={t('backgroundAlt')}
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 md:bg-opacity-0 md:bg-gradient-to-r md:from-black/90 md:via-black/90 md:to-transparent">
        <motion.div
          className="container mx-auto px-4 h-full flex flex-col justify-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="md:w-1/2">
            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-5xl font-bold text-white mb-4 text-center md:text-left"
            >
              {t('title')}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-md md:text-lg text-gray-200 mb-8 text-center md:text-left"
            >
              {t('description')}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProcessHub;