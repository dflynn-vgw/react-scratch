import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import EmailVerification from './pages/EmailVerification';
import TermsAndConditions from './pages/TermsAndConditions';
import Welcome from './pages/Welcome';

type AuthFlow = 'signup' | 'signin' | 'verify-email' | 'terms' | 'welcome';

function AuthFlowApp() {
  const [currentFlow, setCurrentFlow] = useState<AuthFlow>('signup');
  const [pendingEmail, setPendingEmail] = useState('');
  const { user, signOut, isAuthenticated } = useAuth();

  const handleSignUpSuccess = () => {
    const email = localStorage.getItem('auth_pending_verification');
    if (email) {
      setPendingEmail(email);
      setCurrentFlow('verify-email');
    }
  };

  const handleEmailVerified = () => {
    setCurrentFlow('signin');
  };

  const handleSignInSuccess = (needsTerms: boolean) => {
    if (needsTerms) {
      setCurrentFlow('terms');
    } else {
      setCurrentFlow('welcome');
    }
  };

  const handleTermsAccepted = () => {
    setCurrentFlow('welcome');
  };

  const handleSignOut = () => {
    signOut();
    setCurrentFlow('signin');
  };

  // If user is already authenticated and has accepted terms, show welcome
  if (isAuthenticated && user?.termsAccepted && currentFlow !== 'welcome') {
    setCurrentFlow('welcome');
  }

  const renderFlow = () => {
    switch (currentFlow) {
      case 'signup':
        return (
          <SignUp
            onSignUpSuccess={handleSignUpSuccess}
            onSwitchToSignIn={() => setCurrentFlow('signin')}
          />
        );
      case 'verify-email':
        return (
          <EmailVerification
            email={pendingEmail}
            onVerified={handleEmailVerified}
          />
        );
      case 'signin':
        return (
          <SignIn
            onSignInSuccess={handleSignInSuccess}
            onSwitchToSignUp={() => setCurrentFlow('signup')}
          />
        );
      case 'terms':
        return <TermsAndConditions onAccept={handleTermsAccepted} />;
      case 'welcome':
        return <Welcome onSignOut={handleSignOut} />;
      default:
        return null;
    }
  };

  return <>{renderFlow()}</>;
}

function App() {
  return (
    <AuthProvider>
      <AuthFlowApp />
    </AuthProvider>
  );
}

export default App;
