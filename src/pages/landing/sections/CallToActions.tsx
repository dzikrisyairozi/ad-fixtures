import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function CallToActions() {
  const t = useTranslations('CallToActions');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: 'easeOut',
        staggerChildren: 0.2,
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: 'easeOut' } 
    },
  };

  return (
    <motion.div
      id="contact-us"
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className="relative h-[512px] overflow-hidden"
    >
      <Image
        src="https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/call_to_action.jpg"
        alt={t('backgroundImageAlt')}
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <motion.div
          variants={contentVariants}
          className="text-center text-white px-4 md:w-2/3 lg:w-1/2"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-thin mb-4"
          >
            {t('title')}
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-sm md:text-md mb-6"
          >
            {t('description')}
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
          >
            <motion.input
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="email"
              placeholder={t('emailPlaceholder')}
              className="text-sm w-full md:w-auto px-4 py-2 text-white rounded bg-transparent border border-white placeholder:text-white placeholder:text-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            />
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#f0f0f0' }}
              whileTap={{ scale: 0.95 }}
              className="text-sm w-full md:w-auto px-6 py-2 bg-white text-black font-semibold rounded transition-all duration-300 ease-in-out"
            >
              {t('subscribeButton')}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CallToActions;