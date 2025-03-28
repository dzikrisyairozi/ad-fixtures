import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { XIcon } from "lucide-react";
import { MobileCarousel } from "../components/MobileCarouselProcess";
import { useMediaQuery } from "react-responsive";

function Process() {
  const t = useTranslations("Process");

  const processSteps = [
    {
      number: "01",
      title: t("step1.title"),
      description: t("step1.description"),
    },
    {
      number: "02",
      title: t("step2.title"),
      description: t("step2.description"),
    },
    {
      number: "03",
      title: t("step3.title"),
      description: t("step3.description"),
    },
    {
      number: "04",
      title: t("step4.title"),
      description: t("step4.description"),
    },
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const typingVariants = {
    hidden: { width: 0 },
    visible: {
      width: "auto",
      transition: {
        type: "tween",
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  const typingDescriptionVariants = {
    hidden: {
      width: 0,
      opacity: 0,
    },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <section
      id="solution"
      ref={ref}
      className="relative py-20 overflow-hidden h-[60vh] md:h-screen flex items-center"
    >
      {/* Low opacity background image covering the entire section */}
      <div className="absolute inset-0 z-0 bg-gray-200/50">
        <Image
          src="https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/process3.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
      </div>

      {/* Half-width image on the right */}
      <div className="absolute bottom-0 right-0 transform w-1/2 h-4/5 z-10 hidden md:block">
        <Image
          src="https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/process3.jpg"
          alt="Process"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Content overlay */}
      <div className="container mx-auto px-4 relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-black mb-4 uppercase text-center md:text-left"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 mb-10 text-center md:text-left md:w-1/2"
        >
          {t("description")}
        </motion.p>

        {isMobile ? (
          <MobileCarousel
            processSteps={processSteps}
            setSelectedId={setSelectedId}
          />
        ) : (
          <motion.div
            className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-4 rounded-lg"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {processSteps.map((step) => (
              <motion.div
                key={`process-step-${step.number}`}
                layoutId={`process-step-${step.number}`}
                onClick={() => setSelectedId(step.number)}
                variants={itemVariants}
                transition={{ duration: 0.5 }}
                className="relative rounded-lg shadow-lg cursor-pointer aspect-square group"
              >
                {/* Background image and initial content */}
                <div className="absolute inset-0 z-10">
                  <Image
                    src={`https://res.cloudinary.com/ad-fixtures/image/upload/v1729792459/ad-fixtures/factory/process_${step.number}.jpg`}
                    alt={step.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg group-hover:bg-opacity-80 transition-all duration-300" />

                  {/* Initial view (number and title) */}
                  <div className="absolute inset-0 z-20 w-full h-full flex flex-col items-start justify-end p-4 group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-[48px] font-bold text-white">
                      {step.number}
                    </h3>
                    <p className="text-[16px] font-semibold text-white">
                      {step.title}
                    </p>
                  </div>

                  {/* Hover content */}
                  <motion.div
                    className="overflow-y-auto overflow-x-none absolute inset-0 z-30 p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col"
                    initial="hidden"
                    whileHover="visible"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-4">
                      {step.title}
                    </h3>
                    <motion.div
                      className="flex-1"
                      variants={typingDescriptionVariants}
                    >
                      <p className="text-white text-xs lg:text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <AnimatePresence>
          {selectedId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            >
              <motion.div
                layoutId={`process-step-${selectedId}`}
                className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full relative"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <motion.button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <XIcon className="h-6 w-6" />
                </motion.button>
                <motion.h3
                  className="text-4xl font-bold text-red-600 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {
                    processSteps.find((step) => step.number === selectedId)
                      ?.number
                  }
                </motion.h3>
                <motion.h4
                  className="text-2xl font-semibold mb-2 text-black"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {
                    processSteps.find((step) => step.number === selectedId)
                      ?.title
                  }
                </motion.h4>
                <motion.p
                  className="text-gray-600 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  {
                    processSteps.find((step) => step.number === selectedId)
                      ?.description
                  }
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Process;
