import React from "react";
import { motion } from "framer-motion";

const FeaturedWork = () => {
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
      <div className="grid gap-8 grid-cols-2 grid-rows-3 w-full">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
};

export default FeaturedWork;

const Item = () => {
  return (
    <div>
      <div
        className={`bg-lime-300 flex items-center justify-center text-black text-4xl h-[27rem] rounded-3xl`}
      >
        Featured Work Image
      </div>
      <ApperaingText className="text-sm mt-5 font-bold">
        GAME • CONCEPT • WORK IN PROGRESS{" "}
      </ApperaingText>
      <ApperaingText className="text-5xl">Featured Work</ApperaingText>
    </div>
  );
};

const ApperaingText = ({ children, ...props }) => {
  return (
    <motion.div
      {...props}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 40 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
    >
      {children}
    </motion.div>
  );
};
