"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon, CashIcon } from "@heroicons/react/outline";

import { Web3Button } from "@web3modal/react";

const navigation = [
  { name: "Home", href: "/dashboard", current: false },
  { name: "NFT Rewards", href: "/rewards/nft", current: false },
  { name: "Profile", href: "/profile", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Navigation() {
  const { address } = useAccount();

  return (
    <Disclosure as="nav" className="bg-indigo-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center lg:visible md:visible invisible">
                  <p className="text-4xl font-bold text-white">dist</p>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4 py-3">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={
                          item.name === "Profile"
                            ? `${item.href}/${address}`
                            : item.href
                        }
                      >
                        <span
                          className={classNames(
                            item.current
                              ? "bg-indigo-900 text-white"
                              : "text-indigo-300 hover:bg-indigo-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center content-between pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div>
                  <Web3Button />
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
