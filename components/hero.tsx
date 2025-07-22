import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
        {/* ASCII Art Header */}
        <pre className="text-green-500 text-xs mb-8 overflow-x-auto">
          {`
██████╗ ██████╗ ██╗   ██╗███████╗██████╗      ██████╗ ██████╗ ██╗    ██╗ █████╗ ███╗   ██╗
██╔══██╗██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗    ██╔════╝██╔═══██╗██║    ██║██╔══██╗████╗  ██║
██████╔╝██████╔╝ ╚████╔╝ █████╗  ██████╔╝    ██║     ██║   ██║██║ █╗ ██║███████║██╔██╗ ██║
██╔══██╗██╔══██╗  ╚██╔╝  ██╔══╝  ██╔══██╗    ██║     ██║   ██║██║███╗██║██╔══██║██║╚██╗██║
██████╔╝██║  ██║   ██║   ███████╗██║  ██║    ╚██████╗╚██████╔╝╚███╔███╔╝██║  ██║██║ ╚████║
╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝     ╚═════╝ ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═══╝
`}
        </pre>

        <h2 className="text-2xl md:text-3xl text-purple-400 mb-6 font-mono">Software Engineer III</h2>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-mono">
          Delivering cutting-edge solutions through expertise in modern web technologies, AI integration, and blockchain
          development. 3+ years of driving technological innovation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-black px-8 py-3 font-mono transition-all duration-300 hover:scale-105"
            asChild
          >
            <a href="mailto:email@bryercowan.com">
              <Mail className="mr-2 h-5 w-5" />
              CONTACT.EXE
            </a>
          </Button>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="icon"
              className="border-green-500 hover:border-green-400 hover:bg-green-500/10 bg-transparent text-green-400"
              asChild
            >
              <a href="https://github.com/bryercowan" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-green-500 hover:border-green-400 hover:bg-green-500/10 bg-transparent text-green-400"
              asChild
            >
              <a href="https://www.linkedin.com/in/bryer-cowan-429103229/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 mx-auto text-green-400" />
        </div>
      </div>
    </section>
  )
}
