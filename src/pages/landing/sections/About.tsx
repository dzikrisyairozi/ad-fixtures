import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";
import NextImageLightbox from "@/components/NextImageLightbox";
import GridBackground from "../components/GridBackground";

function About() {
  const t = useTranslations("About");

  const stats = [
    { value: "8500", label: t("yearExperience") },
    { value: "43", label: t("countrySpread") },
    { value: "20", label: t("furnitureSold") },
    { value: "1538", label: t("variantFurniture") },
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildrenVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  return (
    <section className="bg-white relative">
    <GridBackground/>
      {/* Header Section */}
      <motion.div
        className="py-16 bg-[#383838]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-white mb-8"
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
          >
            {t("headerTitle")}
          </motion.h2>
        </div>
      </motion.div>
      {/* Stats Card */}
      <motion.div
        className="container mx-auto px-4 flex justify-center"
        style={{ marginTop: "-30px" }}
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg p-4 md:p-6 flex flex-wrap justify-between w-full md:w-4/5 lg:w-2/3"
          variants={staggerChildrenVariants}
        >
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <motion.div
                className="text-center flex-1 min-w-[120px] mb-4 md:mb-0 relative"
                variants={fadeInUpVariants}
              >
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-600">
                  {stat.label}
                </div>
                {index < stats.length - 1 && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-2/3 w-px bg-gray-300"></div>
                )}
              </motion.div>
            </React.Fragment>
          ))}
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <div className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            variants={staggerChildrenVariants}
            initial="hidden"
            animate={controls}
            className="mb-16 flex flex-col md:flex-row items-center"
          >
            <motion.div
              className="md:w-1/2 md:pr-8 mb-6 md:mb-0"
              variants={fadeInUpVariants}
            >
              <motion.div className="relative">
                <div className="absolute inset-0 bg-gray-300 rounded-lg"></div>
                <NextImageLightbox
                  src="https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/factory_ab1.jpg"
                  width={600}
                  height={400}
                  alt={t("industrialExperienceImageAlt")}
                  className="w-full relative z-10 hover:transform hover:translate-x-[-16px] hover:translate-y-[-16px] transition-all duration-300 ease-in-out hover:scale-[102.5%] hover:shadow-lg hover"
                  imgClassName="rounded-lg w-full"
                />
              </motion.div>
            </motion.div>
            <motion.div
              className="md:w-1/2 md:pl-8"
              variants={fadeInUpVariants}
            >
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                {t("industrialExperienceTitle")}
              </h3>
              <p className="text-gray-600">
                {t("industrialExperienceDescription")}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerChildrenVariants}
            initial="hidden"
            animate={controls}
            className="flex flex-col md:flex-row items-center"
          >
            <motion.div
              className="md:w-1/2 md:pr-8 order-2 md:order-1"
              variants={fadeInUpVariants}
            >
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                {t("oneStopServiceTitle")}
              </h3>
              <p className="text-gray-600 mb-6 md:mb-0">
                {t("oneStopServiceDescription")}
              </p>
            </motion.div>
            <motion.div
              className="md:w-1/2 md:pl-8 order-1 md:order-2"
              variants={fadeInUpVariants}
            >
              <div className="grid grid-cols-2 gap-4 mb-4">
                <motion.div className="relative">
                  <div className="absolute inset-0 bg-gray-300 rounded-lg"></div>
                  <NextImageLightbox
                    src="https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/factory_ab2.jpg"
                    width={280}
                    height={200}
                    alt={t("oneStopServiceImage1Alt")}
                    className="w-full relative z-10 hover:transform hover:translate-x-[-16px] hover:translate-y-[-16px] transition-all duration-300 ease-in-out hover:scale-[102.5%]"
                    imgClassName="rounded-lg w-full"
                  />
                </motion.div>
                <motion.div className="relative">
                  <div className="absolute inset-0 bg-gray-300 rounded-lg"></div>
                  <NextImageLightbox
                    src="https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/factory_ab3.jpg"
                    width={280}
                    height={200}
                    alt={t("oneStopServiceImage2Alt")}
                    className="w-full relative z-10 hover:transform hover:translate-x-[16px] hover:translate-y-[-16px] transition-all duration-300 ease-in-out hover:scale-[102.5%]"
                    imgClassName="rounded-lg w-full"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
