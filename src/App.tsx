import { BrowserRouter, Route, Routes } from 'react-router';
import About from './pages/about';
import Footer from './common/footer';
import Header from './common/header';
import Home from './pages/home';

/**
 * Contains the application routes without router wrapper. This allows us
 * to test the routes without the need for a router (or use MemoryRouter in tests).
 */
export function AppRoutes() {
  return (
    <>
      <Header
        links={[
          { text: 'Home', url: '/' },
          { text: 'About', url: '/about' },
        ]}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
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
    </>
  );
}

/** Renders the application routes with BrowserRouter for production */
export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
