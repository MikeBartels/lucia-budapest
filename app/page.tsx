"use client"
import { useState, useEffect } from 'react'
import { getTimeRemaining } from '@/utils/dateUtils'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"


export default function Home() {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining())
    }, 1000) // Update every second

    return () => clearInterval(timer)
  }, [])

  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl overflow-hidden">
          <div className="relative w-full h-64">
            <Image
                src="https://images.unsplash.com/photo-1500078974918-738828bc0422?q=80&w=2831&auto=format&fit=crop"
                alt="Budapest Parliament Building at sunset"
                fill
                className="object-cover"
                priority
            />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Budapest Trip Countdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold tabular-nums">{timeRemaining.days}</span>
                  <span className="text-sm text-gray-500">days</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold tabular-nums">{timeRemaining.hours.toString().padStart(2, '0')}</span>
                  <span className="text-sm text-gray-500">hours</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold tabular-nums">{timeRemaining.minutes.toString().padStart(2, '0')}</span>
                  <span className="text-sm text-gray-500">minutes</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold tabular-nums">{timeRemaining.seconds.toString().padStart(2, '0')}</span>
                  <span className="text-sm text-gray-500">seconds</span>
                </div>
              </div>
              <p className="text-xl mb-4">until we go to Budapest bb❤️!</p>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
