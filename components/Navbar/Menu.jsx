import React, { useEffect, useRef, useState } from "react";
import { a, useSpring } from "@react-spring/web";

const Menu = () => {
  const [closed, setClosed] = useState(true);
  const menuHeight = 10;

  const [springs, api] = useSpring(() => ({
    transform: `rotate(0deg)`,
  }));

  const [closeSprings, closeApi] = useSpring(() => ({
    from: { transform: "translateY(10px)" },
    y: closed ? 0 : -menuHeight,
    opacity: closed ? 1 : 0,
    transform: closed ? `rotate(0deg)` : `rotate(-15deg)`,
  }));

  const [closeSpringsR, closeApiR] = useSpring(() => ({
    y: !closed ? 0 : menuHeight,
    opacity: !closed ? 1 : 0,
    transform: !closed ? `rotate(15deg)` : `rotate(0deg)`,
  }));

  const handleMouseEnter = () => {
    api.start({ transform: `rotate(90deg)` });
  };

  const handleMouseLeave = () => {
    api.start({ transform: `rotate(0deg)` });
  };

  const handleClick = () => {
    closeApi.start({
      y: closed ? -menuHeight : 10,
      opacity: closed ? 0 : 1,
      transform: closed ? `rotate(-15deg)` : `rotate(0deg)`,
    });

    closeApiR.start({
      y: !closed ? menuHeight : -10,
      opacity: !closed ? 0 : 1,
      transform: !closed ? `rotate(15deg)` : `rotate(0deg)`,
    });
    setBgColor(closed ? "white" : "#E3E5EE");
  };
  const [bgColor, setBgColor] = useState("#E3E5EE");
  const ref = useRef();

  const handleWindowClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      console.log('clicked')
    setClosed(false);
      handleClick();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleWindowClick);
    return () => {
      document.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: bgColor }}
      className="nav_btn_lg py-6 flex items-center justify-center hover:bg-white cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col h-6 items-center justify-center">
        <a.div style={closeSprings}>MENU&nbsp;&nbsp;</a.div>
        <a.div style={closeSpringsR}>CLOSE&nbsp;&nbsp;</a.div>
      </div>
      <a.div style={springs}>●●</a.div>
    </div>
  );
};

export default Menu;
