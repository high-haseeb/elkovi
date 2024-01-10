import React from "react";

function Navbar() {
  return (
    <div className="flex w-full   items-start pt-20 justify-between">
      <div className="flex items-center justify-center text-4xl font-semibold ">
        ELKOVI
      </div>
      <div className="flex items-center justify-center text-4xl w-1/3 font-[500] text-[#2B2E3A]">
        We build epic realtime interactive experience to blow people's minds
      </div>
      <div className="flex items-center justify-center">
        <button className="navbar_btn_dark ">LET'S TALK • </button>
        <button className="navbar_btn_light">MENU •• </button>
        <button className="navbar_btn_light">––</button>
      </div>
    </div>
  );
}

export default Navbar;
