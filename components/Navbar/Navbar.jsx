"use client";

import React, { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { Trail } from "./TrailText";

import LetsTalk from "./LetsTalk";
import MenuButton from "./MenuButton";
import Link from "next/link";
import MusicButton from "./MusicButton";
import Image from "next/image";

function Navbar() {
  const [rotate, setRotate] = useSpring(() => ({
    transform: `rotate(0deg)`,
    config: { tension: 300, friction: 20, mass: 1 },
  }));

  const [open, set] = useState(false);
  useEffect(() => {
    set(true);
  }, []);

  return (
    <>
      {/* Navbar small screen */}
      <div className="fixed top-0 left-0 z-50 w-full py-6 lg:hidden px-6">
        <div className="flex items-center justify-between  w-full font-extrabold pb-2">
          <div className="tracking-wider font-extrabold text-3xl cursor-pointer">
            <Link href="/"><Image src={'/smatik_logo.png'} width={'100'} height={'100'}/></Link>
          </div>
          <div
            className="nav_btn_sm flex items-center justify-center cursor-pointer"
            onMouseEnter={() => setRotate({ transform: "rotate(90deg)" })}
            onMouseLeave={() => setRotate({ transform: "rotate(0deg)" })}
          >
            <animated.div className="text-[0.5rem] " style={rotate}>
              ⬤ ⬤
            </animated.div>
          </div>
        </div>
      </div>

      {/* Navbar large screen */}
      <div className="fixed top-0 left-0 w-full px-20 z-50 ">
        <div className="items-start justify-between hidden lg:flex pt-14 pb-10">
          <div className="tracking-wider font-AeonikMedium text-4xl">
            <Link href="/"><Image src={'/smatik_logo.png'} width={'200'} height={'100'}/></Link>
          </div>
          <div className="hidden lg:flex items-center justify-around font-AeonikMedium">
            <Trail open={open} className="flex">
              <MusicButton />
              <LetsTalk />
              <MenuButton />
            </Trail>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
