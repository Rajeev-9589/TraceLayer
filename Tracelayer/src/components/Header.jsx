// src/components/Header.jsx

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function Header() {
  const headerRef = useRef(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  // GSAP animation on mount
  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  // Toggle theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <header
      ref={headerRef}
      className="w-full px-6 py-4 bg-gray-200 dark:bg-gray-800 shadow-md flex items-center justify-between"
    >
      <h1 className="text-xl font-bold tracking-wide dark:text-white text-gray-800">
        🔐 Auth App
      </h1>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-white dark:bg-black border dark:border-white border-black text-black dark:text-white px-3 py-1 rounded-full transition duration-300"
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  );
}

export default Header;
