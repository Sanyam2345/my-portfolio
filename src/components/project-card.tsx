"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

interface ProjectCardProps {
    title: string
    description: string
    tags: string[]
    links: { demo: string; code: string }
    index: number
    image?: string
}

export function ProjectCard({ title, description, tags, links, index, image }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] flex flex-col h-full"
        >
            <div className="h-48 relative overflow-hidden group-hover:scale-105 transition-transform duration-500 bg-muted">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black relative">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white/5 opacity-50 group-hover:opacity-100 transition-opacity">
                            {title[0]}
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4">
                    <a href={links.code} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors">
                        <Github className="w-4 h-4" /> Code
                    </a>
                    <a href={links.demo} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                </div>
            </div>
        </motion.div>
    )
}
