export default function Logo(props: { version?: string }) {
  const { version } = props;
  return (
    <span style={{ filter: 'grayscale(100%)' }} title={version}>
      💩
    </span>
  );
}
