import './Footer.css';

export default function Footer(props: {
  copyright?: string;
  links?: Array<{ text: string; url: string }>;
}) {
  const { copyright, links } = props;
  return (
    <footer>
      <nav>
        <ul>
          {links?.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.text}
              </a>
            </li>
          ))}
          {copyright && (
            <li>
              <time>
                &copy; {new Date().getFullYear()} {copyright}
              </time>
            </li>
          )}
        </ul>
      </nav>
    </footer>
  );
}
