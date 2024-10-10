import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import UnstyledLink from "@/components/links/UnstyledLink";
import Image from "next/image";

const links = [
  { href: "#about", label: "ABOUT" },
  { href: "#solution", label: "SOLUTION" },
  { href: "#contact", label: "CONTACT US" },
];

const languages = [
  { code: "EN", flag: "/images/flags/uk.png" },
  { code: "CN", flag: "/images/flags/cn.png" },
  { code: "JP", flag: "/images/flags/jp.png" },
];

export default function Header() {
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#141414] text-white">
    {/* <header className="sticky top-0 z-50 bg-header-fade text-white"> */}
      <div className="layout flex h-[100px] items-center justify-between p-8">
        <UnstyledLink href="/" className="font-bold hover:text-gray-300">
          <Image src="/images/logo.png" alt="Logo" width={150} height={100} />
        </UnstyledLink>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-4">
              {links.map(({ href, label }) => (
                <li key={`${href}${label}`}>
                  <UnstyledLink
                    href={href}
                    className="hover:text-gray-300 text-sm"
                  >
                    {label}
                  </UnstyledLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <div className='relative' ref={langMenuRef}>
              <motion.button
                className="flex items-center space-x-1 text-white rounded-md p-1"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={currentLang.flag}
                  alt={currentLang.code}
                  width={24}
                  height={16}
                />
              </motion.button>
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-1 bg-[#141414] border border-gray-600 rounded-md overflow-hidden w-[48px] flex flex-col justify-center items-center"
                  >
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        className="flex items-center justify-center w-full p-2"
                        onClick={() => {
                          setCurrentLang(lang);
                          setIsLangMenuOpen(false);
                        }}
                        whileHover={{ backgroundColor: "#333" }}
                      >
                        <Image
                          src={lang.flag}
                          alt={lang.code}
                          width={24}
                          height={16}
                        />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#141414]"
          >
            <nav className="p-4">
              <ul className="flex flex-col space-y-4">
                {links.map(({ href, label }) => (
                  <motion.li
                    key={`${href}${label}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <UnstyledLink
                      href={href}
                      className="hover:text-gray-300 text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {label}
                    </UnstyledLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
