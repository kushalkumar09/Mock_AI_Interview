import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const barRef = useRef(null);

  useEffect(() => {
    let interval;

    const updateProgress = () => {
      const resources = window.performance.getEntriesByType("resource");
      const total = resources.length || 10;
      let loaded = resources.filter(r => r.responseEnd > 0).length;

      let percent = Math.floor((loaded / total) * 100);
      if (percent > 100) percent = 100;
      setProgress(percent);
    };

    interval = setInterval(updateProgress, 50);

    const handleLoad = () => {
      setProgress(100);
      clearInterval(interval);
      setTimeout(() => onFinish(), 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", handleLoad);
    };
  }, [onFinish]);

  useEffect(() => {
    gsap.to(barRef.current, {
      width: `${progress}%`,
      duration: 0.2,
      ease: "power2.out",
    });
  }, [progress]);

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black z-50">
      <div className="flex space-x-2 mb-8 animate-pulse">

        <div className="bg-white h-4 w-4 rounded-full"></div>
        <div className="bg-white h-4 w-4 rounded-full"></div>
        <div className="bg-white h-4 w-4 rounded-full"></div>
        <div className="bg-white h-4 w-4 rounded-full"></div>
        <div className="bg-white h-4 w-4 rounded-full"></div>
      </div>
      <div className="w-[200px] h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-foreground rounded-full"
          style={{ width: "0%" }}
        ></div>
      </div>
      <h1 className="mt-4 text-4xl font-bold text-gray-700">{progress}%</h1>
    </div>
  );
};

export default Loader;
