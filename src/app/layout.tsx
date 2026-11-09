import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Playfair_Display } from "next/font/google";
import { SmoothScroll, CustomCursor } from "@/components";
import "./globals.css";

// Font Sans nghệ thuật, hiện đại, hình học, hỗ trợ hoàn hảo tiếng Việt & tiếng Anh
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

// Font Display nghệ thuật đậm chất Graphic Design Studio / Antiantiart, hỗ trợ tiếng Việt
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Font Serif thời trang cao cấp / editorial, hỗ trợ tiếng Việt
const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Trần Nam Tiến — Graphic Designer & Visual Artist | Antiantiart Style",
  description:
    "Explore the creative portfolio of Trần Nam Tiến. Brand Guidelines, Packaging, Typography, and Visual Art Direction.",
  keywords: ["Trần Nam Tiến", "Graphic Designer", "Visual Artist", "Antiantiart", "Brand Guideline", "Packaging", "Typography"],
  authors: [{ name: "Trần Nam Tiến" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`dark bg-black ${plusJakartaSans.variable} ${spaceGrotesk.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen bg-black font-sans text-white antialiased overflow-x-hidden selection:bg-red-500 selection:text-white">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
