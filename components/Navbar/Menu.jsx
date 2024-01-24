import { useSpring, a } from "@react-spring/web";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Menu = ({ open, onOutsideClick }) => {
  const ref = useRef();
  const handleChildClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onOutsideClick(event);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleChildClick);
    return () => {
      document.removeEventListener("click", handleChildClick);
    };
  }, []);

  const [contents, contentsApi] = useSpring(() => ({
    from: { y: 100, opacity: 0, transform: "rotate(20deg)" },
  }));

  const [news, newsApi] = useSpring(() => ({
    from: { y: 100, opacity: 0, transform: "rotate(-20deg)" },
  }));
  const [hidden, setHidden] = useState(true);
  useEffect(() => {

    if(open == false){
      setTimeout(() => {
        setHidden(false);}
      , 500);
    }else{
      setHidden(true)
    }

    contentsApi.start({
      y: open ? 0 : 100,
      opacity: open ? 1 : 0,
      transform: open ? `rotate(0deg)` : `rotate(20deg)`,
    });

    newsApi.start({
      y: open ? 0 : 100,
      opacity: open ? 1 : 0,
      transform: open ? `rotate(0deg)` : `rotate(-20deg)`,
    });

  }, [open]);

  return (
    <>
      {hidden && (
        <div
          className="absolute top-[4rem] right-0 w-[20rem] "
          ref={ref}
        >
          {/* Contents */}
          <a.div
            className="rounded-xl bg-white flex flex-col font-Aeonik text-3xl p-8"
            style={contents}
          >
            <div className="flex justify-between pb-3">
              <div>HOME</div>
              <div>•</div>
            </div>
            <div className="py-3">
              <Link href={"/about"}>ABOUT US</Link>
            </div>
            <div className="py-3">
              <Link href="/projects">PROJECTS</Link>
            </div>
            <div className="pt-3">
              <Link href="/contact">CONTACT</Link>
            </div>
          </a.div>

          {/* Newsletter */}
          <a.div
            className="rounded-xl bg-white flex flex-col p-8 my-2"
            style={news}
          >
            <div className="font-Aeonik text-4xl ">
              Subscribe to our newsletter
            </div>
            <form
              onSubmit={() => console.log("submitted thank you")}
              className="flex justify-between bg-[#F0F1FA] p-4 rounded-xl mt-6 text-[#BEBFC7] text-xl"
            >
              <label className="">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-[#F0F1FA] w-1/2"
                ></input>
              </label>
              <button type="submit">
                <Image
                  src={"/arrow-right.svg"}
                  width={30}
                  height={30}
                  alt="right-arrow"
                />
              </button>
            </form>
          </a.div>

          {/* Labs */}
          <a.div className="bg-black text-white p-8 rounded-xl" style={contents}>
            <Link href="/labs">
              <div className="flex justify-between text-3xl">
                <div>LABS</div>
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <path
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 12-6-6m6 6-6 6m6-6H5"
                    transform="rotate(-45, 12, 12)"
                  />
                </svg>
              </div>
            </Link>
          </a.div>
        </div>
      )}
    </>
  );
};

export default Menu;
