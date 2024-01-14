"use client";
import React, { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { Trail } from "./TrailText";
import LetsTalk from "./LetsTalk";
import Menu from "./Menu";

function Navbar() {
  const [rotate, setRotate] = useSpring(() => ({
    transform: `rotate(0deg)`,
    config: { tension: 300, friction: 20, mass: 1 },
  }));
  const [open, set] = useState(false);
  function separateDivsForLetters(inputString) {
    const letters = inputString.split(" ");
    return letters.map((letter, index) => <div key={index}>{letter}</div>);
  }
  useEffect(() => {
    set(true);
  }, []);

  return (
    <>
      {/* Navbar small screen */}
      <div className="fixed top-0 left-0 z-50 w-full py-6 lg:hidden px-6">
        <div className="flex items-center justify-between  w-full font-extrabold pb-2">
          <div className="tracking-wider font-extrabold text-3xl">LUSION</div>
          <div
            className="nav_btn_sm flex items-center justify-center cursor-pointer"
            onMouseEnter={() => setRotate({ transform: "rotate(90deg)" })}
            onMouseLeave={() => setRotate({ transform: "rotate(0deg)" })}
            onClick={() => {
              console.log("open menu");
            }}
          >
            <animated.div className="text-[0.5rem] " style={rotate}>
              ⬤ ⬤
            </animated.div>
          </div>
        </div>
      </div>

      {/* Description small screen */}
      <div className="pt-20 pb-6 lg:hidden">
        <div className="text-3xl w-3/4 text-[#2B2E3A] font-extrabold leading-7 flex flex-col">
          <Trail open={open} height="2rem">
            {separateDivsForLetters("We build epic realtime")}
          </Trail>
          <Trail open={open} height="2rem">
            {separateDivsForLetters("interactive experience to")}
          </Trail>
          <Trail open={open} height="2rem">
            {separateDivsForLetters("blow people's minds")}
          </Trail>
        </div>
      </div>

      {/*  Description large screen */}
      <div className="w-full items-start justify-center hidden lg:flex pt-11 pb-10">
        <div className="text-[2.75rem] w-2/4 text-[#2B2E3A]  font-[500] flex flex-col">
          <Trail open={open} height="3rem">
            {separateDivsForLetters("We build epic realtime")}
          </Trail>
          <Trail open={open} height="3rem">
            {separateDivsForLetters("interactive experience to")}
          </Trail>
          <Trail open={open} height="3rem">
            {separateDivsForLetters("blow people's minds")}
          </Trail>
        </div>
      </div>

      {/* Navbar large screen */}
      <div className="fixed top-0 left-0 w-full px-20 z-50">
        <div className="items-start justify-between hidden lg:flex pt-14 pb-10">
          <div className="tracking-wider font-[600] text-4xl">LUSION</div>
          <div className="hidden lg:flex items-center justify-around ">
            <LetsTalk />
            <Menu />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
