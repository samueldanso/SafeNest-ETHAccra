import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~~/components/ui/accordion";

export default function FAQ() {
  return (
    <section id="faqs" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#1E1E1E] mb-12">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is SafeNest?</AccordionTrigger>
            <AccordionContent>
              SafeNest is a crypto savings platform for children and their parents in high-inflation economies, designed
              to securely save money toward a stable future.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How It Works?</AccordionTrigger>
            <AccordionContent>
              SafeNest allows parents to create savings accounts for their children, with features like time-locked
              savings, auto-conversion to USDC, and gamified task rewards.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it safe?</AccordionTrigger>
            <AccordionContent>
              Yes, SafeNest uses advanced blockchain technology and smart contracts to ensure the safety and security of
              your funds.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <p className="text-center mt-8 text-[#1E1E1E]">Contact via support if you have any more questions.</p>
      </div>
    </section>
  );
}
