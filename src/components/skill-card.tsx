"use client"

import { motion } from "framer-motion"
import { type LucideIcon } from "lucide-react"

interface SkillCardProps {
    name: string
    icon: LucideIcon
    description?: string // Optional short text to add more context if needed
    index: number
}

export function SkillCard({ name, icon: Icon, index }: SkillCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group relative p-6 rounded-2xl bg-card border border-primary/10 hover:border-primary/50 transition-all duration-300 h-full flex flex-col justify-between overflow-hidden hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{name}</h3>
            </div>

            {/* Decorative small element */}
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-all" />
        </motion.div>
    )
}
