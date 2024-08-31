"use client";

import type { NextPage } from "next";
import FAQ from "~~/components/landing/FAQ";
import HeroSection from "~~/components/landing/HeroSection";
import FirstSection from "~~/components/landing/HowItWorks";
import ProtocolsUsed from "~~/components/landing/Sponsors";
import DotPattern from "~~/components/magicui/dot-pattern";
import { cn } from "~~/lib/utils";

const Home: NextPage = () => {
  return (
    <main className="my-10 flex min-h-screen flex-col bg-gradient-to-br from-white via-lime-200 to-lime-100 backdrop-blur-3xl">
      <div className="mx-auto w-full max-w-6xl">
        <HeroSection />
        <ProtocolsUsed />
        <FirstSection />
        <FAQ />
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
