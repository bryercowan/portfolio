"use client"

import { useEffect, useRef } from "react"

export function NetworkVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)

    const nodes: Array<{ x: number; y: number; vx: number; vy: number; connections: number[] }> = []
    const nodeCount = 50

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
      })
    }

    // Create connections
    nodes.forEach((node, i) => {
      const connectionCount = Math.floor(Math.random() * 4) + 1
      for (let j = 0; j < connectionCount; j++) {
        const targetIndex = Math.floor(Math.random() * nodeCount)
        if (targetIndex !== i && !node.connections.includes(targetIndex)) {
          node.connections.push(targetIndex)
        }
      }
    })

    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.offsetWidth) node.vx *= -1
        if (node.y <= 0 || node.y >= canvas.offsetHeight) node.vy *= -1

        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.offsetWidth, node.x))
        node.y = Math.max(0, Math.min(canvas.offsetHeight, node.y))

        // Draw connections
        node.connections.forEach((targetIndex) => {
          const target = nodes[targetIndex]
          const distance = Math.sqrt((node.x - target.x) ** 2 + (node.y - target.y) ** 2)

          if (distance < 150) {
            const opacity = 1 - distance / 150
            ctx.strokeStyle = `rgba(34, 197, 94, ${opacity * 0.3})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(target.x, target.y)
            ctx.stroke()
          }
        })

        // Draw node
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 4)
        gradient.addColorStop(0, "#22c55e")
        gradient.addColorStop(0.5, "#a855f7")
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
}
