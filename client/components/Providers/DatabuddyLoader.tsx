"use client";

import { Databuddy } from "@databuddy/sdk/react";

/**
 * Databuddy analytics component
 * Loaded separately to avoid blocking main bundle
 */
export default function DatabuddyLoader() {
  try {
    return (
      <Databuddy
        clientId="9eded4d4-0ec8-4430-a741-ee4e59b29c4d"
        trackAttributes={true}
        trackOutgoingLinks={true}
        trackInteractions={true}
        trackScrollDepth={true}
        trackWebVitals={true}
      />
    );
  } catch (error) {
    console.log("Databuddy failed to load:", error);
    return null;
  }
}
