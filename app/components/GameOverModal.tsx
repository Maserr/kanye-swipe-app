import { motion } from "framer-motion";

interface GameOverModalProps {
  score: number;
  onRestart: () => void;
}

const GameOverModal = ({ score, onRestart }: GameOverModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center relative z-[10000]"
      >
        <h2 className="text-3xl font-bold mb-4 text-[#0F1419]">Game Over!</h2>
        <p className="text-xl mb-6 text-[#536471]">Final Score: {score}</p>
        <button
          onClick={onRestart}
          className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors"
        >
          Play Again
        </button>
      </motion.div>
    </motion.div>
  );
};

export default GameOverModal; 