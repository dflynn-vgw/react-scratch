import { BrowserRouter, Route, Routes } from 'react-router';
import About from './pages/about';
import Footer from './common/footer';
import Header from './common/header';
import Home from './pages/home';

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
    </BrowserRouter>
  );
}
