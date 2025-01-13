import { Github, Linkedin, Mail, FileDown, Globe } from 'lucide-react';
import './styles/terminal.css';
import { Terminal } from './components/Terminal';
import { VideoFeed } from './components/VideoFeed';
import { useEffect, useState } from 'react';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-black/30 backdrop-blur-sm p-4 flex flex-col">
        <div className="text-center mb-8 p-4">
          <h1 className="text-2xl text-yellow-500 font-bold mb-4">Welcome to My Terminal Portfolio</h1>
          <p className="text-white/90 mb-6">
            For the best experience, please visit this site on a desktop computer.
            The interactive terminal interface is optimized for larger screens.
          </p>
          <div className="inline-block border border-yellow-500/30 rounded p-4 bg-black/20">
            <p className="text-yellow-500 text-sm">Quick Links Available Below</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <a href="https://github.com/bryercowan" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-black/20 rounded border border-white/10 text-white hover:bg-white/5 transition-colors">
            <Github size={24} className="text-yellow-500" />
            <span>GitHub Profile</span>
          </a>

          <a href="https://linkedin.com/in/bryer-cowan" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-black/20 rounded border border-white/10 text-white hover:bg-white/5 transition-colors">
            <Linkedin size={24} className="text-yellow-500" />
            <span>LinkedIn Profile</span>
          </a>

          <a href="mailto:email@bryercowan.com"
            className="flex items-center gap-3 p-4 bg-black/20 rounded border border-white/10 text-white hover:bg-white/5 transition-colors">
            <Mail size={24} className="text-yellow-500" />
            <span>Send Email</span>
          </a>

          <a href="/resume.pdf" download
            className="flex items-center gap-3 p-4 bg-black/20 rounded border border-white/10 text-white hover:bg-white/5 transition-colors">
            <FileDown size={24} className="text-yellow-500" />
            <span>Download Resume</span>
          </a>

          <a href="https://bryercowan.com" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-black/20 rounded border border-white/10 text-white hover:bg-white/5 transition-colors">
            <Globe size={24} className="text-yellow-500" />
            <span>Portfolio Website</span>
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="layout">
      <div className="pane terminal-pane">
        <Terminal />
      </div>
      <div className="pane-container">
        <div className="pane chart-pane">
          <VideoFeed videoUrl="https://tangerine-scone-1ac757.netlify.app/compressed_video.mp4" />
        </div>
        <div className="pane menu-pane">
          <div className="menu-header">Quick Actions</div>
          <div className="menu-items">
            <a href="https://github.com/bryercowan" target="_blank" rel="noopener noreferrer" className="menu-item">
              <Github size={20} className="text-yellow-500" />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/bryer-cowan" target="_blank" rel="noopener noreferrer" className="menu-item">
              <Linkedin size={20} className="text-yellow-500" />
              <span>LinkedIn</span>
            </a>
            <a href="mailto:email@bryercowan.com" className="menu-item">
              <Mail size={20} className="text-yellow-500" />
              <span>Email</span>
            </a>
            <a href="/bryercowan-swe-resume.pdf" download className="menu-item">
              <FileDown size={20} className="text-yellow-500" />
              <span>Resume</span>
            </a>
            <a href="https://bryercowan.com" target="_blank" rel="noopener noreferrer" className="menu-item">
              <Globe size={20} className="text-yellow-500" />
              <span>Website</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
