"use client"

import { useEffect, useState } from "react"

export function TickerBanner() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const tickerItems = [
    "REACT $95.00/HR",
    "NODE.JS $92.00/HR",
    "TYPESCRIPT $95.00/HR",
    "PYTHON $75.00/HR",
    "RUST $70.00/HR",
    "SOLIDITY $70.00/HR",
    "AWS $78.00/HR",
    "AI_INTEGRATION +20% REV",
    "FORMPIPER 100K+ CALLS/DAY",
    "BLOCKCHAIN GAS_FEES -90%",
  ]

  return (
    <div className="bg-black border-b border-green-500/30 py-2 overflow-hidden">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <span key={index} className="text-green-400 text-sm mx-8 font-mono">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
