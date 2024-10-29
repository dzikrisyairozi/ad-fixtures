import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import GridBackground from "../components/GridBackground";
import clsxm from "@/lib/clsxm";

const metalImages = [
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/metal1.jpg",
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/metal2.jpg",
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/metal3.jpg",
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/metal4.jpg",
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/metal5.jpg",
];

const woodImages = [
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/wood1.jpg",
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/wood6.jpg",
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/wood3.jpg",
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/wood4.jpg",
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/wood5.jpg",
];

const powderImages = [
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/powder1.jpg",
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/powder2.jpg",
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/powder3.jpg",
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/powder4.jpg",
  "https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/powder5.jpg",
];

function Capability() {
  const t = useTranslations("Capability");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [metalImageOrder, setMetalImageOrder] = useState(metalImages);
  const [woodImageOrder, setWoodImageOrder] = useState(woodImages);
  const [powderImageOrder, setPowderImageOrder] = useState(powderImages);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // const typingVariants = {
  //   hidden: { width: 0 },
  //   visible: {
  //     width: "auto",
  //     transition: {
  //       type: "tween",
  //       duration: 2,
  //       ease: "easeInOut",
  //     },
  //   },
  // };

  const nextMetalImage = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setMetalImageOrder((prevOrder) => [...prevOrder.slice(1), prevOrder[0]]);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const nextWoodImage = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setWoodImageOrder((prevOrder) => [...prevOrder.slice(1), prevOrder[0]]);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const nextPowderImage = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPowderImageOrder((prevOrder) => [...prevOrder.slice(1), prevOrder[0]]);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-16 md:py-24 bg-white relative flex flex-col justify-center w-full overflow-hidden"
    >
      <GridBackground />

      {/* METAL */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            variants={itemVariants}
            className="md:mb-0 relative w-[324px] h-[256px] md:w-[600px] md:h-[400px]"
          >
            <AnimatePresence mode="popLayout">
              {metalImageOrder.map((src, index) => (
                <motion.div
                  key={src}
                  className="absolute top-0 left-0"
                  initial={
                    index === 0 ? { x: 300, opacity: 0 } : { opacity: 1 }
                  }
                  animate={{
                    zIndex: metalImageOrder.length - index,
                    scale: 1 - index * 0.05,
                    y: index * 10,
                    x: index * 5,
                    rotate: index * 2,
                    opacity: index === 0 ? 1 : 0.8 - index * 0.1,
                  }}
                  exit={
                    index === 0
                      ? { x: -300, opacity: 0, transition: { duration: 0.3 } }
                      : {}
                  }
                  transition={{ duration: 0.3 }}
                  onClick={
                    index === 0 && !isAnimating ? nextMetalImage : undefined
                  }
                  style={{
                    cursor: index === 0 && !isAnimating ? "pointer" : "default",
                    transformOrigin: "top right",
                  }}
                >
                  <div className="relative group">
                    <Image
                      src={src}
                      alt={`${t("imageAlt_metal")} ${index + 1}`}
                      width={600}
                      height={400}
                      className={clsxm(
                        'rounded-md shadow-lg',
                        'transition duration-200 ease-in-out hover:scale-[102.5%]'
                      )}
                    />
                    {index === 0 && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md flex items-center justify-center">
                        <p className="text-white text-lg font-medium">
                          {t("clickImageToSeeMore")}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <motion.div variants={itemVariants} className="md:w-1/2 md:pl-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black">
              {t("title_metal")}
            </h2>
            <p className="text-lg text-gray-600 mb-6 w-3/4">
              {t("description_metal")}
            </p>
            {/* <div className="p-4 border border-gray-700 rounded-md inline-flex border-dashed text-xs relative overflow-hidden">
              <motion.span
                initial="hidden"
                animate="visible"
                variants={typingVariants}
                className="overflow-hidden whitespace-nowrap text-black"
              >
                {t("clickImageToSeeMore")}
              </motion.span>
              <div className="absolute inset-0 border-b-2 border-red-500 animate-border" />
            </div> */}

            <style jsx>{`
              @keyframes borderAnimation {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(100%);
                }
              }
              .animate-border {
                animation: borderAnimation 2s linear infinite;
              }
            `}</style>
          </motion.div>
        </div>
      </div>

      {/* MILLWORK */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          <motion.div variants={itemVariants} className="md:w-1/2 md:pl-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black">
              {t("title_millwork")}
            </h2>
            <p className="text-lg text-gray-600 mb-6 w-3/4">
              {t("description_millwork")}
            </p>
            {/* <div className="p-4 border border-gray-700 rounded-md inline-flex border-dashed text-xs relative overflow-hidden">
              <motion.span
                initial="hidden"
                animate="visible"
                variants={typingVariants}
                className="overflow-hidden whitespace-nowrap text-black"
              >
                {t("clickImageToSeeMore")}
              </motion.span>
              <div className="absolute inset-0 border-b-2 border-red-500 animate-border" />
            </div> */}

            <style jsx>{`
              @keyframes borderAnimation {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(100%);
                }
              }
              .animate-border {
                animation: borderAnimation 2s linear infinite;
              }
            `}</style>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="md:mb-0 relative w-[324px] h-[256px] md:w-[600px] md:h-[400px]"
          >
            <AnimatePresence mode="popLayout">
              {woodImageOrder.map((src, index) => (
                <motion.div
                  key={src}
                  className="absolute top-0 left-0"
                  initial={
                    index === 0 ? { x: 300, opacity: 0 } : { opacity: 1 }
                  }
                  animate={{
                    zIndex: woodImageOrder.length - index,
                    scale: 1 - index * 0.05,
                    y: index * 10,
                    x: index * 5,
                    rotate: index * 2,
                    opacity: index === 0 ? 1 : 0.8 - index * 0.1,
                  }}
                  exit={
                    index === 0
                      ? { x: -300, opacity: 0, transition: { duration: 0.3 } }
                      : {}
                  }
                  transition={{ duration: 0.3 }}
                  onClick={
                    index === 0 && !isAnimating ? nextWoodImage : undefined
                  }
                  style={{
                    cursor: index === 0 && !isAnimating ? "pointer" : "default",
                    transformOrigin: "top right",
                  }}
                >
                  <div className="relative group">
                    <Image
                      src={src}
                      alt={`${t("imageAlt_metal")} ${index + 1}`}
                      width={600}
                      height={400}
                      className={clsxm(
                        'rounded-md shadow-lg',
                        'transition duration-200 ease-in-out hover:scale-[102.5%]'
                      )}
                    />
                    {index === 0 && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md flex items-center justify-center">
                        <p className="text-white text-lg font-medium">
                          {t("clickImageToSeeMore")}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* POWDER COATING */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
        <motion.div
            variants={itemVariants}
            className="md:mb-0 relative w-[324px] h-[256px] md:w-[600px] md:h-[400px]"
          >
            <AnimatePresence mode="popLayout">
              {powderImageOrder.map((src, index) => (
                <motion.div
                  key={src}
                  className="absolute top-0 left-0"
                  initial={
                    index === 0 ? { x: 300, opacity: 0 } : { opacity: 1 }
                  }
                  animate={{
                    zIndex: powderImageOrder.length - index,
                    scale: 1 - index * 0.05,
                    y: index * 10,
                    x: index * 5,
                    rotate: index * 2,
                    opacity: index === 0 ? 1 : 0.8 - index * 0.1,
                  }}
                  exit={
                    index === 0
                      ? { x: -300, opacity: 0, transition: { duration: 0.3 } }
                      : {}
                  }
                  transition={{ duration: 0.3 }}
                  onClick={
                    index === 0 && !isAnimating ? nextPowderImage : undefined
                  }
                  style={{
                    cursor: index === 0 && !isAnimating ? "pointer" : "default",
                    transformOrigin: "top right",
                  }}
                >
                  <div className="relative group">
                    <Image
                      src={src}
                      alt={`${t("imageAlt_metal")} ${index + 1}`}
                      width={600}
                      height={400}
                      className={clsxm(
                        'rounded-md shadow-lg',
                        'transition duration-200 ease-in-out hover:scale-[102.5%]'
                      )}
                    />
                    {index === 0 && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md flex items-center justify-center">
                        <p className="text-white text-lg font-medium">
                          {t("clickImageToSeeMore")}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <motion.div variants={itemVariants} className="md:w-1/2 md:pl-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black">
              {t("title_powder")}
            </h2>
            <p className="text-lg text-gray-600 mb-6 w-3/4">
              {t("description_powder")}
            </p>
            {/* <div className="p-4 border border-gray-700 rounded-md inline-flex border-dashed text-xs relative overflow-hidden">
              <motion.span
                initial="hidden"
                animate="visible"
                variants={typingVariants}
                className="overflow-hidden whitespace-nowrap text-black"
              >
                {t("clickImageToSeeMore")}
              </motion.span>
              <div className="absolute inset-0 border-b-2 border-red-500 animate-border" />
            </div> */}

            <style jsx>{`
              @keyframes borderAnimation {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(100%);
                }
              }
              .animate-border {
                animation: borderAnimation 2s linear infinite;
              }
            `}</style>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Capability;
