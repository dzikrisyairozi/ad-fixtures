import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

const partners = Array.from({ length: 14 }, (_, i) => i + 1).map(
  (num) => `https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/partner/partner${num}.png`
);

function Partner() {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (isMobile && containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      const viewportWidth = containerRef.current.offsetWidth;

      controls.start({
        x: [0, -(scrollWidth - viewportWidth), 0],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [controls, isMobile]);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={containerRef}
          className="flex md:grid md:grid-cols-4 lg:grid-cols-7 gap-8"
          animate={controls}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-auto flex items-center justify-center"
            >
              <Image
                src={partner}
                alt={`Partner ${index + 1}`}
                width={100}
                height={50}
                objectFit="contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Partner;