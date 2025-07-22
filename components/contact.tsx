import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Contact() {
  return (
    <section className="py-16 border-t border-green-500/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-green-400 font-mono">&gt; CONTACT.BAT</h2>

          {/* ASCII Art */}
          <pre className="text-purple-400 text-xs mb-8">
            {`
    ╔════════════════════════════════════════╗
    ║  █▀▀ █▀█ █▄█ █▄█ █▀▀ █▀▀ ▀█▀ █ █▀█ █▄█  ║
    ║  █▄▄ █▄█ █▀█ █▀█ ██▄ █▄▄  █  █ █▄█ █▀█  ║
    ╚════════════════════════════════════════╝
`}
          </pre>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-mono">
            Ready to build something amazing together? Let's connect and discuss your next project.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <a
              href="mailto:email@bryercowan.com"
              className="bg-black/30 p-4 border border-green-500/20 hover:border-green-400/50 transition-all duration-300 block font-mono"
            >
              <Mail className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-white mb-1">EMAIL</h3>
              <p className="text-gray-300 text-sm">email@bryercowan.com</p>
            </a>

            <a
              href="tel:+16418567878"
              className="bg-black/30 p-4 border border-green-500/20 hover:border-green-400/50 transition-all duration-300 block font-mono"
            >
              <Phone className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-white mb-1">PHONE</h3>
              <p className="text-gray-300 text-sm">641 856-7878</p>
            </a>

            <div className="bg-black/30 p-4 border border-green-500/20 hover:border-green-400/50 transition-all duration-300 font-mono">
              <MapPin className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-white mb-1">LOCATION</h3>
              <p className="text-gray-300 text-sm">Marion, US</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-black px-8 py-3 font-mono transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="mailto:email@bryercowan.com?subject=Portfolio Contact&body=Hi Bryer, I'd like to discuss...">
                <Mail className="mr-2 h-5 w-5" />
                SEND_MESSAGE
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
        </div>
      </div>
    </section>
  )
}
