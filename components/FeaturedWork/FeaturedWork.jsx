import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import Image from "next/image";

const FeaturedWork = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });
  const velocityFactor = useTransform(smoothVelocity, [-1000, 1000], [-45, 45], {
    clamp: false,
  });
  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    if (velocityFactor.get() !== 0) {
      if (ref.current) {
        let rect = ref.current.getBoundingClientRect();
        if (rect.top > window.innerHeight / 2) {
          console.log("this is at the bottom");
        }
      }
    }
  });

  return (
    <div className="w-full h-auto">
      <div className="flex w-full justify-between items-center">
        <div className="text-[9rem]">Featured Work</div>
        <div className="text-sm font-semibold">
          A SELECTION OF OUR MOST PASSIONALITY <br />
          CRAFTED WORKS WITH FORWARD THINKING
          <br /> CLIENTS AND FRIENDS OVER THE YEARS
        </div>
      </div>
      <div className="relative grid grid-rows-3 grid-cols-1 lg:grid-cols-2 gap-8 perspective-1000 w-full h-auto transform-style-3d">
        {Array.from({ length: 6 }, (_, index) => (
          <motion.div ref={ref} className={"flex items-center shadow-lg text-center justify-center w-[30rem] rounded-3xl h-[27rem] text-black text-6xl"} style={{ rotateX: velocityFactor }}>
            <Image src={`/textures/planet_${index + 1}.jpg`} width={300} height={270} className="w-full h-full object-cover rounded-3xl"/>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedWork;

const Item = ({ rotation, index }) => {
  const ref = useRef(null);
  useAnimationFrame((t, delta) => {
    if (ref.current && rotation.get() !== 0) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top > document.documentElement.clientHeight / 2) {
        rotation.set(rotation.get() * -1);
        console.log("this at the bottom of screen", rotation.get());
      }
    }
  });
  return (
    <motion.div ref={ref} className={"bg-lime-300 flex items-center shadow-lg text-center justify-center w-[30rem] rounded-3xl h-[27rem] text-black text-6xl"} style={{ rotateX: rotation }}>
      <Image src={`/textures/planet_${index + 1}.jpg`} width={30 * 16} height={27 * 16} />
    </motion.div>
  );
};

const ApperaingText = ({ children, ...props }) => {
  return (
    <motion.div {...props} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }} transition={{ duration: 1.5 }}>
      {children}
    </motion.div>
  );
};
