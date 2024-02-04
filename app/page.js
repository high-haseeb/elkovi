"use client";
import { Suspense, useRef } from "react";
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
import Experience from "@/components/Experience/Experience";
import { Planets } from "@/components/Pipes/Planets";

export default function Home() {
  const ref = useRef(null);
  return (
    <Suspense
      fallback={
        <div className="w-screen bg-black h-screen text-white text-9xl flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <div className="bg-[#F0F1FA] h-auto w-screen font-[#060607] flex flex-col px-6 lg:px-20 overflow-hidden">
        <Navbar />

        <div className="h-screen flex flex-col pb-6 ">
          <Description />
          {/* <div className="h-full bg-brblue rounded-3xl"></div> */}
          {/* <Scene className="rounded-xl lg:rounded-3xl" /> */}
          <Planets className="h-full rounded-xl lg:rounded-3xl" />
          <ScrollText />
        </div>
      {/* </div> */}
        <div className="h-[200vh] relative mt-[20rem]" ref={ref}>
          <Skiggle />
          <Header />
          <SubHeader />
          <FeaturedVideo refForward={ref} />
        </div>
        <FeaturedWork />
        <Connection className="" />
        <div className="mt-80 w-full h-screen relative">
          <Experience className="w-full h-full rounded-3xl" />
        </div>
      {/* <div className="bg-brblue flex items-center justify-center w-full h-screen font-extrabold text-9xl"> this is the footer  </div> */}
        <div className="relative">
          <div className="absolute text-9xl font-bold text-center w-full h-full top-80">
            HIRE       ME
          </div>
          <Footer />
          <div className="absolute text-3xl font-bold text-center w-full h-full top-[40rem]">
            made by haseeb
          </div>
        </div>
      </div>
    </Suspense>
  );
}
