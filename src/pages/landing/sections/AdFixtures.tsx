import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function AdFixtures() {
  const t = useTranslations('AdFixtures');
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative h-[512px] md:h-screen overflow-hidden"
    >
      <Image
        src="https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/factory0.jpg"
        alt={t('backgroundImageAlt')}
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <motion.div variants={textVariants} className="text-center text-white px-4 md:w-1/2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('title')}
          </h2>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default AdFixtures;