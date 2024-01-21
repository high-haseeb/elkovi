import React, { useState, useEffect, useRef } from "react";

const Skiggle = () => {
  const pathRef = useRef(null);
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const path = pathRef.current;
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const totalHeight = document.body.clientHeight - window.innerHeight;
      const progress = scrollY / totalHeight;
      setProgress(progress);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div  className="h-[3vh]">
      <svg
        className="absolute top-0 left-0 w-screen ml-[-5rem] h-full z-0"
        // viewBox="0 0 1881 1560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          style={{ strokeDashoffset:  6000 * -(progress - 1) }}
          d="M1 1C1131.8 538.6 931.167 894.333 689.5 1005C587.167 1052.33 390.9 1102.4 424.5 924C466.5 701 1024 709 1169 751C1314 793 1317 1005 1283.5 1116.5C1250 1228 1347 1219.5 1397.5 1138.5C1448 1057.5 1536.5 1016 1509 1161C1487 1277 1747.17 1475 1880 1559.5"
          stroke="url(#paint0_linear_5_4)"
          stroke-width="40"
          ref={pathRef}
        />
        <defs>
          <linearGradient
            id="paint0_linear_5_4"
            x1="35"
            y1="-17"
            x2="605"
            y2="444"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#0016EC" />
            <stop offset="1" stop-color="#5A83FF" stop-opacity="0.9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
export default Skiggle;
