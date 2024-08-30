"use client";

import type { NextPage } from "next";
import FirstSection from "~~/components/FirstSelection";
import HeroSection from "~~/components/HeroSection";
import ProtocolsUsed from "~~/components/ProtocolUsed";
import DotPattern from "~~/components/magicui/dot-pattern";
import { cn } from "~~/lib/utils";

const Home: NextPage = () => {
  return (
    <main className="my-10 flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-6xl">
        <HeroSection />
        <ProtocolsUsed />
        <FirstSection />
      </div>
      <DotPattern
        width={40}
        height={40}
        cr={2}
        className={cn("[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] -z-10 -top-[370px]")}
      />
    </main>
  );
};

export default Home;
