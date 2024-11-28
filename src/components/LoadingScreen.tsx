import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: '0%' }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-black z-50 "
    >
      <div className="w-full flex justify-center">
        <Logo />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
