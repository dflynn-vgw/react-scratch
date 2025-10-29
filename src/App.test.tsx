import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    render(<App />);
  });

  describe('Navigation', () => {
    it('Navigate to HOME page', async () => {
      await user.click(screen.getByRole('button', { name: /home/i }));
      const text = getTextContentForRole('main');
      expect(text).toContain('WELCOME');
      expect(text).toContain('> System initialized...');
      expect(text).toContain('> Ready for input');
      expect(text).toContain('> _');
    });

    it('Navigate to CONTENT page', async () => {
      await user.click(screen.getByRole('button', { name: /content/i }));
      const text = getTextContentForRole('main');

      expect(text).toContain('CONTENT DIRECTORY');
      expect(text).toContain('> [001] Project Alpha');
      expect(text).toContain('> [002] Project Beta');
      expect(text).toContain('> [003] Project Gamma');
      expect(text).toContain('> _');
    });

    it('Navigate to ABOUT page', async () => {
      await user.click(screen.getByRole('button', { name: /about/i }));
      const text = getTextContentForRole('main');

      expect(text).toContain('SYSTEM INFO');
      expect(text).toContain('Version: 1.0.0');
      expect(text).toContain('Built with: React + TypeScript');
      expect(text).toContain('Status: ONLINE');
    });
  });
});

/** Get content for given ARIA role (e.g. main, header, footer etc ) */
const getTextContentForRole = (role: string) =>
  screen
    .getByRole(role)
    .textContent?.replace(/\s+/g, ' ') // normalise (remove whitespace)
    .trim();
