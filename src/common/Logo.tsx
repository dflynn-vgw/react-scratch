import './Logo.css';
import { useState, useEffect } from 'react';

type AnimationType = 'spin' | 'pulse' | 'bounce' | 'wiggle' | 'none';

export default function Logo(props: {
  version?: string;
  animation?: AnimationType;
}) {
  const { version, animation = 'none' } = props;
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (animation === 'none') return;

    // Function to trigger animation
    const triggerAnimation = () => {
      setIsAnimating(true);

      // Stop animation after 2 seconds
      setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
    };

    // Initial delay before first animation (3-8 seconds)
    const initialDelay = Math.random() * 5000 + 3000;
    const initialTimer = setTimeout(triggerAnimation, initialDelay);

    // Set up interval for subsequent animations (every 10-20 seconds)
    const interval = setInterval(
      () => {
        triggerAnimation();
      },
      Math.random() * 10000 + 10000
    );

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [animation]);

  const animationClass =
    animation !== 'none' && isAnimating ? `logo-${animation}` : '';

  return (
    <span className={`logo-base ${animationClass}`} title={version}>
      💩
    </span>
  );
}
