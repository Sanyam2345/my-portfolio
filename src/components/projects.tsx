"use client"

import { motion } from "framer-motion"
import { ProjectCard } from "@/components/project-card"

interface Project {
    id: number
    title: string
    description: string
    tags: string
    link: string
    image: string
}

export function Projects({ projects }: { projects: Project[] }) {
    return (
        <section id="projects" className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary neon-text">
                    Featured Projects
                </h2>
            </motion.div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {projects.map((project, index) => (
                    <div key={project.id} className="break-inside-avoid shadow-lg mb-8 rounded-2xl">
                        <ProjectCard
                            index={index}
                            title={project.title}
                            description={project.description}
                            tags={project.tags ? project.tags.split(',') : []}
                            links={{ demo: project.link, code: project.link }}
                            image={project.image}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}
