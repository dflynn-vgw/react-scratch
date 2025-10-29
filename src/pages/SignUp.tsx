import { useState } from 'react';
import { useAuth, AuthProvider } from '../context/AuthContext';

interface SignUpProps {
  onSignUpSuccess: () => void;
  onSwitchToSignIn: () => void;
}

export default function SignUp({ onSignUpSuccess, onSwitchToSignIn }: SignUpProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp, signUpWithProvider } = useAuth();

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password);
      onSignUpSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: AuthProvider) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate OAuth redirect delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      await signUpWithProvider(provider);
      onSignUpSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'facebook': return '▶';
      case 'google': return '◉';
      case 'apple': return '◈';
      default: return '◆';
    }
  };

  return (
    <div className="min-h-screen bg-black text-yellow-400 font-mono flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-6">
        <pre className="text-yellow-400 text-center">
          {`┌─────────────────────────────────────┐
│         SIGN UP / REGISTER          │
└─────────────────────────────────────┘`}
        </pre>

        <div className="border-2 border-yellow-400 p-6 space-y-6">
          {error && (
            <div className="border border-red-500 bg-red-950/30 p-2 text-red-400">
              &gt; ERROR: {error}
            </div>
          )}

          {/* Email Sign Up Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="text-left space-y-2">
              <label htmlFor="signup-email" className="block">&gt; EMAIL:</label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-yellow-400 p-2 text-yellow-400 focus:outline-none focus:border-white"
                required
                disabled={isLoading}
                autoFocus
              />
            </div>

            <div className="text-left space-y-2">
              <label htmlFor="signup-password" className="block">&gt; PASSWORD:</label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-yellow-400 p-2 pr-16 text-yellow-400 focus:outline-none focus:border-white"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-400 hover:text-white"
                  disabled={isLoading}
                >
                  {showPassword ? '●' : '○'}
                </button>
              </div>
            </div>

            <div className="text-left space-y-2">
              <label htmlFor="signup-confirm-password" className="block">&gt; CONFIRM PASSWORD:</label>
              <div className="relative">
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-black border border-yellow-400 p-2 pr-16 text-yellow-400 focus:outline-none focus:border-white"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-400 hover:text-white"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? '●' : '○'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-400 text-black p-2 hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '[ PROCESSING... ]' : '[ SIGN UP WITH EMAIL ]'}
            </button>
          </form>

          {/* Divider */}
          <div className="text-center">
            <span>─────── OR ───────</span>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleSocialSignUp('facebook')}
              disabled={isLoading}
              className="w-full border-2 border-blue-500 text-blue-400 p-2 hover:bg-blue-500 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {getProviderIcon('facebook')} CONTINUE WITH FACEBOOK
            </button>

            <button
              onClick={() => handleSocialSignUp('google')}
              disabled={isLoading}
              className="w-full border-2 border-red-500 text-red-400 p-2 hover:bg-red-500 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {getProviderIcon('google')} CONTINUE WITH GOOGLE
            </button>

            <button
              onClick={() => handleSocialSignUp('apple')}
              disabled={isLoading}
              className="w-full border-2 border-gray-500 text-gray-400 p-2 hover:bg-gray-500 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {getProviderIcon('apple')} CONTINUE WITH APPLE
            </button>
          </div>

          {/* Switch to Sign In */}
          <div className="text-center pt-4 border-t border-yellow-400">
            <p className="mb-2">&gt; Already have an account?</p>
            <button
              onClick={onSwitchToSignIn}
              disabled={isLoading}
              className="text-yellow-400 underline hover:text-white transition-colors disabled:opacity-50"
            >
              [ SIGN IN ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
