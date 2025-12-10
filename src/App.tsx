import { BrowserRouter, Route, Routes } from 'react-router';
import About from './pages/about';
import Footer from './common/footer';
import Header from './common/header';
import Home from './pages/home';

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
