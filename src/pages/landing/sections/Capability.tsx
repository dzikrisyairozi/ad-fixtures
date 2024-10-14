import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const images = [
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/metal1.jpg",
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/metal2.jpg",
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/metal3.jpg",
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/metal4.jpg",
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/metal5.jpg",
];

function Capability() {
  const t = useTranslations('Capability');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [imageOrder, setImageOrder] = useState(images);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const nextImage = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setImageOrder(prevOrder => [...prevOrder.slice(1), prevOrder[0]]);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-16 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div variants={itemVariants} className="md:w-1/2 mb-8 md:mb-0 relative" style={{ height: '400px', width: '600px' }}>
            <AnimatePresence mode="popLayout">
              {imageOrder.map((src, index) => (
                <motion.div
                  key={src}
                  className="absolute top-0 left-0"
                  initial={index === 0 ? { x: 300, opacity: 0 } : { opacity: 1 }}
                  animate={{
                    zIndex: imageOrder.length - index,
                    scale: 1 - index * 0.05,
                    y: index * 10,
                    x: index * 5,
                    rotate: index * 2,
                    opacity: index === 0 ? 1 : 0.8 - index * 0.1,
                  }}
                  exit={index === 0 ? { x: -300, opacity: 0, transition: { duration: 0.3 } } : {}}
                  transition={{ duration: 0.3 }}
                  onClick={index === 0 && !isAnimating ? nextImage : undefined}
                  style={{ cursor: index === 0 && !isAnimating ? 'pointer' : 'default', transformOrigin: 'top right' }}
                >
                  <Image
                    src={src}
                    alt={`${t('imageAlt_metal')} ${index + 1}`}
                    width={600}
                    height={400}
                    className="rounded-md shadow-lg"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <motion.div variants={itemVariants} className="md:w-1/2 md:pl-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
              {t('title_metal')}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {t('description_metal')}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Capability;