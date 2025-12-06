import Link from "next/link"

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-center px-4 overflow-hidden relative">
            {/* Background Glitch Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0"></div>

            <div className="relative z-10">
                <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-pulse neon-text">
                    404
                </h1>
                <h2 className="text-2xl md:text-4xl font-bold mt-4 mb-8 text-white">
                    System Interface Offline
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-12 text-lg">
                    The page you are looking for has been moved to another dimension or dissolved into the digital void.
                </p>

                <Link
                    href="/"
                    className="px-8 py-4 rounded-full bg-primary text-white font-bold shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:scale-105 transition-all duration-300"
                >
                    Return to Base
                </Link>
            </div>
        </div>
    )
}
