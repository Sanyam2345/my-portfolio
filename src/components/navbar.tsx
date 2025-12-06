"use client"

import * as React from "react"
import { motion } from "framer-motion"
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
            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary neon-text">
                Sanyam
            </div>

            <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors hover:shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                    >
                        {item.name}
                    </a>
                ))}
            </div>

            <div className="flex items-center gap-4">
                {/* Theme Toggle is fixed but we can put a clone or just keep the fixed one. 
             The fixed one in ThemeToggle is nice, leaving it there. 
             Maybe add a resume button here? 
         */}
                <a href="/resume.pdf" target="_blank" className="hidden sm:block px-4 py-2 rounded-full border border-primary/50 hover:bg-primary/10 transition-all text-sm">
                    Resume
                </a>
            </div>
        </motion.nav>
    )
}
