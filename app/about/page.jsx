import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import Scene from "@/components/About/Particles/Particles";

const About = () => {
  return (
    <div className="w-screen h-screen bg-black text-white overflow-hidden relative">
     <Navbar />
      <Scene/>
      <ScrollText />
      <div className="absolute text-[17rem] font-extrabold tracking-widest bottom-0 right-1/2 translate-x-1/2 w-auto leading-none">SAMTIK</div>
    </div>
  );
};

export default About;

const ScrollText = (props) => {
  return (
    <div className="w-full flex items-center justify-between font-bold text-3xl text-white absolute top-1/2 px-20" {...props}>
      <div>+</div>
      <div>+</div>
      <div>Scroll to Explore</div>
      <div>+</div>
      <div>+</div>
    </div>
  );
};
