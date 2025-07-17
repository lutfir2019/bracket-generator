import MainLayout from "@/layout/main-layout";
import React from "react";

interface LayoutAppProps {
  children: React.ReactNode;
}

function LayoutApp({ children }: Readonly<LayoutAppProps>) {
  return <MainLayout>{children}</MainLayout>;
}

export default LayoutApp;
