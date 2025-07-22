import { Calendar, MapPin } from "lucide-react"

export function Experience() {
  const experiences = [
    {
      title: "Software Engineer III",
      company: "Formpiper",
      location: "Remote",
      period: "Jun 2022 - Present",
      description: [
        "Leveraged modern technologies like React, Redux, and TypeScript to develop and deploy efficient user interfaces, including landing pages, dashboards, and web applications used by over 5000 brick and mortar stores.",
        "Architected robust API integrations and server-side applications by utilizing Node, Nest, and Typescript, guaranteeing seamless data transmission and optimizing system performance processing over 100000 calls daily.",
        "Championed daily client engagement across 90 clients to assess project sustainability, gather continuous feedback, and swiftly address concerns.",
        "Led the transformation into an AI-first company by fully integrating AI into sales, engineering, and customer support, driving an immediate 20% revenue increase.",
      ],
    },
    {
      title: "Founding Engineer",
      company: "Dici AI",
      location: "Remote",
      period: "Mar 2023 - Oct 2023",
      description: [
        "Integrated AI workflows enhancing team capabilities and efficiency.",
        "Developed Next.js frontend for seamless user management and data control.",
        "Facilitated strategic discussions leading to successful acquisition.",
      ],
    },
    {
      title: "Solidity Developer",
      company: "ARSOME Technology",
      location: "Remote",
      period: "Jan 2022 - May 2022",
      description: [
        "Architected strategic optimizations for smart contracts, championing the transition to ERC721A standard reducing gas fees by up to 90%.",
        "Played a key role in diverse development initiatives, crafting resilient code in Solidity, JavaScript, and C# to address a spectrum of blockchain challenges.",
        "Created a method to deploy contracts through mobile wallets, one of the first in the industry, that allowed for easier contract deployment and management.",
      ],
    },
  ]

  return (
    <section className="py-24 bg-gray-950/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Experience
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-gray-900/30 p-8 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                    <h4 className="text-xl text-blue-400 mb-2">{exp.company}</h4>
                  </div>
                  <div className="flex flex-col md:items-end text-sm text-gray-400">
                    <div className="flex items-center mb-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      {exp.period}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-gray-300 leading-relaxed flex items-start">
                      <span className="text-blue-400 mr-3 mt-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
