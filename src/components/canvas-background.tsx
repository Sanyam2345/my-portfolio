"use client"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm"
import { useTheme } from "next-themes"

function StarField(props: any) {
    const ref = useRef<any>(null)
    // @ts-ignore
    const [sphere] = useState(() => (random as any).inSphere(new Float32Array(6000), { radius: 1.5 }))

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10
            ref.current.rotation.y -= delta / 15
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#8b5cf6" // Purple
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}

export function CanvasBackground() {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    return (
        <div className="absolute inset-0 -z-10 w-full h-full bg-slate-900 dark:bg-[#030014] transition-colors duration-500">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <StarField />
            </Canvas>
        </div>
    )
}
