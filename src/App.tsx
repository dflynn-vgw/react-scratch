import { BrowserRouter, Route, Routes } from 'react-router';
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
    </Routes>
  );
}

/** Renders the full application with BrowserRouter for production */
export default function App() {
  return (
    <BrowserRouter>
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
