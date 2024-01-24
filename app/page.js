"use client";
import { useRef } from "react";
import Footer from "@/components/Character/Experience";
import FeaturedVideo from "@/components/Featured/FeaturedVideo";
import Header from "@/components/Featured/Header";
import Skiggle from "@/components/Featured/Skiggle";
import SubHeader from "@/components/Featured/SubHeader";
import Description from "@/components/Navbar/Description";
import Navbar from "@/components/Navbar/Navbar";
import ScrollText from "@/components/Navbar/ScrollText";
import { Scene } from "@/components/Pipes/CrossPipes";
import FeaturedWork from "@/components/FeaturedWork/FeaturedWork";
import Connection from "@/components/ConnectingSection/Connection";

// todo: complete this by today
export default function Home() {
  const ref = useRef(null);
  return (
    <div className="bg-[#F0F1FA] h-auto w-screen font-[#060607] flex flex-col px-6 lg:px-20 overflow-hidden">
      <Navbar />

      <div className="h-screen flex flex-col pb-6 ">
        <Description />
        <div className="h-full bg-brblue rounded-3xl"></div>
        {/* <Scene className="rounded-xl lg:rounded-3xl" />  */}
        <ScrollText />
      </div>

      <div className="h-[200vh] relative mt-[20rem]" ref={ref}>
        <Skiggle/>
        <Header />
        <SubHeader/>
        <FeaturedVideo refForward={ref}/>
      </div>
      <FeaturedWork/>
      <Connection/>
      <div className="bg-brblue flex items-center justify-center w-full h-screen font-extrabold text-9xl"> this is the footer  </div>
      {/* <Footer/> */}

    </div>
  );
}
