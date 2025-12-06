"use client"

import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"

export function Education() {
    return (
        <section id="education" className="py-20 px-4 md:px-10 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
            >
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary neon-text flex items-center justify-center gap-4">
                    <GraduationCap className="w-10 h-10 text-secondary" /> Education
                </h2>
            </motion.div>

            <div className="relative border-l-2 border-primary/30 ml-4 md:ml-10 space-y-12">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative pl-8"
                >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>

                    <h3 className="text-xl font-bold text-foreground">Bachelor of Technology - BTech</h3>
                    <h4 className="text-lg text-primary mt-1">Computer Science</h4>
                    <p className="text-muted-foreground mt-2">Uttarakhand Technical University | January 2023 - June 2027</p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Relevant Coursework: Data Structures, Algorithms, Object-Oriented Programming, C++, Python.
                        <br />
                        <span className="font-semibold text-primary">Certifications:</span> Learn Java Programming (Beginner to Master), Fundamental of Python Programming, Data Structure.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
