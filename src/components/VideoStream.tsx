import DiceResultScanner from './DiceResultScanner';
import Logo from './Logo';

const VideoStream = () => {
  return (
    <div className="relative w-[1040px] h-[480px] shadow-2xl">
      <img
        src="http://localhost:5000/video"
        alt="Video Stream"
        className="w-full h-full object-center shadow-2xl shadow-primary"
      />
      <DiceResultScanner />
      <div className="absolute bottom-0 right-0">
        <Logo width="w-[200px]" height="h-[100px]" />
      </div>
    </div>
  );
};

export default VideoStream;
