"use client"

import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Projects() {
  const projects = [
    {
      title: "AI iMessage Bot",
      description:
        "A powerful AI-powered iMessage bot built in Rust that integrates with BlueBubbles to provide automated responses in group chats and direct messages. Features multi-AI support, dynamic character personalities, and DALL-E image generation.",
      technologies: ["Rust", "JavaScript", "OpenAI GPT-4o", "Ollama", "DALL-E", "BlueBubbles"],
      githubUrl: "https://github.com/bryercowan/ai-text",
    },
    {
      title: "Robot Fight Club",
      description:
        "Using a Pixy camera, automated RC robots in a fight club. Implemented computer vision and robotics control systems.",
      technologies: ["Arduino", "Pixy Camera", "Computer Vision"],
    },
    {
      title: "Valorant Game Reinforcement",
      description:
        "Used a Python script to set off a taser when the player is losing to make them play better. A unique approach to gaming performance enhancement.",
      technologies: ["Python", "Arduino", "Game Integration"],
    },
  ]

  return (
    <section className="py-16 bg-gray-950/50 border-t border-green-500/20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-green-400 font-mono">
            &gt; PROJECTS.EXE
          </h2>

          {/* ASCII Art */}
          <pre className="text-purple-400 text-xs mb-8 text-center">
            {`
    ┌───────────────────────────────────────┐
    │  █▀▀ █▀█ █▀▄ █▀▀   █▀█ █▀█ █▀█ ▀█▀  │
    │  █▄▄ █▄█ █▄▀ ██▄   █▀▀ █▄█ █▀▄  █   │
    └───────────────────────────────────────┘
`}
          </pre>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-black/30 p-6 border border-green-500/20 hover:border-green-400/50 transition-all duration-300 group"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors font-mono">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4 font-mono text-sm">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-green-500/20 text-green-300 text-xs border border-green-500/30 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500 hover:border-green-400 hover:bg-green-500/10 bg-transparent text-green-400 font-mono text-xs"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3 mr-1" />
                        CODE
                      </a>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-500 hover:border-purple-400 hover:bg-purple-500/10 bg-transparent text-purple-400 font-mono text-xs"
                    asChild
                  >
                    <a href="mailto:email@bryercowan.com?subject=Project Inquiry&body=I'd like to learn more about your projects...">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      INFO
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
