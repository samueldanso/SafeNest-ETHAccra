"use client";

import { useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import { ProcessBeam } from "~~/components/ProcessBeam";

const components = [
  {
    name: "Sign up",
    description: "Sign up easily with email or google.",
    link: "https://docs.decash.link/docs/user-guide/create-link",
    component: ProcessBeam,
  },
  {
    name: "Setup",
    description: "Setup an account for your kid.",
    link: "https://docs.decash.link/docs/user-guide/create-link#make-the-deposit",
    component: ProcessBeam,
  },
  {
    name: "Save",
    description: "Start saving for your kids.",
    link: "https://docs.decash.link/docs/user-guide/create-link#share-link",
    component: ProcessBeam,
  },
];

export default function HowItWorks() {
  const [activeComponentIndex, setActiveComponentIndex] = useState(0);

  const ActiveComponent = components[activeComponentIndex].component;

  const handleClick = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl">Simple by design</h2>
          <p className="mt-4 text-xl text-gray-600">Create links with ease</p>
        </div>
        <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
          <ul className="w-full md:w-1/2 space-y-6">
            {components.map((item, index) => (
              <li
                key={index}
                className="bg-white rounded-xl p-6 shadow-md transition-all duration-200 ease-out hover:shadow-lg cursor-pointer"
                onClick={() => {
                  setActiveComponentIndex(index);
                  handleClick(item.link);
                }}
              >
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                  <span>Learn More</span>
                  <ChevronRightIcon className="w-4 h-4 ml-1" />
                </button>
              </li>
            ))}
          </ul>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </section>
  );
}
