"use client"

import { motion } from "framer-motion"
import {
    Coffee,
    Leaf,
    Database,
    Globe,
    Layers,
    Terminal,
    Code2,
    Server,
    Cpu,
    GitBranch,
    Wrench
} from "lucide-react"
import { SkillCard } from "@/components/skill-card"
import { SkillBadge } from "@/components/skill-badge"

// Data Structure
const topSkills = [
    { name: "Java", icon: Coffee }, // Java often represented by coffee cup
    { name: "Spring Framework", icon: Leaf },
    { name: "Spring Boot", icon: Layers }, // Or Leaf/Server
    { name: "SQL / PostgreSQL", icon: Database },
    { name: "REST APIs", icon: Globe },
    { name: "OOP", icon: Code2 },
]

const skillCategories = [
    {
        title: "Backend Development",
        icon: Server,
        skills: [
            "Core Java", "Collections Framework", "Streams API", "Lambdas",
            "Exception Handling", "Multithreading", "Spring Core",
            "Dependency Injection", "Bean Lifecycle", "AOP",
            "Restful API Concepts", "Maven" // Maven also in tools, but listed here in prompt
        ]
    },
    {
        title: "Database",
        icon: Database,
        skills: [
            "PostgreSQL", "SQL (CRUD)", "Joins & Constraints",
            "Schema Design", "RDBMS Concepts"
        ]
    },
    {
        title: "Frontend & Web Basics",
        icon: Globe,
        skills: [
            "HTTP / HTTPS", "Client–Server Arch", "API Integration", "Thymeleaf"
        ]
    },
    {
        title: "Tools & Workflow",
        icon: Wrench,
        skills: [
            "IntelliJ IDEA", "Git & GitHub", "Maven",
            "Postman", "Debugging & Logging", "Linux Basics"
        ]
    }
]

export function Skills() {
    return (
        <section id="skills" className="py-24 px-4 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />

            <div className="text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary neon-text mb-6"
                >
                    Technical Expertise
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-muted-foreground text-lg max-w-2xl mx-auto"
                >
                    A comprehensive overview of my development stack, focusing on backend excellence and modern web technologies.
                </motion.p>
            </div>

            {/* Top Skills Section */}
            <div className="mb-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-8 justify-center md:justify-start"
                >
                    <div className="p-2 rounded-lg bg-primary/10">
                        <Cpu className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold">Top Skills</h3>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {topSkills.map((skill, index) => (
                        <SkillCard
                            key={skill.name}
                            index={index}
                            name={skill.name}
                            icon={skill.icon}
                        />
                    ))}
                </div>
            </div>

            {/* Categorized Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {skillCategories.map((category, catIndex) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.1, duration: 0.5 }}
                        className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-3xl p-6 md:p-8 hover:bg-card/50 transition-colors"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-secondary/10">
                                <category.icon className="w-5 h-5 text-secondary" />
                            </div>
                            <h3 className="text-xl font-semibold">{category.title}</h3>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {category.skills.map((skill, skillIndex) => (
                                <SkillBadge
                                    key={skill}
                                    name={skill}
                                    index={skillIndex}
                                />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
