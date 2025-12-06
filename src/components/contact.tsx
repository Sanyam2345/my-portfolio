"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Twitter, Send, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function Contact() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (!response.ok) throw new Error("Failed to send message")

            toast.success("Message sent successfully! I'll get back to you soon.")
            setFormData({ name: "", email: "", message: "" })
        } catch (error) {
            toast.error("Something went wrong. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="contact" className="py-20 px-4 md:px-10 max-w-4xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent neon-text mb-8">
                    Let's Create Something Amazing
                </h2>
                <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
                    I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-16 space-y-4 text-left">
                    <div>
                        <input
                            type="text"
                            placeholder="Your Name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-4 rounded-xl bg-card/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Your Email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-4 rounded-xl bg-card/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="Your Message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full p-4 rounded-xl bg-card/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>

                <div className="flex justify-center gap-6 mb-16">
                    <a href="#" className="p-4 rounded-full bg-card border border-border hover:border-primary hover:text-primary hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all">
                        <Github className="w-6 h-6" />
                    </a>
                    <a href="#" className="p-4 rounded-full bg-card border border-border hover:border-secondary hover:text-secondary hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a href="#" className="p-4 rounded-full bg-card border border-border hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] transition-all">
                        <Twitter className="w-6 h-6" />
                    </a>
                    <a href="mailto:hello@example.com" className="p-4 rounded-full bg-card border border-border hover:border-white hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
                        <Mail className="w-6 h-6" />
                    </a>
                </div>
            </motion.div>

            <footer className="mt-20 text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Sanyam. Built with Next.js, Tailwind & Three.js.</p>
            </footer>
        </section>
    )
}
