"use client"

import { motion } from "framer-motion"
import { Code2, Database, Globe, Layout, Server, Smartphone, Terminal } from "lucide-react"
import { SkillCard } from "@/components/skill-card"

const skills = [
    { name: "Top Skills", icon: Layout, items: ["Tailwind CSS", "CSS", "HTML"] },
    { name: "Core", icon: Terminal, items: ["Java", "C++", "Python", "DSA", "OOP"] },
    { name: "Frontend", icon: Globe, items: ["React", "Next.js", "Javascript", "Typescript"] },
    { name: "Backend", icon: Server, items: ["Node.js", "Express", "PostgreSQL", "SQL"] },
]

export function Skills() {
    return (
        <section id="skills" className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary neon-text">
                    Technical Arsenal
                </h2>
                <p className="mt-4 text-muted-foreground">The tools I use to create the extraordinary.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skills.map((skill, index) => (
                    <SkillCard
                        key={skill.name}
                        index={index}
                        name={skill.name}
                        icon={skill.icon}
                        items={skill.items}
                    />
                ))}
            </div>
        </section>
    )
}
