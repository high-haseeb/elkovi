import Footer from "@/components/Character/Experience";
import Navbar from "@/components/Navbar/Navbar";
import Experience from "@/components/Pipes/Experience";
import Pipes from "@/components/Pipes/Pipes";

export default function Home() {
  return (
    <div className="bg-[#F0F1FA] w-screen h-full font-[#060607] flex flex-col px-20">
      <div className="h-screen flex flex-col">
        <Navbar />
        <Experience/>
      </div>
      <Footer />
    </div>
  );
}
