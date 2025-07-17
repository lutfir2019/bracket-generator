import React from "react";
import Header from "./header";
import Footer from "./footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: Readonly<MainLayoutProps>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-16">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
