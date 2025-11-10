'use client'

import { ContainerTextFlip } from '@/components/ui/container-text-flip'

const words = [
  'equipment.',
  'solutions.',
  'technology.',
  'innovation.',
  'support.'
]

export default function AnimatedWord() {
  return (
    <div className="inline-block min-w-[250px] md:min-w-[350px] lg:min-w-[400px] text-left">
      <ContainerTextFlip 
        words={words} 
        interval={3000}
        className="!bg-transparent !shadow-none !px-4 !py-3 !text-center !flex !justify-center !border !border-[#FF6B35]/30 !rounded-lg !overflow-visible"
        textClassName="text-[#FF6B35] font-bold !text-[2.5rem] md:!text-[3.5rem] lg:!text-[4rem] !leading-tight"
        animationDuration={700}
      />
    </div>
  )
}
