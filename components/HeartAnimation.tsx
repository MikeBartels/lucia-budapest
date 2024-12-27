'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Heart = ({ delay }: { delay: number }) => (
    <motion.div
        className="absolute text-6xl"
        initial={{ y: '100%', opacity: 0, scale: 0.5 }}
        animate={{
            y: '-100vh',
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
            rotate: [0, 10, -10, 0],
        }}
        transition={{
            duration: 5,
            delay,
            ease: 'easeOut',
        }}
        style={{
            left: `${Math.random() * 100}%`,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))',
        }}
    >
        ❤️
    </motion.div>
)

export const HeartAnimation = () => {
    const [hearts, setHearts] = useState<number[]>([])

    useEffect(() => {
        const numHearts = 30 // Increased number of hearts
        setHearts(Array.from({ length: numHearts }, (_, i) => i))
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {hearts.map((_, index) => (
                <Heart key={index} delay={index * 0.1} />
            ))}
        </div>
    )
}

