"use client";

import Image from "next/image";
import { BackgroundGradient } from "./background-gradient";

interface PreviewImageProps {
  theme: string;
}

export default function PreviewImage({
  theme,
}: PreviewImageProps): JSX.Element {
  if (theme === "dark") {
    return (
      <>
        <BackgroundGradient className="rounded-3xl h-fit w-fit z-10 p-0 bg-neutral-100 dark:bg-neutral-800 group-hover:bg-opacity-100">
          <Image
            src="/dark-preview.png"
            width={1200}
            height={500}
            alt="preview"
            className="rounded-2xl"
          />
        </BackgroundGradient>
      </>
    );
  } else {
    return (
      <>
        <BackgroundGradient className="rounded-3xl h-fit w-fit z-10 p-0 bg-neutral-100 dark:bg-neutral-800 group-hover:bg-opacity-100">
          <Image
            src="/light-preview.png"
            width={1200}
            height={500}
            alt="preview"
            className="rounded-2xl"
          />
        </BackgroundGradient>
      </>
    );
  }
}
