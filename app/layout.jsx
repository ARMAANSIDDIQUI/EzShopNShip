// app/layout.jsx
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import { CartProvider } from "@/contexts/cart-context";
import { WishlistProvider } from "@/hooks/use-wishlist";

// Use Next.js Google fonts instead of Geist
import { Inter, Roboto_Mono } from "next/font/google";

const geistSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "EzShopNShip - Modern E-commerce Experience",
  description:
    "A clean, modern e-commerce platform with beautiful themes and smooth animations",
  generator: "v0.app",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
