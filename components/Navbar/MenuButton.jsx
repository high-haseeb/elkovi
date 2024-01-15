import React, { useEffect, useRef, useState } from "react";
import { a, useSpring } from "@react-spring/web";
import Menu from "./Menu";

const MenuButton = () => {
  const [isOpen, open] = useState(false);
  const offset = 10;

  const [dots, dotsApi] = useSpring(() => ({
    from: { transform: `rotate(0deg)` },
  }));

  const handleMouseEnter = () => {
    dotsApi.start({ transform: `rotate(90deg)` });
    setBgColor("white");
  };
  const handleMouseLeave = () => {
    if (!isOpen) {
      setBgColor("#E3E5EE");
      dotsApi.start({ transform: `rotate(0deg)` });
    }
  };

  const [menu, menuApi] = useSpring(() => ({
    from: { y: offset, opacity: 1 },
  }));

  const [close, closeApi] = useSpring(() => ({
    from: { y: offset, opacity: 0 },
  }));

  const handleClick = () => {
    // setBgColor(isOpen ? "white" : "#E3E5EE");
    menuApi.stop();
    closeApi.stop();
    menuApi.start({
      y: isOpen ? -offset : offset,
      opacity: isOpen ? 0 : 1,
    });

    closeApi.start({
      y: isOpen ? -offset : offset,
      opacity: isOpen ? 1 : 0,
    });
  };

  const [bgColor, setBgColor] = useState("#E3E5EE");

  const ref = useRef();
  const handleWindowClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      open(false);
      dotsApi.start({ transform: `rotate(0deg)` });
      handleClick();
    }
  };

  return (
    <>
      <Menu open={isOpen} onOutsideClick={handleWindowClick} />
      <div
        className="nav_btn_lg py-6 flex items-center justify-center cursor-pointer"
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ backgroundColor: bgColor }}
        onClick={() => {
          open(!isOpen);
          handleClick();
        }}
      >
        <div className="flex flex-col h-6 items-center justify-center">
          <a.div style={menu}>MENU&nbsp;&nbsp;</a.div>
          <a.div style={close}>CLOSE&nbsp;&nbsp;</a.div>
        </div>
        <a.div style={dots}>•&nbsp;•</a.div>
      </div>
    </>
  );
};

export default MenuButton;
