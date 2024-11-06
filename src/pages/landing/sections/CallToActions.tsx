import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Dialog } from "@headlessui/react";

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

  const handleInitialSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email") as string;
    setEmailInput(email);
    setIsModalOpen(true);
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
          wantsCall
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      // Clear the form and modal
      setEmailInput("");
      setQuestion("");
      setWantsCall(false);
      setIsModalOpen(false);
      alert(t("successMessage"));
    } catch (error) {
      console.error("Error:", error);
      alert(t("errorMessage"));
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
          <motion.p variants={itemVariants} className="text-sm md:text-md mb-6">
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
     <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
     
     <div className="fixed inset-0 flex items-center justify-center p-4">
       <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6 shadow-xl">
         <Dialog.Title className="text-lg font-medium mb-4">
           {t("confirmSubscription")}
         </Dialog.Title>

         <div className="space-y-4">
           <div>
             <p className="text-sm text-gray-600">{t("confirmEmailMessage")}</p>
             <p className="font-medium">{emailInput}</p>
           </div>

           <div>
             <label className="block text-sm text-gray-700 mb-2">
               {t("questionLabel")}
             </label>
             <textarea
               value={question}
               onChange={(e) => setQuestion(e.target.value)}
               className="w-full px-3 py-2 border rounded-md text-sm"
               rows={3}
               placeholder={t("questionPlaceholder")}
             />
           </div>

           <div className="flex items-center space-x-2">
             <input
               type="checkbox"
               id="wantsCall"
               checked={wantsCall}
               onChange={(e) => setWantsCall(e.target.checked)}
               className="rounded border-gray-300"
             />
             <label htmlFor="wantsCall" className="text-sm text-gray-700">
               {t("wantsCallLabel")}
             </label>
           </div>

           <div className="flex justify-end space-x-3 mt-6">
             <button
               type="button"
               onClick={() => !isLoading && setIsModalOpen(false)}
               disabled={isLoading}
               className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
             >
               {t("cancel")}
             </button>
             <button
               type="button"
               onClick={handleFinalSubmit}
               disabled={isLoading}
               className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
             >
               {isLoading ? t("sending") : t("submit")}
             </button>
           </div>
         </div>
       </Dialog.Panel>
     </div>
   </Dialog>
   </>
  );
}

export default CallToActions;
