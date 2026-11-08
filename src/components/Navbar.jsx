"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const toggleButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const triggerClose = useCallback(() => {
    setMobileMenuOpen(false);

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (
      drawerRef.current &&
      drawerRef.current.contains(document.activeElement)
    ) {
      toggleButtonRef.current?.focus();
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setIsMounted(false);
      setIsExiting(false);
    } else {
      setIsExiting(true);
      closeTimeoutRef.current = setTimeout(() => {
        setIsMounted(false);
        setIsExiting(false);
        closeTimeoutRef.current = null;
      }, 200);
    }
  }, []);

  const openMenu = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMobileMenuOpen(true);
    setIsMounted(true);
    setIsExiting(false);
  }, []);

  const toggleMenu = useCallback(() => {
    if (mobileMenuOpen) {
      triggerClose();
    } else {
      openMenu();
    }
  }, [mobileMenuOpen, triggerClose, openMenu]);

  const closeMenu = triggerClose;

  // Cleanup pending unmount timers on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && mobileMenuOpen) {
        triggerClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, triggerClose]);

  // Handle hash scrolling on mount or navigation arrival
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#hero") {
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        heroEl.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    }
  }, []);

  const handleBrandClick = useCallback((e) => {
    // Preserve browser native modifier actions (Cmd, Ctrl, Shift, Alt, middle-click)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    // When on the homepage, reliably scroll to #hero without full reload, even if URL already has #hero
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();

      if (window.location.hash !== "#hero") {
        window.history.pushState(null, "", "/#hero");
      }

      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        heroEl.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      closeMenu();
    }
    // On subpages (e.g. /projects/[slug]), allow normal Next.js Link navigation to /#hero
  }, [closeMenu]);

  // Abstract interlocking-block geometric brand mark (32x32)
  const BrandIcon = (
    <svg
      className="h-8 w-8 text-[#245BDB] dark:text-[#4F7CFF]"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Block 1: Upper-left interlocking L-block (Cobalt / Electric blue) */}
      <path
        d="M5 7C5 5.89543 5.89543 5 7 5H19.5C20.3284 5 21 5.67157 21 6.5V11H11V21H6.5C5.67157 21 5 20.3284 5 19.5V7Z"
        className="fill-[#245BDB] dark:fill-[#4F7CFF]"
      />
      {/* Block 2: Lower-right interlocking L-block (Cyan / Sky blue) */}
      <path
        d="M27 25C27 26.1046 26.1046 27 25 27H12.5C11.6716 27 11 26.3284 11 25.5V21H21V11H25.5C26.3284 11 27 11.6716 27 12.5V25Z"
        className="fill-[#0284C7] dark:fill-[#22D3EE]"
      />
      {/* Central interlocking nexus block */}
      <rect
        x="13"
        y="13"
        width="6"
        height="6"
        rx="1.5"
        className="fill-[#1D4ED8] dark:fill-[#38BDF8]"
      />
    </svg>
  );

  return (
    <header className="navbar-surface sticky top-0 z-40 w-full border-b border-[#CBD8EC] shadow-[0_1px_3px_0_rgba(15,23,42,0.04)] backdrop-blur-md transition-colors dark:border-white/[0.07] dark:shadow-none">
      {/* Desktop Layout: 3 balanced regions (1fr auto 1fr) with navigation centered against content container */}
      <div className="mx-auto hidden h-20 max-w-[1240px] grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-8 md:grid">
        {/* Region 1: Brand Mark aligned left */}
        <div className="flex items-center justify-start">
          <Link
            href="/#hero"
            onClick={handleBrandClick}
            className="group nav-scale-hover inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#245BDB] dark:focus-visible:outline-[#4F7CFF]"
            aria-label="Qamra Ariva — Home"
          >
            {BrandIcon}
          </Link>
        </div>

        {/* Region 2: Navigation Links centered against overall container */}
        <nav
          aria-label="Primary navigation"
          className="flex items-center justify-center gap-10"
        >
          <Link
            href="/#projects"
            className="nav-scale-hover inline-block text-[15px] font-medium text-slate-600 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#245BDB] dark:text-slate-300 dark:hover:text-white dark:focus-visible:outline-[#4F7CFF]"
          >
            Work
          </Link>
          <Link
            href="/#services"
            className="nav-scale-hover inline-block text-[15px] font-medium text-slate-600 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#245BDB] dark:text-slate-300 dark:hover:text-white dark:focus-visible:outline-[#4F7CFF]"
          >
            Services
          </Link>
          <Link
            href="/#stack"
            className="nav-scale-hover inline-block text-[15px] font-medium text-slate-600 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#245BDB] dark:text-slate-300 dark:hover:text-white dark:focus-visible:outline-[#4F7CFF]"
          >
            Stack
          </Link>
          <Link
            href="/#about"
            className="nav-scale-hover inline-block text-[15px] font-medium text-slate-600 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#245BDB] dark:text-slate-300 dark:hover:text-white dark:focus-visible:outline-[#4F7CFF]"
          >
            About
          </Link>
        </nav>

        {/* Region 3: Right Controls aligned right */}
        <div className="flex items-center justify-end gap-5 sm:gap-6">
          <ThemeToggle />
          <Link
            href="/#contact"
            className="btn-primary nav-scale-cta px-5 py-2.5 text-sm"
          >
            Let’s talk
          </Link>
        </div>
      </div>

      {/* Mobile Layout: Switched before controls collide (< md) */}
      <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-6 sm:px-8 md:hidden">
        {/* Brand Mark */}
        <Link
          href="/#hero"
          onClick={handleBrandClick}
          className="group inline-flex items-center transition hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#245BDB] dark:focus-visible:outline-[#4F7CFF]"
          aria-label="Qamra Ariva — Home"
        >
          {BrandIcon}
        </Link>

        {/* Right Controls: Theme Toggle & Menu Button */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            ref={toggleButtonRef}
            type="button"
            onClick={toggleMenu}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            aria-controls="mobile-menu-drawer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white/90 text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-white"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.75"
              stroke="currentColor"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 7.5h16.5M3.75 12h16.5m-16.5 4.5h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMounted && (
        <div
          ref={drawerRef}
          id="mobile-menu-drawer"
          aria-hidden={!mobileMenuOpen}
          inert={!mobileMenuOpen ? "" : undefined}
          className={`mobile-drawer-surface border-b border-[#CBD8EC] px-6 py-5 shadow-lg backdrop-blur-xl md:hidden dark:border-white/[0.08] ${
            isExiting ? "mobile-menu-exit" : "mobile-menu-enter"
          }`}
        >
          <nav aria-label="Mobile primary navigation" className="flex flex-col gap-2">
            <Link
              href="/#projects"
              onClick={closeMenu}
              tabIndex={!mobileMenuOpen ? -1 : undefined}
              className="rounded-lg px-3 py-2 text-base font-medium text-slate-800 transition hover:bg-slate-200/60 dark:text-slate-200 dark:hover:bg-white/[0.06]"
            >
              Work
            </Link>
            <Link
              href="/#services"
              onClick={closeMenu}
              tabIndex={!mobileMenuOpen ? -1 : undefined}
              className="rounded-lg px-3 py-2 text-base font-medium text-slate-800 transition hover:bg-slate-200/60 dark:text-slate-200 dark:hover:bg-white/[0.06]"
            >
              Services
            </Link>
            <Link
              href="/#stack"
              onClick={closeMenu}
              tabIndex={!mobileMenuOpen ? -1 : undefined}
              className="rounded-lg px-3 py-2 text-base font-medium text-slate-800 transition hover:bg-slate-200/60 dark:text-slate-200 dark:hover:bg-white/[0.06]"
            >
              Stack
            </Link>
            <Link
              href="/#about"
              onClick={closeMenu}
              tabIndex={!mobileMenuOpen ? -1 : undefined}
              className="rounded-lg px-3 py-2 text-base font-medium text-slate-800 transition hover:bg-slate-200/60 dark:text-slate-200 dark:hover:bg-white/[0.06]"
            >
              About
            </Link>
            <Link
              href="/#contact"
              onClick={closeMenu}
              tabIndex={!mobileMenuOpen ? -1 : undefined}
              className="rounded-lg px-3 py-2 text-base font-medium text-slate-800 transition hover:bg-slate-200/60 dark:text-slate-200 dark:hover:bg-white/[0.06]"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
