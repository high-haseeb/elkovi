"use client"
import Footer from "@/components/Character/Experience";
import Navbar from "@/components/Navbar/Navbar";
import Experience from "@/components/Pipes/Experience";
import Pipes from "@/components/Pipes/Pipes";
import LoadingComponent from "@/components/Progress/Progress";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div className="bg-black w-screen h-screen  font-Aeonik"><LoadingComponent /></div>}>
      <div className="bg-[#F0F1FA] w-screen h-full font-[#060607] flex flex-col">
        <div className="h-screen flex flex-col px-6 lg:px-20 pb-6 ">
          <Navbar />
          <Experience />
        </div>
        <div className="w-screen h-screen bg-purple-300"></div>
        {/* <Footer /> */}
      </div>
    </Suspense>
  );
}
