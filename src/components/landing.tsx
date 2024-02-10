import NavigationBar from "@/wrappers/NavigationBar";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { BackgroundBeams } from "./background-beams";
import PreviewImage from "./images";
import Card from "./market-card";

export async function HeroContent() {
  return (
    <main className="bg-white dark:bg-black antialiased">
      <NavigationBar />

      <section className="flex flex-col items-center justify-center py-2 dark:text-white text-neutral-950">
        <div className="w-full h-[40rem] my-auto mx-auto dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/30 relative flex flex-col items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold max-w-lg md:max-w-xl lg:max-w-3xl text-center my-6">
            The
            <span className="dark:text-[#A3E635] text-[#6c9a23]">
              {" "}
              Sustainable{" "}
            </span>
            <span className="dark:text-[#ffff]">
              Shopping Platform {""}
            </span>{" "}
            For
            <span className="dark:text-[#A3E635] text-[#6c9a23]">
              {" "}
              Students
            </span>
          </h1>

          <h3 className="md:text-lg lg:text-xl font-light mt-4 max-w-lg text-md  md:max-w-xl lg:max-w-3xl mx-auto text-center px-12">
            Corbin turns your unused items into value for your student
            community. Whether you are looking to buy, sell, or donate,
            we&#39;ve got you covered.
          </h3>

          <Link
            href="#subscribe"
            className=" mt-14 inline-flex items-center justify-center px-6 py-3 mb-2 text-lg text-white bg-[#6c9a23] rounded-md hover:bg-[#394d16] sm:w-auto sm:mb-0 transition-colors duration-300 ease-in-out z-10"
            data-primary="green-400"
            data-rounded="rounded-2xl"
            data-primary-reset="{}"
          >
            Learn More
            <svg
              className="w-4 h-4 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
        <BackgroundBeams />
        <div className="dark:block hidden mt-24 scale-90 lg:scale-95">
          <PreviewImage theme="dark" />
        </div>
        <div className="dark:hidden block mt-24 scale-90 lg:scale-95">
          <PreviewImage theme="light" />
        </div>
      </section>

      <div className="flex flex-col items-center justify-center mt-64 py-2 dark:text-white text-neutral-950">
        <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold max-w-lg md:max-w-xl lg:max-w-3xl text-center my-6">
          Why Corbin?
        </h2>
        <h4 className="md:text-lg lg:text-xl font-light my-8 max-w-2xl text-md mx-auto text-center px-12">
          Corbin is the best way to give your old items a new life.
        </h4>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-32 py-8 mx-12 mt-2 m-32 z-20">
          <Card
            icon={
              <LightningBoltIcon className="h-12 w-12 text-[#A3E635] relative -top-12 bg-neutral-800 rounded-full p-2 border-4 border-neutral-700 border-opacity-50" />
            }
            title="Free To Use"
            text="Corbin ditches the fees. Our platform is free to use, and we don&#39;t take a cut of your sales. We believe that you should keep the money you make."
          />

          <Card
            icon={
              <LightningBoltIcon className="h-12 w-12 text-[#A3E635] relative -top-12 bg-neutral-800 rounded-full p-2 border-4 border-neutral-700 border-opacity-50" />
            }
            title="Quick and Easy"
            text="Our platform is designed to be quick and easy to use. You can list your items in minutes, and find what you need in seconds."
          />
          <Card
            icon={
              <LightningBoltIcon className="h-12 w-12 text-[#A3E635] relative -top-12 bg-neutral-800 rounded-full p-2 border-4 border-neutral-700 border-opacity-50" />
            }
            title="Eco-Friendly"
            text="Our platform is designed to be eco-friendly. By reusing and recycling old items, users of Corbin are helping to reduce waste."
          />
        </div>
      </div>

      <div
        className="h-[50rem] w-full   dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative flex items-center justify-center"
        id="subscribe"
      >
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]"></div>
        <div className="flex flex-col items-center justify-center gap-8">
          <p className="text-5xl md:text-5xl lg:text-6xl font-bold max-w-lg md:max-w-xl lg:max-w-3xl text-center relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-[#92db1f] to-[#80c510] py-6">
            Be the first to know
          </p>
          <p className=" text-center max-w-sm md:max-w-lg text-xl sm:text-2xl font-light relative z-20 bg-clip-text text-transparent dark:bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-500 bg-gradient-to-b from-neutral-950/80 to-neutral-950/80">
            Corbin is launching in the coming weeks. <br /> Check back soon for
            updates.
          </p>
          <a
            href="https://github.com/nyumat/corbin"
            target="_blank"
            rel="noopener noreferrer"
            title="Join The Movement"
          >
            <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border-[#6c9a2351] dark:bg-[linear-gradient(110deg,#000103,45%,#6c9a2351,55%,#000103)] bg-[length:200%_100%] px-6  dark:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-8 bg-[linear-gradient(110deg,#0000,45%,#6c9a2351,55%,#6c9a22)] text-black  dark:border border-2 dark:border-[#6c9a2351] font-bold ">
              Join The Movement
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}
