import { motion } from "framer-motion";
import { useState } from "react";
import { useDragControls } from "framer-motion";

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
      setCurrentIndex((prevIndex) => (prevIndex - 1 + processSteps.length) % processSteps.length);
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
          const index = (currentIndex + offset + processSteps.length) % processSteps.length;
          return (
            <motion.div
              key={processSteps[index].number}
              className="absolute top-1/2 transform -translate-y-1/2"
              initial={{ x: offset * 100 + "%", opacity: offset === 0 ? 1 : 0.5 }}
              animate={{ x: offset * 100 + "%", opacity: offset === 0 ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                layoutId={processSteps[index].number}
                onClick={() => setSelectedId(processSteps[index].number)}
                className="bg-white p-6 rounded-md shadow-lg cursor-pointer aspect-square flex items-center justify-center w-48 h-48"
              >
                <h3 className="text-7xl font-bold text-red-600">
                  {processSteps[index].number}
                </h3>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};