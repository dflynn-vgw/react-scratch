import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import About from './pages/About';
import Footer from './common/Footer';
import Header from './common/Header';
import Home from './pages/Home';

/**
 * Contains only the application routes without router wrapper.
 * This allows testing routes with MemoryRouter in tests.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/** Renders the full application with BrowserRouter for production */
export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* basename is set from vite.config.ts base path (/react-scratch/) */}
      {/* This ensures React Router URLs match the deployment path */}
      <Header
        links={[
          { text: 'Home', url: '/' },
          { text: 'About', url: '/about' },
        ]}
      />
      <main>
        <AppRoutes />
      </main>
      <Footer
        copyright="flydav"
        links={[
          {
            text: 'GitHub',
            url: 'https://github.com/dflynn-vgw/react-scratch',
          },
        ]}
      />
    </BrowserRouter>
  );
}
