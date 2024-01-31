import React from "react";

const ScrollText = (props) => {
  return (
    <div className="w-full flex items-center justify-between font-bold text-2xl mt-4 " {...props}>
      <div>+</div>
      <div>+</div>
      <div>Scroll to Explore</div>
      <div>+</div>
      <div>+</div>
    </div>
  );
};

export default ScrollText;
