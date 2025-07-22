"use client"

import { Github, Linkedin, Mail, Phone, MapPin, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MorphingOrb3D } from "./morphing-orb-3d"

export function Portfolio() {
  const skills = [
    { name: "TypeScript", level: 95 },
    { name: "React", level: 90 },
    { name: "Node.js", level: 92 },
    { name: "Python", level: 75 },
    { name: "Rust", level: 70 },
    { name: "Solidity", level: 70 },
  ]

  const projects = [
    {
      title: "AI iMessage Bot",
      tech: "Rust • JavaScript • OpenAI",
      desc: "Multi-AI bot with DALL-E integration",
      url: "https://github.com/bryercowan/ai-text",
      isGithub: true,
    },
    {
      title: "Robot Fight Club",
      tech: "Arduino • Computer Vision",
      desc: "Automated RC robots with Pixy camera",
      url: "https://www.youtube.com/watch?v=3KBpyYLCXUc&t=95s",
      isGithub: false,
    },
    {
      title: "Valorant Reinforcement",
      tech: "Python • Hardware Integration",
      desc: "Performance enhancement via feedback",
      url: "https://www.youtube.com/watch?v=BYr-uRUPyuU&t=65s",
      isGithub: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col lg:flex-row lg:h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile: Linear Stack / Desktop: Top Row - Header, About, and Orb Space */}
        <div className="flex flex-col lg:flex-row lg:h-1/2">
          {/* Header and About */}
          <div className="flex-1 p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 lg:mb-8">
              <div className="text-gray-900 text-3xl lg:text-4xl font-light mb-2 tracking-wide">BRYER COWAN</div>
              <div className="text-purple-400 text-lg lg:text-xl font-light mb-1">Software Engineer III</div>
              <div className="text-gray-500 text-sm font-light">Marion, US • 3+ Years Experience</div>
            </div>

            {/* About */}
            <div>
              <h2 className="text-gray-700 text-lg mb-4 border-b border-gray-200/50 pb-2 font-light">About</h2>
              <p className="text-gray-600 text-sm leading-relaxed font-light mb-4">
                Software Engineer III specializing in AI-first solutions, modern web technologies, and blockchain
                development. Led transformation at Formpiper driving 20% revenue increase through strategic AI
                integration.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm font-light max-w-md">
                <div>
                  <span className="text-gray-500">Education:</span>
                  <div className="text-blue-400">AS Engineering</div>
                </div>
                <div>
                  <span className="text-gray-500">Focus:</span>
                  <div className="text-purple-400">Full-Stack + AI</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Orb - Hidden on mobile, shown at bottom */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
            <MorphingOrb3D />
          </div>
        </div>

        {/* Bottom Row - Skills, Projects, Contact */}
        <div className="flex-1 p-6 lg:p-8 lg:pt-0 overflow-y-auto">
          <div className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-8 lg:h-full lg:space-y-0">
            {/* Skills */}
            <div>
              <h2 className="text-gray-700 text-lg mb-4 border-b border-gray-200/50 pb-2 font-light">Skills</h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1 font-light">
                      <span className="text-gray-700">{skill.name}</span>
                      <span className="text-blue-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200/50 h-1.5 rounded-full">
                      <div
                        className="bg-gradient-to-r from-blue-300 to-purple-300 h-1.5 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-gray-700 text-lg mb-4 border-b border-gray-200/50 pb-2 font-light">Projects</h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="border border-gray-200/50 p-4 hover:border-blue-200 transition-colors rounded-lg bg-white/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-gray-800 text-sm font-normal">{project.title}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 hover:border-blue-300 hover:bg-blue-50 bg-white/70 text-gray-600 hover:text-blue-600 h-6 px-2 text-xs font-light"
                        asChild
                      >
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          {project.isGithub ? <Github className="h-3 w-3" /> : <Youtube className="h-3 w-3" />}
                        </a>
                      </Button>
                    </div>
                    <div className="text-purple-400 text-xs mb-2 font-light">{project.tech}</div>
                    <p className="text-gray-600 text-xs font-light">{project.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-gray-700 text-lg mb-4 border-b border-gray-200/50 pb-2 font-light">Contact</h2>
              <div className="space-y-3 font-light">
                <a
                  href="mailto:email@bryercowan.com"
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-400 transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0 text-gray-400" />
                  <span className="text-xs">email@bryercowan.com</span>
                </a>
                <a
                  href="tel:+16418567878"
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-400 transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0 text-gray-400" />
                  <span className="text-xs">641 856-7878</span>
                </a>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-gray-400" />
                  <span className="text-xs">Marion, US</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 hover:border-blue-300 hover:bg-blue-50 bg-white/70 text-gray-600 hover:text-blue-600 h-7 px-2 text-xs font-light"
                    asChild
                  >
                    <a href="https://github.com/bryercowan" target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 hover:border-blue-300 hover:bg-blue-50 bg-white/70 text-gray-600 hover:text-blue-600 h-7 px-2 text-xs font-light"
                    asChild
                  >
                    <a
                      href="https://www.linkedin.com/in/bryer-cowan-429103229/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Orb - Mobile: At the end */}
      {/* <div className="lg:hidden h-64 flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200"> */}
      {/*   <MorphingOrb3D /> */}
      {/* </div> */}
    </div>
  )
}
