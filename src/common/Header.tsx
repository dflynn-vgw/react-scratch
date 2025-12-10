import './Header.css';
import { useLocation, Link } from 'react-router';
import Logo from './Logo';

export default function Header(props: {
  links?: Array<{ text: string; url: string }>;
}) {
  const location = useLocation();

  return (
    <header>
      <nav>
        <ul>
          {props.links?.map((link, index) => {
            const isActive = location.pathname === link.url;
            return (
              <li key={index} className={isActive ? 'active' : ''}>
                {/* Use <Link> for proper SPA navigation. Prevents full page reloads and works correctly with React Router */}
                <Link to={link.url}>{link.text}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <span className="logo">
        <Logo version={__GIT_HASH__} animation="all" />
      </span>
    </header>
  );
}
