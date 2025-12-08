import { BrowserRouter, Route, Routes } from 'react-router';
import TopNav from './common/top-nav';
import Home from './pages/home';
import About from './pages/about';

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <TopNav className="top-nav" />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
