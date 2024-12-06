import React from 'react';
import { motion } from 'framer-motion';

interface DiceResultButtonHandlersProps {
  phrase: string;
  position: 'left' | 'right';
  onClick?: () => void;
}

const DiceResultButtonHandlers: React.FC<DiceResultButtonHandlersProps> = ({
  phrase,
  position,
  onClick,
}) => {
  const roundedPosition = position === 'left' ? 'rounded-l-xl' : 'rounded-r-xl';
  const positionCss = position === 'left' ? 'left-[-9.6%]' : 'right-[-9.6%]';

  const letterVariants =
    position === 'left'
      ? { initial: { scale: 1, rotate: 0 }, hover: { scale: 1.5, rotate: -20 } }
      : {
          initial: { scale: 1, rotate: 0 },
          hover: { scale: 1.5, rotate: 10 },
        };

  return (
    <motion.button
      onClick={onClick}
      className={`absolute ${positionCss} top-0 h-full w-24 bg-primary/90 flex flex-col gap-2 justify-center items-center ${roundedPosition} cursor-pointer hover:bg-primary-dark transition-all duration-300`}
      initial="initial"
      whileHover="hover"
    >
      {phrase.split('').map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          className="text-white text-2xl font-bold"
          variants={letterVariants}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.button>
  );
};

export default DiceResultButtonHandlers;
