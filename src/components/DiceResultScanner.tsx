import { useEffect, useState } from "react";
import DiceLoading from "./DiceLoading"
import { useGetDiceResults } from "../hooks/useGetDiceResults";

function DiceResultScanner() {
  const [countdown, setCountdown] = useState(5);
  const {result, loading, getDiceNumberResult} = useGetDiceResults();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      getDiceNumberResult();
    }
  }, [countdown]);


  return (
    <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white bg-black/80 flex flex-col justify-center items-center">
    {countdown > 0 && <span>{countdown}</span>}
    {loading && <DiceLoading />}
    {!loading && <span>{result}</span>}
  </div>
  )
}

export default DiceResultScanner