import { motion } from 'framer-motion';
import diceGif from '../assets/dice.gif';

function DiceLoading() {
  return (
    <div className="flex justify-center items-center gap-4">
      <motion.img
        src={diceGif}
        alt="loading"
        className="w-10 h-10"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      <motion.img
        src={diceGif}
        alt="loading"
        className="w-10 h-10"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      <motion.img
        src={diceGif}
        alt="loading"
        className="w-10 h-10"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export default DiceLoading;
