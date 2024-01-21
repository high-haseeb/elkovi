"use client";
import Footer from "@/components/Character/Experience";
import Header from "@/components/Featured/Header";
import Skiggle from "@/components/Featured/Skiggle";
import SubHeader from "@/components/Featured/SubHeader";
import Description from "@/components/Navbar/Description";
import Navbar from "@/components/Navbar/Navbar";
import ScrollText from "@/components/Navbar/ScrollText";
import { Scene } from "@/components/Pipes/CrossPipes";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="bg-[#F0F1FA] h-auto w-screen font-[#060607] flex flex-col px-6 lg:px-20 overflow-hidden">
      <Navbar />

      <div className="h-screen flex flex-col pb-6 ">
        <Description />
        {/* <div className="h-full bg-brblue rounded-3xl"></div> */}
        <Scene className="rounded-xl lg:rounded-3xl" /> 
        <ScrollText />
      </div>

      <div className="h-[150vh] relative">
        <Header />
        <SubHeader/>
        <div className="rounded-3xl bg-blue-200 w-[40vw] h-[20rem] absolute bottom-80" />
        <Skiggle/>
      </div>

    </div>
  );
}
