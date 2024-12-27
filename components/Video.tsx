import React, { memo } from 'react'

interface VideoProps {
    src: string
}

const Video: React.FC<VideoProps> = memo(({ src }) => {
    return (
        <video
            preload="auto"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
        >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
})

Video.displayName = 'Video'

export default Video

