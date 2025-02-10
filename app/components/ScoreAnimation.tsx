import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

interface ScoreAnimationProps {
  score: number;
  isCorrect: boolean;
}

const ScoreAnimation = ({ score, isCorrect }: ScoreAnimationProps) => {
  return (
    <AnimatePresence>
      <motion.div
        key={score}
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 15, opacity: 0 }}
        className="absolute right-[-80px] top-[-10px] pointer-events-none"
      >
        <div className="w-16 h-16 relative">
          <Image
            src={isCorrect ? "/kanye-correct.png" : "/kanye-wrong.png"}
            alt={isCorrect ? "Correct guess" : "Wrong guess"}
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScoreAnimation; 