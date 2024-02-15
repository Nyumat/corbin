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
        <BackgroundGradient className="z-10 size-fit rounded-3xl bg-neutral-100 p-0 group-hover:bg-neutral-100/80 dark:bg-neutral-800">
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
        <BackgroundGradient className="z-10 size-fit rounded-3xl bg-neutral-100 p-0 group-hover:bg-neutral-100/80 dark:bg-neutral-800">
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
