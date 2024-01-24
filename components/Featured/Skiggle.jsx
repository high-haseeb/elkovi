import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const Skiggle = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: svgRef,
  });
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(1 - value);
  });

  useEffect(() => {
  const path = pathRef.current;
  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;
  }, []);
  //

  //
  return (

    <svg
      ref={svgRef}
      className="squigggle absolute top-[-10%] left-0 w-screen ml-[-5rem] h-full z-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        d="M1588 1052.5C1563.5 1002.5 1503.4 1295.7 1413 1288.5C1300 1279.5 1318.5 976.5 1145.5 942.5C972.5 908.501 1011.5 1109.5 827 1142.5C642.5 1175.5 640.5 963.5 366 804C146.4 676.4 73.1667 792.5 64 866.5C65.5 916.5 106.8 1011.8 260 993C396 976.311 647.5 927.5 677.5 547.5C707.5 167.5 246.5 -47 82.5 66C-81.5 179 -189.5 31.5 -189.5 31.5"
        style={{
          strokeDashoffset: -4291 * progress,
          strokeWidth: 50,
          strokeLinecap: "round",
        }}
        stroke="url(#paint0_linear_5_4)"
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
          <stop offset="1" stop-color="#4A83FF" stop-opacity="1" />
        </linearGradient>
      </defs>
    </svg>

  );
};
export default Skiggle;
