"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "react-hot-toast";
import MountGuard from "../ui/MountGuard";
import SmoothScroll from "../ui/SmoothScroll";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <MountGuard>
        <SmoothScroll>
          {children}
          <Toaster position="top-right" />
        </SmoothScroll>
      </MountGuard>
    </ThemeProvider>
  );
}
