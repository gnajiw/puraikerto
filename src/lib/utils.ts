import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.RelativeTimeFormat("id", { numeric: "auto" }).format(
    -Math.floor((Date.now() - new Date(date).getTime()) / 3600000),
    "hour"
  )
}
