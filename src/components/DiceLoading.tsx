import { motion } from 'framer-motion';

function DiceLoading() {
  const diceVariants = {
    spinBounce: {
      rotate: [0, 90, 180, 270, 360],
      y: [10, -10, 20], 
      transition: {
        rotate: {
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        y: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-3 gap-8">
        {/* Dado 1 */}
        <motion.div
          className="w-16 h-16 text-8xl rounded-lg flex justify-center items-center shadow-lg bg-primary"
          variants={diceVariants}
          animate="spinBounce"
          style={{ animationDelay: '0s' }}
        >
          🎲
        </motion.div>
        {/* Dado 2 */}
        <motion.div
          className="w-16 h-16 text-8xl rounded-lg flex justify-center items-center shadow-lg bg-secondary"
          variants={diceVariants}
          animate="spinBounce"
          style={{ animationDelay: '0.8s' }}
        >
          🎲
        </motion.div>
        {/* Dado 3 */}
        <motion.div
          className="w-16 h-16 text-8xl rounded-lg flex justify-center items-center shadow-lg bg-accent"
          variants={diceVariants}
          animate="spinBounce"
          style={{ animationDelay: '2s' }}
        >
          🎲
        </motion.div>
      </div>
    </div>
  );
}

export default DiceLoading;
