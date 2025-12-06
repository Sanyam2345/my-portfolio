"use client"

import { motion } from "framer-motion"
import { type LucideIcon } from "lucide-react"

interface SkillCardProps {
    name: string
    icon: LucideIcon
    items: string[]
    index: number
}

export function SkillCard({ name, icon: Icon, items, index }: SkillCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-card/40 border border-primary/20 backdrop-blur-md hover:border-primary hover:bg-card/60 hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] transition-all group relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-4">{name}</h3>
            <ul className="space-y-2 relative z-10">
                {items.map((item) => (
                    <li key={item} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2 shadow-[0_0_5px_rgba(6,182,212,0.8)] group-hover:shadow-[0_0_10px_rgba(6,182,212,1)] transition-all"></span>
                        {item}
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}
