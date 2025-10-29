import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface SignInProps {
  onSignInSuccess: (needsTerms: boolean) => void;
  onSwitchToSignUp: () => void;
}

export default function SignIn({ onSignInSuccess, onSwitchToSignUp }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const needsTerms = await signIn(email, password);
      onSignInSuccess(needsTerms);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-yellow-400 font-mono flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-6">
        <pre className="text-yellow-400 text-center">
          {`┌─────────────────────────────────────┐
│            SIGN IN / LOGIN          │
└─────────────────────────────────────┘`}
        </pre>

        <div className="border-2 border-yellow-400 p-6 space-y-6">
          {error && (
            <div className="border border-red-500 bg-red-950/30 p-2 text-red-400">
              &gt; ERROR: {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="text-left space-y-2">
              <label className="block">&gt; EMAIL:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-yellow-400 p-2 text-yellow-400 focus:outline-none focus:border-white"
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <div className="text-left space-y-2">
              <label className="block">&gt; PASSWORD:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-yellow-400 p-2 text-yellow-400 focus:outline-none focus:border-white"
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-400 text-black p-2 hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '[ AUTHENTICATING... ]' : '[ SIGN IN ]'}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-yellow-400">
            <p className="mb-2">&gt; Don't have an account?</p>
            <button
              onClick={onSwitchToSignUp}
              disabled={isLoading}
              className="text-yellow-400 underline hover:text-white transition-colors disabled:opacity-50"
            >
              [ SIGN UP ]
            </button>
          </div>

          <div className="text-center text-sm">
            <button className="text-yellow-400 underline hover:text-white transition-colors">
              [ FORGOT PASSWORD? ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
