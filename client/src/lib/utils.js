import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import animate from "@/assets/lottie-json";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#ffd60a2a] text-[#ffd60a] border-[1px] border-[#ffd60abb]",
  "bg-[#06d6a02a] text-[#4cc9f0] border-[1px] border-[#4cc9f0bb]",
];
export const getcolors = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0];
};
export const Animation = {
  loop: true,
  autoplay: true,
  animationData: animate,
};
