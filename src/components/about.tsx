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
                    I am a passionate <span className="text-primary font-semibold">Java Developer</span> containing a strong foundation in software engineering principles.
                    With a deep love for technology and innovation, I enjoy solving complex problems and building efficient, scalable solutions.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                    Beyond coding, I am a tech enthusiast who loves exploring the latest trends in AI, web development, and cloud computing.
                    I believe in continuous learning and applying my skills to create impactful digital experiences.
                </p>
            </motion.div>
        </section>
    )
}
