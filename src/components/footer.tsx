"use client"

export function Footer() {
    return (
        <footer className="py-8 text-center text-sm text-muted-foreground border-t border-white/5 bg-background/50 backdrop-blur-sm">
            <p>© {new Date().getFullYear()} Sanyam Gairola. All rights reserved.</p>
            <p className="mt-2 text-xs">Built with Next.js, Tailwind CSS & Three.js</p>
        </footer>
    )
}
