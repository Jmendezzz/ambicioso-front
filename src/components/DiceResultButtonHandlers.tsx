import React from 'react';

interface DiceResultButtonHandlersProps {
  phrase: string;
  position: 'left' | 'right';
  onClick?: () => void;
}

const DiceResultButtonHandlers: React.FC<DiceResultButtonHandlersProps> = ({ phrase, position, onClick}) => {
  const roundedPosition = position === 'left' ? 'rounded-l-xl' : 'rounded-r-xl';
  const positionCss = position === 'left' ? 'left-[-10.6%]' : 'right-[-10.6%]';

  return (
    <div
      onClick={onClick}
      className={`absolute ${positionCss} top-0 h-full w-24 bg-primary flex flex-col gap-2 justify-center items-center ${roundedPosition} cursor-pointer hover:bg-primary-dark transition-all duration-300`}
    >
      {phrase.split('').map((letter, index) => (
        <span
          key={index}
          className="text-white text-lg font-bold transition-transform duration-300 hover:scale-125"
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default DiceResultButtonHandlers;