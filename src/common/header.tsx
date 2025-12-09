import './header.css';

export default function Header(props: {
  links?: Array<{ text: string; url: string }>;
}) {
  return (
    <header>
      <nav>
        <ul>
          {props.links?.map((link, index) => (
            <li key={index}>
              <a href={link.url}>{link.text}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
