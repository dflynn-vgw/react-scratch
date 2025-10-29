import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from './App';

describe('App - Authentication Flow', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Sign Up Flow', () => {
    it('should display sign-up page on initial load', () => {
      render(<App />);
      expect(screen.getByText(/SIGN UP \/ REGISTER/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/> EMAIL:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/> PASSWORD:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/> CONFIRM PASSWORD:/i)).toBeInTheDocument();
    });

    it('should validate password matching during sign-up', async () => {
      render(<App />);
      
      await user.type(screen.getByLabelText(/> EMAIL:/i), 'test@example.com');
      await user.type(screen.getByLabelText(/> PASSWORD:/i), 'password123');
      await user.type(screen.getByLabelText(/> CONFIRM PASSWORD:/i), 'different');
      
      await user.click(screen.getByRole('button', { name: /SIGN UP WITH EMAIL/i }));
      
      expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
    });

    it('should validate minimum password length', async () => {
      render(<App />);
      
      await user.type(screen.getByLabelText(/> EMAIL:/i), 'test@example.com');
      await user.type(screen.getByLabelText(/> PASSWORD:/i), '12345');
      await user.type(screen.getByLabelText(/> CONFIRM PASSWORD:/i), '12345');
      
      await user.click(screen.getByRole('button', { name: /SIGN UP WITH EMAIL/i }));
      
      expect(await screen.findByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
    });

    it('should complete email sign-up and proceed to verification', async () => {
      render(<App />);
      
      await user.type(screen.getByLabelText(/> EMAIL:/i), 'test@example.com');
      await user.type(screen.getByLabelText(/> PASSWORD:/i), 'password123');
      await user.type(screen.getByLabelText(/> CONFIRM PASSWORD:/i), 'password123');
      
      await user.click(screen.getByRole('button', { name: /SIGN UP WITH EMAIL/i }));
      
      await waitFor(() => {
        expect(screen.queryAllByText(/EMAIL VERIFICATION/i).length).toBeGreaterThan(0);
      });
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });

    it('should simulate social sign-up with Facebook', async () => {
      render(<App />);
      
      await user.click(screen.getByRole('button', { name: /CONTINUE WITH FACEBOOK/i }));
      
      await waitFor(() => {
        expect(screen.queryAllByText(/EMAIL VERIFICATION/i).length).toBeGreaterThan(0);
      }, { timeout: 2000 });
    });

    it('should switch to sign-in page from sign-up', async () => {
      render(<App />);
      
      expect(screen.getByText(/SIGN UP \/ REGISTER/i)).toBeInTheDocument();
      
      await user.click(screen.getByRole('button', { name: /\[ SIGN IN \]/i }));
      
      expect(await screen.findByText(/SIGN IN \/ LOGIN/i)).toBeInTheDocument();
    });
  });

  describe('Email Verification Flow', () => {
    beforeEach(async () => {
      render(<App />);
      
      // Complete sign-up first
      await user.type(screen.getByLabelText(/> EMAIL:/i), 'verify@example.com');
      await user.type(screen.getByLabelText(/> PASSWORD:/i), 'password123');
      await user.type(screen.getByLabelText(/> CONFIRM PASSWORD:/i), 'password123');
      await user.click(screen.getByRole('button', { name: /SIGN UP WITH EMAIL/i }));
      
      await waitFor(() => {
        expect(screen.queryAllByText(/EMAIL VERIFICATION/i).length).toBeGreaterThan(0);
      });
    });

    it('should display verification page with correct email', () => {
      expect(screen.getByText('verify@example.com')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /SIMULATE EMAIL VERIFICATION/i })).toBeInTheDocument();
    });

    it('should verify email and proceed to sign-in', async () => {
      await user.click(screen.getByRole('button', { name: /SIMULATE EMAIL VERIFICATION/i }));
      
      expect(await screen.findByText(/SIGN IN \/ LOGIN/i, {}, { timeout: 3000 })).toBeInTheDocument();
    });
  });

  describe('Sign In Flow', () => {
    beforeEach(async () => {
      // Create a verified user first
      localStorage.setItem('auth_users', JSON.stringify({
        'signin@example.com': {
          password: 'password123',
          user: {
            email: 'signin@example.com',
            provider: 'email',
            emailVerified: true,
            termsAccepted: false,
            createdAt: new Date().toISOString()
          }
        }
      }));
      
      render(<App />);
      
      // Navigate to sign-in page
      await user.click(screen.getByRole('button', { name: /\[ SIGN IN \]/i }));
      await screen.findByText(/SIGN IN \/ LOGIN/i);
    });

    it('should display sign-in form', () => {
      expect(screen.getByLabelText(/> EMAIL:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/> PASSWORD:/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^\[ SIGN IN \]$/i })).toBeInTheDocument();
    });

    it('should show error for non-existent user', async () => {
      await user.type(screen.getByLabelText(/> EMAIL:/i), 'nonexistent@example.com');
      await user.type(screen.getByLabelText(/> PASSWORD:/i), 'password123');
      
      await user.click(screen.getByRole('button', { name: /^\[ SIGN IN \]$/i }));
      
      expect(await screen.findByText(/User not found/i)).toBeInTheDocument();
    });

    it('should show error for incorrect password', async () => {
      await user.type(screen.getByLabelText(/> EMAIL:/i), 'signin@example.com');
      await user.type(screen.getByLabelText(/> PASSWORD:/i), 'wrongpassword');
      
      await user.click(screen.getByRole('button', { name: /^\[ SIGN IN \]$/i }));
      
      expect(await screen.findByText(/Invalid password/i)).toBeInTheDocument();
    });

    it('should sign in successfully and show terms for first-time user', async () => {
      await user.type(screen.getByLabelText(/> EMAIL:/i), 'signin@example.com');
      await user.type(screen.getByLabelText(/> PASSWORD:/i), 'password123');
      
      await user.click(screen.getByRole('button', { name: /^\[ SIGN IN \]$/i }));
      
      await waitFor(() => {
        expect(screen.queryAllByText(/TERMS AND CONDITIONS/i).length).toBeGreaterThan(0);
      });
      expect(screen.getByText(/FIRST TIME SIGN-IN DETECTED/i)).toBeInTheDocument();
    });

    it('should switch to sign-up page from sign-in', async () => {
      await user.click(screen.getByRole('button', { name: /\[ SIGN UP \]/i }));
      
      expect(await screen.findByText(/SIGN UP \/ REGISTER/i)).toBeInTheDocument();
    });
  });

  describe('Terms and Conditions Flow', () => {
    beforeEach(async () => {
      // Create a verified user without accepted terms
      localStorage.setItem('auth_users', JSON.stringify({
        'terms@example.com': {
          password: 'password123',
          user: {
            email: 'terms@example.com',
            provider: 'email',
            emailVerified: true,
            termsAccepted: false,
            createdAt: new Date().toISOString()
          }
        }
      }));
      
      render(<App />);
      
      // Navigate to sign-in and sign in
      await user.click(screen.getByRole('button', { name: /\[ SIGN IN \]/i }));
      await screen.findByText(/SIGN IN \/ LOGIN/i);
      
      await user.type(screen.getByLabelText(/> EMAIL:/i), 'terms@example.com');
      await user.type(screen.getByLabelText(/> PASSWORD:/i), 'password123');
      await user.click(screen.getByRole('button', { name: /^\[ SIGN IN \]$/i }));
      
      await waitFor(() => {
        expect(screen.queryAllByText(/TERMS AND CONDITIONS/i).length).toBeGreaterThan(0);
      });
    });

    it('should display terms and conditions', () => {
      expect(screen.getByText(/1\. ACCEPTANCE OF TERMS/i)).toBeInTheDocument();
      expect(screen.getByText(/2\. USE LICENSE/i)).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should require checkbox before accepting', () => {
      const acceptButton = screen.getByRole('button', { name: /ACCEPT AND CONTINUE/i });
      expect(acceptButton).toBeDisabled();
    });

    it('should enable accept button when checkbox is checked', async () => {
      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);
      
      const acceptButton = screen.getByRole('button', { name: /ACCEPT AND CONTINUE/i });
      expect(acceptButton).toBeEnabled();
    });

    it('should proceed to welcome page after accepting terms', async () => {
      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);
      
      const acceptButton = screen.getByRole('button', { name: /ACCEPT AND CONTINUE/i });
      await user.click(acceptButton);
      
      await waitFor(() => {
        expect(screen.getByText(/WELCOME BACK!/i)).toBeInTheDocument();
      }, { timeout: 2000 });
    });
  });

  describe('Welcome Page', () => {
    beforeEach(async () => {
      // Create a fully authenticated user
      localStorage.setItem('auth_users', JSON.stringify({
        'welcome@example.com': {
          password: 'password123',
          user: {
            email: 'welcome@example.com',
            provider: 'email',
            emailVerified: true,
            termsAccepted: true,
            createdAt: new Date().toISOString()
          }
        }
      }));
      
      localStorage.setItem('auth_current_user', JSON.stringify({
        email: 'welcome@example.com',
        provider: 'email',
        emailVerified: true,
        termsAccepted: true,
        createdAt: new Date().toISOString()
      }));
      
      render(<App />);
      await waitFor(() => {
        expect(screen.getByText(/WELCOME BACK!/i)).toBeInTheDocument();
      });
    });

    it('should display welcome page with user info', () => {
      expect(screen.getByText(/WELCOME BACK!/i)).toBeInTheDocument();
      expect(screen.getByText('welcome@example.com')).toBeInTheDocument();
      expect(screen.getByText(/Email & Password/i)).toBeInTheDocument();
    });

    it('should show verified status', () => {
      expect(screen.queryAllByText(/✓ YES/i).length).toBeGreaterThan(0);
    });

    it('should sign out and return to sign-in page', async () => {
      const signOutButton = screen.getByRole('button', { name: /SIGN OUT/i });
      await user.click(signOutButton);
      
      expect(await screen.findByText(/SIGN IN \/ LOGIN/i)).toBeInTheDocument();
      expect(localStorage.getItem('auth_current_user')).toBeNull();
    });
  });

  describe('Complete End-to-End Flow', () => {
    it('should complete full sign-up to welcome flow', async () => {
      render(<App />);
      
      // Step 1: Sign up
      await user.type(screen.getByLabelText(/> EMAIL:/i), 'e2e@example.com');
      await user.type(screen.getByLabelText(/> PASSWORD:/i), 'password123');
      await user.type(screen.getByLabelText(/> CONFIRM PASSWORD:/i), 'password123');
      await user.click(screen.getByRole('button', { name: /SIGN UP WITH EMAIL/i }));
      
      // Step 2: Verify email
      await waitFor(() => {
        expect(screen.queryAllByText(/EMAIL VERIFICATION/i).length).toBeGreaterThan(0);
      });
      await user.click(screen.getByRole('button', { name: /SIMULATE EMAIL VERIFICATION/i }));
      
      // Step 3: Sign in
      expect(await screen.findByText(/SIGN IN \/ LOGIN/i, {}, { timeout: 3000 })).toBeInTheDocument();
      await user.type(screen.getByLabelText(/> EMAIL:/i), 'e2e@example.com');
      await user.type(screen.getByLabelText(/> PASSWORD:/i), 'password123');
      await user.click(screen.getByRole('button', { name: /^\[ SIGN IN \]$/i }));
      
      // Step 4: Accept terms
      await waitFor(() => {
        expect(screen.queryAllByText(/TERMS AND CONDITIONS/i).length).toBeGreaterThan(0);
      });
      await user.click(screen.getByRole('checkbox'));
      await user.click(screen.getByRole('button', { name: /ACCEPT AND CONTINUE/i }));
      
      // Step 5: Welcome page
      await waitFor(() => {
        expect(screen.getByText(/WELCOME BACK!/i)).toBeInTheDocument();
        expect(screen.getByText('e2e@example.com')).toBeInTheDocument();
      }, { timeout: 2000 });
    });
  });
});
