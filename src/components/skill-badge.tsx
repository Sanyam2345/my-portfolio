"use client"

import { motion } from "framer-motion"

interface SkillBadgeProps {
    name: string
    index: number
}

export function SkillBadge({ name, index }: SkillBadgeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary-foreground text-sm md:text-base font-medium hover:bg-secondary/20 hover:border-secondary/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all cursor-default select-none backdrop-blur-sm"
        >
            {name}
        </motion.div>
    )
}
