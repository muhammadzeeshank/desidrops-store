import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Desi Home Store",
  description:
    "Discover the best organic oil for cooking at Desi Home Store — your trusted source for 100% natural and healthy cooking oil. Sourced from pure ingredients, our oils support a wholesome lifestyle. Shop now for the best and healthiest cooking oil in Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      <main className="flex-grow flex flex-col">{children}</main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000000",
            color: "#fff",
          },
        }}
      />
      <Footer />
    </ThemeProvider>
  );
}
