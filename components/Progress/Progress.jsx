"use client";
import React, { useState, useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import NProgress styles

const LoadingComponent = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const progressInterval = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 1);
      }
    }, 50);

    return () => {
      clearInterval(progressInterval);
    };
  }, [progress]);

  useEffect(() => {
    if (progress >= 100) {
      NProgress.done();
    } else {
      NProgress.start();
    }
  }, [progress]);

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-black text-white text-9xl'>
      {progress}
    </div>
  );
};

export default LoadingComponent;
