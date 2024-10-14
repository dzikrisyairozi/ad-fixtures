import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBox, FiTool } from 'react-icons/fi';

function WeAreCapable() {
  const t = useTranslations('WeAreCapable');
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
    <section ref={ref} className="py-16 bg-gray-100">
      <motion.div
        className="container mx-auto px-4 flex flex-col items-center justify-center"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-extrabold text-center mb-12"
        >
          {t('title')}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full md:w-2/3 mt-4">
          <motion.div variants={itemVariants} className="flex flex-col items-center md:flex-row md:items-start text-justify md:text-left">
            <FiBox className="text-[96px] text-gray-400 mr-6 mt-1 flex-shrink-0 mb-6 md:mb-0" />
            <div>
              <p className="text-gray-900 text-sm">&quot;{t('versatileSolutionSubtitle')}&quot;</p>
              <h3 className="text-xl font-semibold mb-2">{t('versatileSolutionTitle')}</h3>
              <p className="text-gray-600">{t('versatileSolutionDescription')}</p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col items-center md:flex-row md:items-start text-justify md:text-left">
            <FiTool className="text-[96px] text-gray-400 mr-6 mt-1 flex-shrink-0 mb-4 md:mb-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">{t('valueEngineeringTitle')}</h3>
              <p className="text-gray-600">{t('valueEngineeringDescription')}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default WeAreCapable;