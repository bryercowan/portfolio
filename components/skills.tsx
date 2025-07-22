export function Skills() {
  const skills = [
    { name: "TypeScript", level: 95 },
    { name: "React", level: 90 },
    { name: "Node.js", level: 92 },
    { name: "Nest.js", level: 85 },
    { name: "Python", level: 75 },
    { name: "PostgreSQL", level: 80 },
    { name: "AWS", level: 78 },
    { name: "Solidity", level: 70 },
    { name: "MongoDB", level: 75 },
    { name: "Rust", level: 70 },
    { name: "JavaScript", level: 92 },
    { name: "Git", level: 88 },
  ]

  return (
    <section className="py-16 border-t border-green-500/20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-green-400 font-mono">&gt; SKILLS.DAT</h2>

          {/* ASCII Art */}
          <pre className="text-purple-400 text-xs mb-8 text-center">
            {`
    ╔══════════════════════════════════════╗
    ║           TECH STACK v3.0            ║
    ╚══════════════════════════════════════╝
`}
          </pre>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="bg-black/30 p-4 border border-green-500/20 hover:border-green-400/50 transition-all duration-300 font-mono"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                  <span className="text-sm text-green-400">[{skill.level}%]</span>
                </div>
                <div className="w-full bg-gray-800 h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-purple-500 h-2 transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
