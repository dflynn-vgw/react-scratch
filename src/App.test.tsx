import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import App, { AppRoutes } from './App';

describe('App', () => {
  it('renders header with navigation links', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('renders footer with copyright and GitHub link', () => {
    render(<App />);

    expect(screen.getByText(/flydav/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
  });

  it('displays Home page by default', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /it's a shit/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /sanitation services/i })
    ).toBeInTheDocument();
  });

  it('displays About page when navigating to /about', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /a note from the janitor/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /philosophy/i })
    ).toBeInTheDocument();
  });

  it('displays Home page when navigating to /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /it's a shit/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /sanitation services/i })
    ).toBeInTheDocument();
  });

  it('applies active styling to current page link on Home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });

    expect(homeLink.closest('li')).toHaveClass('active');
    expect(aboutLink.closest('li')).not.toHaveClass('active');
  });

  it('applies active styling to current page link on About page', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <AppRoutes />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });

    expect(aboutLink.closest('li')).toHaveClass('active');
    expect(homeLink.closest('li')).not.toHaveClass('active');
  });
});
