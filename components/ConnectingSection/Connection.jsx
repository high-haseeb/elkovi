import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Connection = () => {
  return (
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: '100%' }}
      viewport={{ once: true }}
      transition={{ duration: 2, staggerChildren: 1 }}
      className="mt-40"
    >
      <motion.div
        className=" text-9xl w-full z-10 relative"
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      >
        Connecting Ideals to
      </motion.div>
        {/* <br /> */}
      <motion.div
        className=" text-9xl w-full z-10 relative"
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      >
        Uniquely Crafted
        <br />
        Experiences
      </motion.div>
    </motion.div>
  );
};

export default Connection;
