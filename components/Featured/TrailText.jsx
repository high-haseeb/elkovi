import React from 'react';
import { useTrail, a } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

export const Trail = ({ children, callback, ...props }) => {
  const items = React.Children.toArray(children);
  const [ref, inView] = useInView({ rootMargin: "-50px 0px" });

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 1000, friction: 200 },
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 50, // Adjust the initial value to a higher positive value
    height: inView ? 140 : 0,
    from: { opacity: 0, y: 50, height: 0 }, // Adjust the initial value here as well
    onRest: () => callback(inView),
  });

  return (
    <div {...props} ref={ref}>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};
