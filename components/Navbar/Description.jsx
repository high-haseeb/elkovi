import React, { useState, useEffect } from "react";
import { Trail } from "./TrailText";

const Description = () => {
  const [open, set] = useState(false);
  useEffect(() => {
    set(true);
  }, []);

  return (
    <>
      {/* Description small screen */}
      <div className="pt-20 pb-6 lg:hidden">
        <div className="text-3xl  text-[#2B2E3A] font-extrabold leading-7">
          <Trail open={open}>
            <span>We build epic realtime</span>
            <span>interactive experience to</span>
            <span>blow people's minds</span>
          </Trail>
        </div>
      </div>

      {/*  Description large screen */}
      <div className="w-full items-start justify-center hidden lg:flex pt-11 pb-10">
        <div className="text-[2.75rem] w-2/4 text-[#2B2E3A] font-[500] leading-10">
          <Trail open={open}>
            <span>We build epic realtime</span>
            <span>interactive experience to</span>
            <span>blow people's minds</span>
          </Trail>
        </div>
      </div>
    </>
  );
};

export default Description;
