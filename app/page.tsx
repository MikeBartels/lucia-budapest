'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { getTimeRemaining } from '@/utils/dateUtils'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import pictureTogether from "../public/Scherm­afbeelding 2024-12-24 om 14.24.43.png"
import { redirect } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BudapestQuiz } from '@/components/BudapestQuiz'
import { HeartAnimation } from '@/components/HeartAnimation'
import Video from '@/components/Video'

const TimeDisplay = React.memo(({ timeRemaining }: { timeRemaining: ReturnType<typeof getTimeRemaining> }) => (
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
))

TimeDisplay.displayName = 'TimeDisplay'

export default function Home() {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining())
  const [heartClicks, setHeartClicks] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [keySequence, setKeySequence] = useState('')
  const [showTooltip, setShowTooltip] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [typedKeys, setTypedKeys] = useState('')
  const [showHeartAnimation, setShowHeartAnimation] = useState(false)
  console.log(heartClicks)
  console.log(keySequence)
  console.log(typedKeys)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleHeartClick = useCallback(() => {
    setHeartClicks(prev => {
      const newCount = prev + 1
      if (newCount === 3) {
        setShowEasterEgg(true)
        return 0
      }
      return newCount
    })
  }, [])

  const playTune = useCallback(async () => {
    redirect("https://www.youtube.com/watch?v=VHrLPs3_1Fs&ab_channel=GeorgeEzraVEVO")
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      setKeySequence(prev => {
        const newSequence = (prev + event.key).slice(-3).toUpperCase()
        if (newSequence === 'BUD') {
          playTune()
        }
        return newSequence
      })

      setTypedKeys(prev => {
        const newTyped = (prev + event.key).slice(-4).toLowerCase()
        if (newTyped === 'love') {
          setShowHeartAnimation(true)
          setTimeout(() => setShowHeartAnimation(false), 3000) // Hide animation after 3 seconds
          return ''
        }
        if (newTyped === 'quiz') {
          setShowQuiz(true)
          return ''
        }
        return newTyped
      })
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [playTune])

  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl overflow-hidden">
          <div className="relative w-full h-64">
            <Video src="/Budapest in 4K.mp4" />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Budapest Trip Countdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <TimeDisplay timeRemaining={timeRemaining} />
              <p className="text-xl mb-4">
                until we go to Budapest bb
                <TooltipProvider>
                  <Tooltip open={showTooltip}>
                    <TooltipTrigger asChild>
                    <span
                        className="cursor-pointer transition-transform hover:scale-125 inline-block ml-1"
                        onClick={handleHeartClick}
                        onMouseEnter={() => {
                          const timer = setTimeout(() => setShowTooltip(true), 1000)
                          return () => clearTimeout(timer)
                        }}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                      ❤️
                    </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>I can&apos;t wait to explore with you my love❤️!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span
                    className="cursor-pointer text-transparent hover:text-black transition-colors duration-300"
                    aria-label="Hidden Budapest Quiz trigger"
                >
                !
              </span>
              </p>
            </div>
            {showEasterEgg && (
                <div className="mt-4 text-center">
                  <p className="text-lg mb-2">I Love u</p>
                  <div className="relative w-full">
                    <Image
                        src={pictureTogether}
                        alt="Easter Egg Image"
                        className="object-cover rounded-lg"
                    />
                  </div>
                </div>
            )}
          </CardContent>
        </Card>
        <BudapestQuiz isOpen={showQuiz} onClose={() => setShowQuiz(false)} />
        {showHeartAnimation && <HeartAnimation />}
      </div>
  )
}

