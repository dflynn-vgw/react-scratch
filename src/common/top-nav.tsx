export default function topNav(props: { className?: string }) {
  const { className } = props;
  return (
    <nav className={className}>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
}
