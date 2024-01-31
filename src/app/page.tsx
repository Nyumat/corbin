import NavigationBar from "@/wrappers/NavigationBar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen w-full">
      <video
        autoPlay
        muted
        loop
        className="absolute z-[-1] object-cover w-full h-full"
      >
        <source src="/ink.webm" type="video/webm" />
      </video>
      <HeroContent />
    </div>
  );
}

export async function HeroContent() {
  return (
    <main>
      <NavigationBar />
      <div className="flex flex-col items-center justify-center mt-40 py-2 text-white">
        <h1 className="text-[10rem] font-bold leading-4 whitespace-nowrap ">
          Trash Nothing.
        </h1>
        <h1 className="text-[10rem] font-bold mt-2 leading-2 whitespace-nowrap">
          Exchange Everything.
        </h1>

        <p className="text-[2rem] font-bold leading-2 whitespace-nowrap">
          Sustainable living made easy.
        </p>

        <Link
          href="/dashboard"
          className="relative px-6 py-3 font-bold text-white/90 group my-16 scale-150"
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-[#E184AB] group-hover:translate-x-0 group-hover:translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full border-4 border-white"></span>
          <span className="relative">Join The Movement</span>
        </Link>
      </div>
    </main>
  );
}
