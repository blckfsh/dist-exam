"use client";
import { useState, useEffect } from "react";

export function Info() {
  const getCurrentSeconds = () => {
    const now = new Date();
    return now.getSeconds();
  };

  // Set the time left to the current seconds
  const [timeLeft, setTimeLeft] = useState(60 - getCurrentSeconds());

  useEffect(() => {
    // Update the countdown every second
    const intervalId = setInterval(() => {
      const currentSeconds = getCurrentSeconds();
      setTimeLeft(60 - currentSeconds);
    }, 1000);

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="mt-10 mx-20 rounded bg-white text-black border rounded shadow">
      <div className="flex flex-col flex-wrap text-center px-4">
        <div className="py-3">
          <div className="px-5 border-b border-slate-200 pb-4 mb-4">
            <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-slate-500">
              Time left before next reward distribution
            </h1>
          </div>
          <div className="rounded-lg">
            <div className="mt-5">
              <p className="text-7xl font-semibold">{timeLeft}s</p>              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
