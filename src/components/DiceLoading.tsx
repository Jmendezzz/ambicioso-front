import { motion } from 'framer-motion';
import diceGif from '../assets/dice.gif';

function DiceLoading() {

  return (
    <div className="flex justify-center items-center gap-4">
      <motion.img
        src={diceGif}
        alt="loading"
        className='w-20 h-20'   
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
      
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.img
        src={diceGif}
        alt="loading"
        className='w-20 h-20'   
        initial={{ rotate: 0, scale: 1 }}
        animate={{ rotate: 360, scale: 1.5 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
            <motion.img
        src={diceGif}
        alt="loading"
        className='w-20 h-20'   
        initial={{ rotate: 0, scale: 1 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </div>  
  );
}

export default DiceLoading;
