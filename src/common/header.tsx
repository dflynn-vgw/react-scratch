import './header.css';
import { useLocation } from 'react-router';

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
                <a href={link.url}>{link.text}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
