import Navbar from "@/components/Navbar/Navbar";
import Experience from "@/components/Pipes/Experience";
import Pipes from "@/components/Pipes/Pipes";

export default function Home() {
  return (
    <div className="bg-[#F0F1FA] w-screen h-screen font-[#060607] flex flex-col px-20">
      <Navbar/>
      <Experience/>
    </div>
  )
}
