import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Dialog } from "@headlessui/react";
import { toast } from "sonner";

function CallToActions() {
  const t = useTranslations("CallToActions");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [question, setQuestion] = useState("");
  const [wantsCall, setWantsCall] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.6,
        bounce: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1], // Custom easing for smooth exit
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        delay: 0.1,
      },
    },
  };

  const contentExitVariants = {
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };


  const handleInitialSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email") as string;
    setEmailInput(email);
    setIsModalOpen(true);
  };

  // Update the handleClose function
  const handleClose = async () => {
    if (isLoading) return;

    // Animate content out first
    await new Promise(resolve => setTimeout(resolve, 200));
    setIsModalOpen(false);
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/submit-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput,
          question: question || "No questions asked",
          wantsCall,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      // Animate success before closing
      await new Promise(resolve => setTimeout(resolve, 200));

      // Clear the form and modal
      setEmailInput("");
      setQuestion("");
      setWantsCall(false);
      setIsModalOpen(false);
      toast.success(t("successMessage"));
    } catch (error) {
      console.error("Error:", error);
      toast.error(t("errorMessage"));
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <motion.div
        id="contact-us"
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative h-[512px] overflow-hidden"
      >
        <Image
          src="https://res.cloudinary.com/ad-fixtures/image/upload/ad-fixtures/factory/call_to_action.jpg"
          alt={t("backgroundImageAlt")}
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
              {t("title")}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-md mb-6"
            >
              {t("description")}
            </motion.p>
            <motion.form
              onSubmit={handleInitialSubmit}
              className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
            >
              <motion.input
                name="email"
                type="email"
                required
                disabled={isLoading}
                placeholder={t("emailPlaceholder")}
                className="text-sm w-full md:w-auto px-4 py-2 text-white rounded bg-transparent border border-white placeholder:text-white placeholder:text-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.05, backgroundColor: "#f0f0f0" }}
                whileTap={{ scale: 0.95 }}
                className="text-sm w-full md:w-auto px-6 py-2 bg-white text-black font-semibold rounded transition-all duration-300 ease-in-out disabled:opacity-50"
              >
                {isLoading ? t("sending") : t("subscribeButton")}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </motion.div>
      {/* Confirmation Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => !isLoading && setIsModalOpen(false)}
        className="relative z-50"
      >
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md"
          >
            <Dialog.Panel className="w-full overflow-hidden rounded-3xl bg-gradient-to-b from-gray-900 to-gray-800 p-8 shadow-2xl ring-1 ring-white/10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit="exit"
                variants={contentExitVariants}
                transition={{ delay: 0.1 }}
              >
                <Dialog.Title className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mr-3 text-blue-400"
                  >
                    ✉️
                  </motion.span>
                  {t("confirmSubscription")}
                </Dialog.Title>

                <div className="space-y-6">
                  {/* Email confirmation section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-colors duration-300"
                  >
                    <p className="text-sm text-gray-400 mb-1">
                      {t("confirmEmailMessage")}
                    </p>
                    <p className="font-medium text-blue-400">{emailInput}</p>
                  </motion.div>

                  {/* Question section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t("questionLabel")}
                    </label>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 
                   rounded-xl text-sm text-gray-200
                   focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                   transition-all duration-300 ease-in-out
                   placeholder:text-gray-500 hover:border-gray-600/50"
                      rows={3}
                      placeholder={t("questionPlaceholder")}
                    />
                  </motion.div>

                  {/* Checkbox section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center space-x-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <input
                        type="checkbox"
                        id="wantsCall"
                        checked={wantsCall}
                        onChange={(e) => setWantsCall(e.target.checked)}
                        className="w-5 h-5 rounded-md border-gray-700 bg-gray-800/50 
                     text-blue-500 cursor-pointer
                     focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-0
                     transition-all duration-300 ease-in-out"
                      />
                    </motion.div>
                    <label
                      htmlFor="wantsCall"
                      className="text-sm text-gray-300 cursor-pointer select-none hover:text-gray-200 transition-colors"
                    >
                      {t("wantsCallLabel")}
                    </label>
                  </motion.div>

                  {/* Buttons section */}
                  <div className="flex justify-end space-x-4 mt-8">
                    <motion.button
                      whileHover={{ scale: 1.02, x: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleClose}
                      disabled={isLoading}
                      className="px-5 py-2.5 text-sm font-medium text-gray-400 
                   hover:text-gray-300 disabled:opacity-50
                   transition-all duration-300"
                    >
                      <motion.span
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center"
                      >
                        {t("cancel")}
                      </motion.span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleFinalSubmit}
                      disabled={isLoading}
                      className="relative px-5 py-2.5 text-sm font-medium text-white 
                   overflow-hidden group
                   bg-gradient-to-r from-blue-600 to-blue-500
                   rounded-xl shadow-lg shadow-blue-500/20
                   hover:shadow-blue-500/30 hover:from-blue-500 hover:to-blue-400
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-300 ease-in-out"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0, opacity: 0 }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      {isLoading ? (
                        <div className="flex items-center space-x-2 relative z-10">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          <span>{t("sending")}</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 relative z-10">
                          <span>{t("submit")}</span>
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            exit={{ x: 20, opacity: 0 }}
                          >
                            →
                          </motion.span>
                        </div>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </Dialog.Panel>
          </motion.div>
        </div>
      </Dialog>
    </>
  );
}

export default CallToActions;
