"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const CanvasBackground = dynamic(() => import("@/components/canvas-background").then(mod => mod.CanvasBackground), {
    ssr: false,
})

export function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-center">
            <CanvasBackground />

            <div className="z-10 flex flex-col items-center gap-8 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                    className="relative group"
                >
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-75 blur-2xl group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl ring-1 ring-white/20">
                        <Image
                            src="/pp.jpeg"
                            alt="Profile"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            priority
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="flex flex-col gap-4 items-center"
                >
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 drop-shadow-sm">
                        Sanyam Gairola
                    </h1>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent my-2" />
                    <p className="text-xl sm:text-3xl font-light text-gray-300 dark:text-gray-200 max-w-4xl mx-auto tracking-wide">
                        Java Developer <span className="text-gray-600 dark:text-gray-500 px-2">//</span> <span className="text-primary font-medium neon-text">Completed Internship @ Cognifyz Technologies (July 2024)</span>
                        <br className="my-2" />
                        <span className="text-base sm:text-xl text-muted-foreground mt-2 block">C++ | DSA | OOP | Tech Enthusiast</span>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex gap-4 mt-8"
                >
                    <Link
                        href="#projects"
                        className="px-8 py-4 rounded-full bg-primary text-white font-bold tracking-wide shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.7)] hover:scale-105 transition-all duration-300"
                    >
                        View Work
                    </Link>
                    <Link
                        href="#contact"
                        className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                    >
                        Contact Me
                    </Link>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground/50"
            >
                <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
                    <div className="w-1 h-2 bg-current rounded-full animate-scroll" />
                </div>
            </motion.div>
        </section>
    )
}
