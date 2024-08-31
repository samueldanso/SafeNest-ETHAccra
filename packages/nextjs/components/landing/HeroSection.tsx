import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function HeroSection() {
  return (
    <section id="hero" className="bg-gradient-to-r from-blue-500 to-purple-600 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl mb-6">
            Fast, smart decentralized stablecoin savings
          </h1>
          <p className="text-xl mb-8">Save USDC for your child's future</p>
          <DynamicWidget buttonClassName="bg-white text-blue-600 font-bold py-3 px-6 rounded-full text-lg hover:bg-blue-100 transition duration-300">
            Sign Up
          </DynamicWidget>
        </div>
      </div>
    </section>
  );
}
