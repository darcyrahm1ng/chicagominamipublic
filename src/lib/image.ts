import type { StaticImageData } from "next/image";

export type ImageSource = string | StaticImageData;

export function imageSrc(value: ImageSource): string {
  return typeof value === "string" ? value : value.src;
}
