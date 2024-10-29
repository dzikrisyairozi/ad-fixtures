import { motion } from "framer-motion";
import { useState } from "react";
import { useDragControls } from "framer-motion";
import Image from "next/image";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface MobileCarouselProps {
  processSteps: ProcessStep[];
  setSelectedId: (id: string) => void;
}

export const MobileCarousel: React.FC<MobileCarouselProps> = ({
  processSteps,
  setSelectedId,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragControls = useDragControls();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 50) {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + processSteps.length) % processSteps.length
      );
    } else if (info.offset.x < -50) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % processSteps.length);
    }
  };

  return (
    <div className="relative w-full h-64 overflow-hidden md:hidden">
      <motion.div
        className="flex items-center justify-center"
        drag="x"
        dragControls={dragControls}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        {[-1, 0, 1].map((offset) => {
          const index =
            (currentIndex + offset + processSteps.length) % processSteps.length;
          return (
            <motion.div
              key={processSteps[index].number}
              className="absolute top-1/2 transform -translate-y-1/2"
              initial={{
                x: offset * 100 + "%",
                opacity: offset === 0 ? 1 : 0.5,
              }}
              animate={{
                x: offset * 100 + "%",
                opacity: offset === 0 ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                layoutId={`process-step-${processSteps[index].number}`}
                onClick={() => setSelectedId(processSteps[index].number)}
                className="relative rounded-lg shadow-lg cursor-pointer aspect-square w-48 h-48 group"
              >
                <div className="absolute inset-0 z-10">
                  <Image
                    src={`https://res.cloudinary.com/ad-fixtures/image/upload/v1729792459/ad-fixtures/factory/process_${processSteps[index].number}.jpg`}
                    alt={processSteps[index].title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg" />
                  <div className="absolute inset-0 z-20 w-full h-full flex flex-col items-start justify-end p-4">
                    <h3 className="text-[32px] font-bold text-white">
                      {processSteps[index].number}
                    </h3>
                    <p className="text-[14px] font-semibold text-white">
                      {processSteps[index].title}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 rounded-lg">
                  <h3 className="text-[64px] font-bold text-red-600">
                    {processSteps[index].number}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
