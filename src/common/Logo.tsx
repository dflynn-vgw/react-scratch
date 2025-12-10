import './Logo.css';
import { useState, useEffect } from 'react';

type AnimationType = 'spin' | 'pulse' | 'bounce' | 'wiggle';
type AnimationProp = AnimationType | AnimationType[] | 'all' | 'none';

const ALL_ANIMATIONS: AnimationType[] = ['spin', 'pulse', 'bounce', 'wiggle'];

export default function Logo(props: {
  version?: string;
  animation?: AnimationProp;
}) {
  const { version, animation = 'none' } = props;
  const [currentAnimation, setCurrentAnimation] =
    useState<AnimationType | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (animation === 'none') return;

    // Determine available animations
    let availableAnimations: AnimationType[];

    if (animation === 'all') {
      availableAnimations = ALL_ANIMATIONS;
    } else if (Array.isArray(animation)) {
      availableAnimations = animation;
    } else {
      availableAnimations = [animation];
    }

    // Function to get a random animation from available animations
    const getRandomAnimation = (): AnimationType => {
      const randomIndex = Math.floor(
        Math.random() * availableAnimations.length
      );
      return availableAnimations[randomIndex];
    };

    // Function to trigger animation
    const triggerAnimation = () => {
      const nextAnimation = getRandomAnimation();
      setCurrentAnimation(nextAnimation);
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
    currentAnimation && isAnimating ? `logo-${currentAnimation}` : '';

  return (
    <span className={`logo-base ${animationClass}`} title={version}>
      💩
    </span>
  );
}
