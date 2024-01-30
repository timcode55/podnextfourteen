"use client";
import { ReactNode } from "react";
import { PodcastContextProvider } from "@/store/podcastContext";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main>
        <PodcastContextProvider>{children}</PodcastContextProvider>
      </main>
    </>
  );
}
