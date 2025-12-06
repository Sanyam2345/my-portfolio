"use client"

import { motion } from "framer-motion"

const experiences = [
    {
        company: "Tech Giant Corp",
        role: "Senior Full Stack Developer",
        period: "2022 - Present",
        description: "Leading a team of developers to build scalable cloud solutions using Next.js and AWS."
    },
    {
        company: "Startup X",
        role: "Frontend Engineer",
        period: "2020 - 2022",
        description: "Developed and maintained the core product dashboard resulting in 200% user growth."
    },
    {
        company: "Freelance",
        role: "Web Developer",
        period: "2018 - 2020",
        description: "Delivered 20+ custom websites for clients across various industries."
    }
]

export function Experience() {
    return (
        <section id="experience" className="py-20 px-4 md:px-10 max-w-4xl mx-auto">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-3xl md:text-5xl font-bold mb-12 text-center neon-text"
            >
                Work Experience
            </motion.h2>

            <div className="relative">
                {/* Central Line with Neon Glow */}
                <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent shadow-[0_0_15px_rgba(139,92,246,0.5)]"></div>

                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className={`relative mb-12 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right md:ml-0" : "md:pl-12 md:ml-auto"}`}
                    >
                        {/* Timeline Dot */}
                        <div
                            className="absolute top-0 left-0 md:left-auto md:right-0 transform -translate-x-[5px] md:translate-x-1/2 w-5 h-5 rounded-full bg-background border-4 border-primary shadow-[0_0_20px_rgba(139,92,246,1)] z-10 hidden md:block"
                            style={{ right: index % 2 === 0 ? "-20px" : "auto", left: index % 2 !== 0 ? "-20px" : "auto" }}
                        />

                        {/* Mobile dot */}
                        <div className="absolute top-0 left-0 transform -translate-x-[5px] w-5 h-5 rounded-full bg-background border-4 border-primary shadow-[0_0_20px_rgba(139,92,246,1)] z-10 md:hidden"></div>

                        <div className="group pl-8 md:pl-0 p-8 rounded-2xl bg-card/30 border border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] hover:bg-card/50 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{exp.role}</h3>
                            <h4 className="text-lg font-medium text-primary/80 mb-2">{exp.company}</h4>
                            <span className="inline-block px-4 py-1.5 my-3 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                                {exp.period}
                            </span>
                            <p className="text-muted-foreground mt-2 leading-relaxed">{exp.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
