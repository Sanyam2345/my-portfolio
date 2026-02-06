"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const navItems = [
    { name: "Home", href: "#" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
]

export function Navbar() {
    const [scrolled, setScrolled] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 transition-all duration-300",
                scrolled ? "bg-background/80 backdrop-blur-md shadow-md border-b border-white/10" : "bg-transparent"
            )}
        >
            <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary neon-text z-50 relative">
                Sanyam
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors hover:shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
                <a href="/resume.pdf" target="_blank" className="px-4 py-2 rounded-full border border-primary/50 hover:bg-primary/10 transition-all text-sm">
                    Resume
                </a>
            </div>

            {/* Mobile Toggle */}
            <button
                className="md:hidden z-50 p-2 text-foreground"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="space-y-1.5 w-6">
                    <span className={cn("block w-full h-0.5 bg-current transition-transform duration-300", isOpen && "rotate-45 translate-y-2")} />
                    <span className={cn("block w-full h-0.5 bg-current transition-opacity duration-300", isOpen && "opacity-0")} />
                    <span className={cn("block w-full h-0.5 bg-current transition-transform duration-300", isOpen && "-rotate-45 -translate-y-2")} />
                </div>
            </button>

            {/* Mobile Menu Overlay */}
            <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? "0%" : "100%" }}
                transition={{ duration: 0.3 }}
                className={cn(
                    "fixed inset-0 bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 z-40 md:hidden",
                    !isOpen && "pointer-events-none"
                )}
            >
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-2xl font-bold text-foreground/80 hover:text-primary transition-colors hover:scale-110"
                    >
                        {item.name}
                    </Link>
                ))}
                <a
                    href="/resume.pdf"
                    target="_blank"
                    className="px-8 py-3 rounded-full border border-primary/50 hover:bg-primary/10 transition-all text-xl mt-4"
                >
                    Resume
                </a>
            </motion.div>
        </motion.nav>
    )
}
