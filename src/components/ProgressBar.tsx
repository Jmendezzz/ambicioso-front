import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  total: number;
}

function ProgressBar({ progress, total }: ProgressBarProps) {
  const percentage = Math.min((progress / total) * 100, 100); 

  return (
    <div className="w-full relative max-w-md h-8 bg-white rounded-sm overflow-hidden shadow-md">
      <motion.div
        className="h-full bg-primary rounded-sm"
        style={{ width: '0%' }} 
        animate={{ width: `${percentage}%` }} 
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <div className='absolute top-0 w-full h-full flex justify-center items-center'>
        <span className='text-black text-lg font-bold'>{progress}/{total}</span>
      </div>
    </div>
  );
}

export default ProgressBar;
