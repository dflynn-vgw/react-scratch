import { useState } from 'react';

type Page = 'home' | 'content' | 'about';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="space-y-4">
            <pre className="text-yellow-400 text-xl">
{`
 ░██╗░░░░░░░██╗███████╗██╗░░░░░░█████╗░░█████╗░███╗░░░███╗███████╗
 ░██║░░██╗░░██║██╔════╝██║░░░░░██╔══██╗██╔══██╗████╗░████║██╔════╝
 ░╚██╗████╗██╔╝█████╗░░██║░░░░░██║░░╚═╝██║░░██║██╔████╔██║█████╗░░
 ░░████╔═████║░██╔══╝░░██║░░░░░██║░░██╗██║░░██║██║╚██╔╝██║██╔══╝░░
 ░░╚██╔╝░╚██╔╝░███████╗███████╗╚█████╔╝╚█████╔╝██║░╚═╝░██║███████╗
 ░░░╚═╝░░░╚═╝░░╚══════╝╚══════╝░╚════╝░░╚════╝░╚═╝░░░░░╚═╝╚══════╝
`}
            </pre>
            <p className="text-yellow-400">
              &gt; System initialized...
              <br />
              &gt; Ready for input_
            </p>
          </div>
        );
      case 'content':
        return (
          <div className="space-y-4 text-left">
            <pre className="text-yellow-400">
{`┌─────────────────────────────────────┐
│  CONTENT DIRECTORY                  │
└─────────────────────────────────────┘`}
            </pre>
            <div className="text-yellow-400 space-y-2">
              <p>&gt; [001] Project Alpha</p>
              <p>&gt; [002] Project Beta</p>
              <p>&gt; [003] Project Gamma</p>
              <p className="mt-4">&gt; _</p>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-4 text-left">
            <pre className="text-yellow-400">
{`┌─────────────────────────────────────┐
│  SYSTEM INFO                        │
└─────────────────────────────────────┘`}
            </pre>
            <div className="text-yellow-400 space-y-2">
              <p>&gt; Version: 1.0.0</p>
              <p>&gt; Built with: React + TypeScript</p>
              <p>&gt; Status: ONLINE</p>
              <p className="mt-4">&gt; _</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-yellow-400 font-mono flex flex-col">
      {/* Top Nav */}
      <nav className="border-b-2 border-yellow-400 p-4">
        <div className="max-w-2xl mx-auto">
          <pre className="text-center">
{`╔═══════════════════════════════════════╗
║   [ ${currentPage === 'home' ? '▓' : '░'}HOME${currentPage === 'home' ? '▓' : '░'}  |  ${currentPage === 'content' ? '▓' : '░'}CONTENT${currentPage === 'content' ? '▓' : '░'}  |  ${currentPage === 'about' ? '▓' : '░'}ABOUT${currentPage === 'about' ? '▓' : '░'} ]   ║
╚═══════════════════════════════════════╝`}
          </pre>
          <div className="flex justify-center gap-8 mt-2">
            <button
              onClick={() => setCurrentPage('home')}
              className="hover:bg-yellow-400 hover:text-black px-2 transition-colors"
            >
              HOME
            </button>
            <span>|</span>
            <button
              onClick={() => setCurrentPage('content')}
              className="hover:bg-yellow-400 hover:text-black px-2 transition-colors"
            >
              CONTENT
            </button>
            <span>|</span>
            <button
              onClick={() => setCurrentPage('about')}
              className="hover:bg-yellow-400 hover:text-black px-2 transition-colors"
            >
              ABOUT
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center">{renderContent()}</div>
      </main>

      {/* Bottom Nav */}
      <footer className="border-t-2 border-yellow-400 p-4">
        <div className="max-w-2xl mx-auto text-center">
          <pre>
{`╔═══════════════════════════════════════╗
║  [ESC] Exit  [F1] Help  [←→] Navigate ║
╚═══════════════════════════════════════╝`}
          </pre>
          <p className="mt-2 text-sm">&copy; 2025 RETRO.SYS v1.0</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
