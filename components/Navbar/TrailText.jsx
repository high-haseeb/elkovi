"use client";
import React from "react";
import { useTrail, a } from "@react-spring/web";

export const Trail = ({ open, children, height='3rem' }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 3, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    y: open ? 0 : 20,
    from: { opacity: 0, y: 20 },
  });
  return (
    <div className={ `flex h-[${height}]` }>
      {trail.map(({ ...style }, index) => {
        return (
          <div className='flex'>
            <a.div key={index} style={style}>
              {items[index]}
            </a.div>{" "}
            <div>&nbsp;</div>
          </div>
        );
      })}
    </div>
  );
};

