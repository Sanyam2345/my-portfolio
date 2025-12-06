"use client"

import { motion } from "framer-motion"

export function About() {
    return (
        <section id="about" className="py-20 px-4 md:px-10 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-card/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-[0_0_20px_rgba(139,92,246,0.1)]"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary neon-text">
                    About Me
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    My internship at <span className="text-primary font-semibold">Cognifyz Technologies</span> was a pivotal experience where our team contributed to robust software solutions, enhancing my skills in C++ and Object-Oriented Programming. This role allowed me to apply my academic knowledge from Uttarakhand Technical University, where I study Computer Science, to real-world tech challenges.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                    With certifications in both <span className="text-secondary">Python Programming</span> and <span className="text-secondary">Data Structures</span>, my commitment extends to being a dynamic part of a team where collaboration and innovation are at the forefront. The goal is not just personal growth but also contributing to impactful technology projects that resonate with my dedication to the field.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mt-4">
                    📍 Based in <strong>Dehradun, Uttarakhand, India</strong>.
                </p>
            </motion.div>
        </section>
    )
}
