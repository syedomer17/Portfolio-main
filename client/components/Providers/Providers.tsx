"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "react-hot-toast";
import MountGuard from "../ui/MountGuard";
import SmoothScroll from "../ui/SmoothScroll";
import { Databuddy } from '@databuddy/sdk/react';

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
          <Databuddy
            clientId="9eded4d4-0ec8-4430-a741-ee4e59b29c4d"
            trackAttributes={true}
            trackOutgoingLinks={true}
            trackInteractions={true}
            trackScrollDepth={true}
            trackWebVitals={true}
          />
        </SmoothScroll>
      </MountGuard>
    </ThemeProvider>
  );
}

