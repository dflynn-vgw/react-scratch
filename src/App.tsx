import { useState } from 'react';

type Page = 'home' | 'content' | 'about';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const getButtonClass = (page: string) => {
    const base = 'px-2 transition-colors';
    const active = 'bg-yellow-400 text-black';
    const inactive = 'hover:bg-yellow-400 hover:text-black';

    return `${base} ${currentPage === page ? active : inactive}`;
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="space-y-4 text-left">
            <pre className="text-yellow-400">
              {`  ┌─────────────────────────────────────┐
  │  WELCOME                            │
  └─────────────────────────────────────┘`}
            </pre>
            <div className="text-yellow-400 space-y-2">
              <p>&gt; System initialized...</p>
              <p>&gt; Ready for input</p>
              <p className="mt-4">&gt; _</p>
            </div>
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
          <div className="flex justify-center gap-8 mt-2">
            <button
              onClick={() => setCurrentPage('home')}
              className={getButtonClass('home')}
            >
              HOME
            </button>
            <span>|</span>
            <button
              onClick={() => setCurrentPage('content')}
              className={getButtonClass('content')}
            >
              CONTENT
            </button>
            <span>|</span>
            <button
              onClick={() => setCurrentPage('about')}
              className={getButtonClass('about')}
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
