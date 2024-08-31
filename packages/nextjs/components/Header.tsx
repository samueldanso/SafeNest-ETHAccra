"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Bars3Icon, CircleStackIcon } from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

const menuLinks: HeaderMenuLink[] = [
  { label: "Home", href: "/" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faqs", icon: <CircleStackIcon className="h-4 w-4" /> },
];

const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:bg-secondary active:text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);

  return (
    <header className="sticky top-0 z-20 w-full bg-base-100 shadow-md shadow-secondary">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 mr-6">
            <div className="relative w-10 h-10">
              <Image alt="SafeNest logo" className="cursor-pointer" fill src="/logo.svg" />
            </div>
            <span className="font-bold leading-tight">SafeNest</span>
          </Link>
          <nav className="hidden lg:flex">
            <ul className="flex space-x-4">
              <HeaderMenuLinks />
            </ul>
          </nav>
        </div>
        <div className="flex items-center">
          <DynamicWidget />
          <div className="lg:hidden ml-4" ref={burgerMenuRef}>
            <button
              className={`btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
              onClick={toggleDrawer}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            {isDrawerOpen && (
              <ul className="absolute right-0 mt-2 p-2 bg-base-100 rounded-box shadow-lg w-52" onClick={toggleDrawer}>
                <HeaderMenuLinks />
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
