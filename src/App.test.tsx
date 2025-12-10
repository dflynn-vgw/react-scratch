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
});

describe('AppRoutes', () => {
  const renderWithRouter = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <AppRoutes />
      </MemoryRouter>
    );
  };

  it('displays Home page when navigating to /', () => {
    renderWithRouter('/');

    expect(
      screen.getByRole('heading', { name: /it's a shit/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /sanitation services/i })
    ).toBeInTheDocument();
  });

  it('displays About page when navigating to /about', () => {
    renderWithRouter('/about');

    expect(
      screen.getByRole('heading', { name: /a note from the janitor/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /philosophy/i })
    ).toBeInTheDocument();
  });
});
