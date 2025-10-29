import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface EmailVerificationProps {
  email: string;
  onVerified: () => void;
}

export default function EmailVerification({ email, onVerified }: EmailVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [dots, setDots] = useState('');
  const { verifyEmail } = useAuth();

  useEffect(() => {
    // Animated dots effect
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleVerify = async () => {
    setIsVerifying(true);
    
    // Simulate email verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    verifyEmail(email);
    onVerified();
  };

  return (
    <div className="min-h-screen bg-black text-yellow-400 font-mono flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-6">
        <pre className="text-yellow-400 text-center">
          {`┌─────────────────────────────────────┐
│       EMAIL VERIFICATION            │
└─────────────────────────────────────┘`}
        </pre>

        <div className="border-2 border-yellow-400 p-6 space-y-6">
          <div className="text-left space-y-4">
            <p>&gt; A verification email has been sent to:</p>
            <p className="text-white pl-4">{email}</p>
            
            <div className="border-t border-yellow-400 pt-4 mt-4">
              <p>&gt; Please check your inbox and click the</p>
              <p>&gt; verification link{dots}</p>
            </div>

            <div className="border border-yellow-400/50 p-4 mt-4 bg-yellow-400/5">
              <p className="text-sm">&gt; NOTE: This is a simulation.</p>
              <p className="text-sm">&gt; Click the button below to verify.</p>
            </div>
          </div>

          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full bg-yellow-400 text-black p-2 hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? '[ VERIFYING... ]' : '[ SIMULATE EMAIL VERIFICATION ]'}
          </button>

          <div className="text-center text-sm pt-2 border-t border-yellow-400">
            <p>&gt; Didn't receive the email?</p>
            <button className="text-yellow-400 underline hover:text-white transition-colors mt-2">
              [ RESEND VERIFICATION EMAIL ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
