import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCapitalLettersOfName = (name: string) => {
  const [first, last] = name.split(" ");
  return `${first[0]}${last[0]}`;
};
