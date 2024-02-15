import NavigationBar from "@/wrappers/NavigationBar";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { BackgroundBeams } from "./background-beams";
import PreviewImage from "./images";
import Card from "./market-card";

export async function HeroContent() {
  return (
    <main className="bg-white antialiased dark:bg-black">
      <NavigationBar />

      <section className="flex flex-col items-center justify-center py-2 text-neutral-950 dark:text-white">
        <div className="relative m-auto flex h-[40rem] w-full flex-col  items-center justify-center bg-white bg-dot-black/30 dark:bg-black dark:bg-dot-white/[0.2]">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
          <h1 className="my-6 max-w-lg text-center text-4xl font-bold md:max-w-xl md:text-4xl lg:max-w-3xl lg:text-6xl">
            The
            <span className="text-[#6c9a23] dark:text-[#A3E635]">
              {" "}
              Sustainable{" "}
            </span>
            <span className="dark:text-[#ffff]">
              Shopping Platform {""}
            </span>{" "}
            For
            <span className="text-[#6c9a23] dark:text-[#A3E635]">
              {" "}
              Students
            </span>
          </h1>

          <h3 className="mx-auto mt-4 max-w-lg px-12 text-center text-base  font-light md:max-w-xl md:text-lg lg:max-w-3xl lg:text-xl">
            Corbin turns your unused items into value for your student
            community. Whether you are looking to buy, sell, or donate,
            we&#39;ve got you covered.
          </h3>

          <Link
            href="#subscribe"
            className=" z-10 mb-2 mt-14 inline-flex items-center justify-center rounded-md bg-[#6c9a23] px-6 py-3 text-lg text-white transition-colors duration-300 ease-in-out hover:bg-[#394d16] sm:mb-0 sm:w-auto"
            data-primary="green-400"
            data-rounded="rounded-2xl"
            data-primary-reset="{}"
          >
            Learn More
            <svg
              className="ml-1 size-4"
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
        <div className="mt-24 hidden scale-90 dark:block lg:scale-95">
          <PreviewImage theme="dark" />
        </div>
        <div className="mt-24 block scale-90 dark:hidden lg:scale-95">
          <PreviewImage theme="light" />
        </div>
      </section>

      <div className="mt-64 flex flex-col items-center justify-center py-2 text-neutral-950 dark:text-white">
        <h2 className="my-6 max-w-lg text-center text-5xl font-bold md:max-w-xl md:text-5xl lg:max-w-3xl lg:text-6xl">
          Why Corbin?
        </h2>
        <h4 className="mx-auto my-8 max-w-2xl px-12 text-center text-base font-light md:text-lg lg:text-xl">
          Corbin is the best way to give your old items a new life.
        </h4>
        <div className="z-20 m-32  mx-12 mt-2 grid grid-cols-1 gap-32 py-8 md:grid-cols-2 lg:grid-cols-3">
          <Card
            icon={
              <LightningBoltIcon className="relative -top-12 size-12 rounded-full border-4 border-neutral-700/50 bg-neutral-800 p-2 text-[#A3E635]" />
            }
            title="Free To Use"
            text="Corbin ditches the fees. Our platform is free to use, and we don&#39;t take a cut of your sales. We believe that you should keep the money you make."
          />

          <Card
            icon={
              <LightningBoltIcon className="relative -top-12 size-12 rounded-full border-4 border-neutral-700/50 bg-neutral-800 p-2 text-[#A3E635]" />
            }
            title="Quick and Easy"
            text="Our platform is designed to be quick and easy to use. You can list your items in minutes, and find what you need in seconds."
          />
          <Card
            icon={
              <LightningBoltIcon className="relative -top-12 size-12 rounded-full border-4 border-neutral-700/50 bg-neutral-800 p-2 text-[#A3E635]" />
            }
            title="Eco-Friendly"
            text="Our platform is designed to be eco-friendly. By reusing and recycling old items, users of Corbin are helping to reduce waste."
          />
        </div>
      </div>

      <div
        className="relative flex   h-[50rem] w-full items-center justify-center bg-grid-black/[0.1] dark:bg-grid-white/[0.1]"
        id="subscribe"
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)] dark:bg-black"></div>
        <div className="flex flex-col items-center justify-center gap-8">
          <p className="relative z-20 max-w-lg bg-gradient-to-b from-[#92db1f] to-[#80c510] bg-clip-text py-6 text-center text-5xl font-bold text-transparent md:max-w-xl md:text-5xl lg:max-w-3xl lg:text-6xl">
            Be the first to know
          </p>
          <p className=" relative z-20 max-w-sm bg-gradient-to-b from-neutral-950/80 to-neutral-950/80 bg-clip-text text-center text-xl font-light text-transparent dark:bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-500 sm:text-2xl md:max-w-lg">
            Corbin is launching in the coming weeks. <br /> Check back soon for
            updates.
          </p>
          <a
            href="https://github.com/nyumat/corbin"
            target="_blank"
            rel="noopener noreferrer"
            title="Join The Movement"
          >
            <button className="mt-8 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border-2 border-[#6c9a2351] bg-[linear-gradient(110deg,#0000,45%,#6c9a2351,55%,#6c9a22)]  bg-[length:200%_100%] px-6 font-bold text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50  dark:border dark:border-[#6c9a2351] dark:bg-[linear-gradient(110deg,#000103,45%,#6c9a2351,55%,#000103)] dark:text-slate-400 ">
              Join The Movement
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}
