import { Header } from "@/widgets/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Фото альбом",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex flex-col items-center gap-5">
      <Header />
      {children}
    </main>
  );
}
