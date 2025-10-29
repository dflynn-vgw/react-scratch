import { useAuth } from '../context/AuthContext';

interface WelcomeProps {
  onSignOut: () => void;
}

export default function Welcome({ onSignOut }: WelcomeProps) {
  const { user } = useAuth();

  if (!user) return null;

  const getProviderDisplay = () => {
    switch (user.provider) {
      case 'email':
        return 'Email & Password';
      case 'facebook':
        return 'Facebook ▶';
      case 'google':
        return 'Google ◉';
      case 'apple':
        return 'Apple ◈';
      default:
        return user.provider;
    }
  };

  return (
    <div className="min-h-screen bg-black text-yellow-400 font-mono flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-6">
        <pre className="text-yellow-400 text-center animate-pulse">
          {`┌─────────────────────────────────────┐
│                                     │
│         AUTHENTICATION              │
│            SUCCESSFUL!              │
│                                     │
└─────────────────────────────────────┘`}
        </pre>

        <div className="border-2 border-yellow-400 p-8 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-2xl text-white font-bold">&gt; WELCOME BACK!</p>
            <p className="text-sm">&gt; System access granted</p>
          </div>

          <div className="border border-yellow-400 p-6 space-y-3 text-left">
            <div>
              <p className="text-white font-bold">&gt;&gt; USER PROFILE</p>
            </div>
            
            <div className="pl-4 space-y-2">
              <div className="flex justify-between">
                <span>&gt; EMAIL:</span>
                <span className="text-white">{user.email}</span>
              </div>
              
              <div className="flex justify-between">
                <span>&gt; AUTH METHOD:</span>
                <span className="text-white">{getProviderDisplay()}</span>
              </div>
              
              <div className="flex justify-between">
                <span>&gt; EMAIL VERIFIED:</span>
                <span className={user.emailVerified ? 'text-green-400' : 'text-red-400'}>
                  {user.emailVerified ? '✓ YES' : '✗ NO'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span>&gt; TERMS ACCEPTED:</span>
                <span className={user.termsAccepted ? 'text-green-400' : 'text-red-400'}>
                  {user.termsAccepted ? '✓ YES' : '✗ NO'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span>&gt; JOINED:</span>
                <span className="text-white">
                  {new Date(user.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="border border-yellow-400/50 p-4 bg-yellow-400/5">
            <p className="text-sm text-center">
              &gt; You have successfully completed the sign-up and authentication flow!
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <button className="w-full border-2 border-yellow-400 p-3 hover:bg-yellow-400 hover:text-black transition-colors">
              [ EXPLORE DASHBOARD ]
            </button>
            
            <button className="w-full border-2 border-yellow-400 p-3 hover:bg-yellow-400 hover:text-black transition-colors">
              [ VIEW SETTINGS ]
            </button>
            
            <button
              onClick={onSignOut}
              className="w-full border-2 border-red-500 text-red-400 p-3 hover:bg-red-500 hover:text-black transition-colors"
            >
              [ SIGN OUT ]
            </button>
          </div>
        </div>

        <div className="text-center text-sm">
          <pre className="text-yellow-400/50">
            {`╔═══════════════════════════════════════╗
║   Session Active • Security: High     ║
╚═══════════════════════════════════════╝`}
          </pre>
        </div>
      </div>
    </div>
  );
}
