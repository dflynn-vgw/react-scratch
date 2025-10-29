import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface TermsAndConditionsProps {
  onAccept: () => void;
}

export default function TermsAndConditions({ onAccept }: TermsAndConditionsProps) {
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { acceptTerms } = useAuth();

  const handleAccept = async () => {
    if (!agreed) return;
    
    setIsSubmitting(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    acceptTerms();
    onAccept();
  };

  return (
    <div className="min-h-screen bg-black text-yellow-400 font-mono flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-6">
        <pre className="text-yellow-400 text-center">
          {`┌─────────────────────────────────────┐
│      TERMS AND CONDITIONS           │
└─────────────────────────────────────┘`}
        </pre>

        <div className="border-2 border-yellow-400 p-6 space-y-6">
          <div className="text-left space-y-2 text-sm">
            <p className="text-white font-bold">&gt; FIRST TIME SIGN-IN DETECTED</p>
            <p>&gt; Please review and accept our terms to continue.</p>
          </div>

          {/* Terms Content */}
          <div className="border border-yellow-400 p-4 h-64 overflow-y-auto bg-black space-y-3 text-sm">
            <div>
              <p className="text-white font-bold">&gt;&gt; 1. ACCEPTANCE OF TERMS</p>
              <p className="pl-4">
                By accessing and using this service, you accept and agree to be bound by the
                terms and provision of this agreement.
              </p>
            </div>

            <div>
              <p className="text-white font-bold">&gt;&gt; 2. USE LICENSE</p>
              <p className="pl-4">
                Permission is granted to temporarily download one copy of the materials for
                personal, non-commercial transitory viewing only.
              </p>
            </div>

            <div>
              <p className="text-white font-bold">&gt;&gt; 3. DISCLAIMER</p>
              <p className="pl-4">
                The materials on this service are provided on an 'as is' basis. We make no
                warranties, expressed or implied, and hereby disclaim and negate all other
                warranties including, without limitation, implied warranties or conditions of
                merchantability, fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <p className="text-white font-bold">&gt;&gt; 4. LIMITATIONS</p>
              <p className="pl-4">
                In no event shall we or our suppliers be liable for any damages (including,
                without limitation, damages for loss of data or profit, or due to business
                interruption) arising out of the use or inability to use the materials on our
                service.
              </p>
            </div>

            <div>
              <p className="text-white font-bold">&gt;&gt; 5. PRIVACY POLICY</p>
              <p className="pl-4">
                Your privacy is important to us. We are committed to protecting your personal
                information and your right to privacy. For more information, please review our
                Privacy Policy.
              </p>
            </div>

            <div>
              <p className="text-white font-bold">&gt;&gt; 6. MODIFICATIONS</p>
              <p className="pl-4">
                We may revise these terms of service at any time without notice. By using this
                service you are agreeing to be bound by the then current version of these terms
                of service.
              </p>
            </div>

            <div className="pt-4 border-t border-yellow-400">
              <p className="text-white">&gt;&gt; EFFECTIVE DATE: 2025-01-01</p>
              <p className="text-white">&gt;&gt; LAST UPDATED: 2025-01-01</p>
            </div>
          </div>

          {/* Checkbox Agreement */}
          <div className="border border-yellow-400 p-4 space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 accent-yellow-400"
              />
              <span className="text-sm">
                &gt; I have read and agree to the Terms and Conditions. I understand that by
                checking this box and clicking "Accept", I am agreeing to be legally bound by
                these terms.
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAccept}
              disabled={!agreed || isSubmitting}
              className="flex-1 bg-yellow-400 text-black p-2 hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '[ PROCESSING... ]' : '[ ACCEPT AND CONTINUE ]'}
            </button>
          </div>

          <p className="text-xs text-center">
            &gt; You must accept the terms to continue using this service
          </p>
        </div>
      </div>
    </div>
  );
}
