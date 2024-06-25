import localFont from "next/font/local";

export const aeonikFono = localFont({
  src: [
    {
      path: "./AeonikFono-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "./AeonikFono-Regular.woff",
      weight: "normal",
      style: "normal",
    },
  ],
  display: "optional",
  variable: "--font-aeonikFono",
});

export const aeonikMono = localFont({
  src: [
    {
      path: "./AeonikMono-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "./AeonikMono-Regular.woff",
      weight: "normal",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-aeonikMono",
});

export const inter = localFont({
  src: [
    {
      path: "./Inter-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-inter",
});
