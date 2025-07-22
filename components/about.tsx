export function About() {
  return (
    <section className="py-16 bg-gray-950/50 border-t border-green-500/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-green-400 font-mono">&gt; ABOUT.SYS</h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6 font-mono">
                I'm a passionate Software Engineer III with over 3 years of experience in delivering cutting-edge
                solutions. I specialize in modern web technologies, AI integration, and blockchain development.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6 font-mono">
                At Formpiper, I've led the transformation into an AI-first company, driving a 20% revenue increase
                through strategic AI integration across sales, engineering, and customer support.
              </p>

              {/* ASCII Art */}
              <pre className="text-green-500 text-xs mb-4">
                {`
    ┌─────────────────────┐
    │   SYSTEM STATUS     │
    ├─────────────────────┤
    │ AI Integration: ✓   │
    │ Revenue Impact: +20%│
    │ Clients Managed: 90+│
    │ API Calls: 100K+/day│
    └─────────────────────┘
`}
              </pre>
            </div>

            <div className="space-y-4">
              <div className="bg-black/50 p-4 border border-green-500/30 font-mono">
                <h3 className="text-lg font-semibold mb-2 text-purple-400">&gt; LOCATION</h3>
                <p className="text-gray-300">Marion, US, 52302</p>
              </div>
              <div className="bg-black/50 p-4 border border-green-500/30 font-mono">
                <h3 className="text-lg font-semibold mb-2 text-purple-400">&gt; EXPERIENCE</h3>
                <p className="text-gray-300">3+ Years in Software Development</p>
              </div>
              <div className="bg-black/50 p-4 border border-green-500/30 font-mono">
                <h3 className="text-lg font-semibold mb-2 text-purple-400">&gt; EDUCATION</h3>
                <p className="text-gray-300">Associate of Science in Engineering</p>
                <p className="text-sm text-gray-400">Indian Hills Community College</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
