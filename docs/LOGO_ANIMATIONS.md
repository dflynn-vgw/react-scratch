# Logo Component Animations

The `Logo` component supports optional animations that run occasionally rather than continuously. You can specify a single animation, multiple animations, or all animations.

## Usage

```tsx
import Logo from './common/Logo';

// No animation (default)
<Logo version="1.0.0" />

// Single animation
<Logo version="1.0.0" animation="spin" />

// Multiple animations (randomly cycles through them)
<Logo version="1.0.0" animation={['spin', 'bounce']} />

// All animations (randomly cycles through all 4)
<Logo version="1.0.0" animation="all" />
```

## Animation Behavior

Animations are **not continuous** - they:
- Run for **2 seconds** when triggered
- Trigger at **random intervals** (every 10-20 seconds)
- Have an **initial delay** (3-8 seconds after component mounts)
- **Randomly select** from available animations (when multiple are specified)
- Are **subtle and non-distracting**

This creates a more polished user experience compared to constantly looping animations.

## Available Animations

### 1. `none` (Default)
No animation - static logo.

```tsx
<Logo animation="none" />
// or simply
<Logo />
```

### 2. `spin`
Continuous 360° rotation.

```tsx
<Logo animation="spin" />
```

**Properties:**
- Duration: 2 seconds (single rotation)
- Timing: Linear (constant speed)
- Triggers: Every 10-20 seconds (randomized)

**Use case:** Loading states, processing indicators

### 3. `pulse`
Scales the logo in and out.

```tsx
<Logo animation="pulse" />
```

**Properties:**
- Duration: 0.5 seconds (single pulse)
- Scale: 1.0 → 1.2 → 1.0
- Timing: Ease-in-out
- Triggers: Every 10-20 seconds (randomized)

**Use case:** Drawing attention, notifications

### 4. `bounce`
Vertical bouncing motion.

```tsx
<Logo animation="bounce" />
```

**Properties:**
- Duration: 0.5 seconds (multiple bounces)
- Movement: 10px vertical displacement
- Timing: Ease-in-out
- Triggers: Every 10-20 seconds (randomized)

**Use case:** Playful interactions, success states

### 5. `wiggle`
Rotates back and forth (shake effect).

```tsx
<Logo animation="wiggle" />
```

**Properties:**
- Duration: 2 seconds (multiple wiggles)
- Rotation: -10° ↔ 10° (back and forth)
- Timing: Ease-in-out
- Triggers: Every 10-20 seconds (randomized)

**Use case:** Alerts, errors, drawing urgent attention

## Props Interface

```typescript
type AnimationType = 'spin' | 'pulse' | 'bounce' | 'wiggle';
type AnimationProp = AnimationType | AnimationType[] | 'all' | 'none';

interface LogoProps {
  version?: string;           // Tooltip text (e.g., git commit hash)
  animation?: AnimationProp;  // Animation type(s) (default: 'none')
}
```

### Animation Prop Options

| Value | Description | Example |
|-------|-------------|---------|
| `'none'` | No animation (default) | `animation="none"` |
| `'spin'` | Only spin animation | `animation="spin"` |
| `'pulse'` | Only pulse animation | `animation="pulse"` |
| `'bounce'` | Only bounce animation | `animation="bounce"` |
| `'wiggle'` | Only wiggle animation | `animation="wiggle"` |
| `['spin', 'bounce']` | Array of animations to cycle through | `animation={['spin', 'bounce']}` |
| `'all'` | All 4 animations (spin, pulse, bounce, wiggle) | `animation="all"` |

## Examples

### Single Animation
```tsx
// Always spins when triggered
<Logo version={__GIT_HASH__} animation="spin" />
```

### Multiple Animations (Array)
```tsx
// Randomly picks spin or bounce each time
<Logo version={__GIT_HASH__} animation={['spin', 'bounce']} />

// Randomly picks from 3 animations
<Logo animation={['spin', 'pulse', 'wiggle']} />
```

### All Animations
```tsx
// Randomly cycles through all 4 animations
<Logo version={__GIT_HASH__} animation="all" />
```

### Header with All Animations (Current Setup)
```tsx
<Header>
  <Logo version={__GIT_HASH__} animation="all" />
</Header>
```

### Loading Indicator
```tsx
{isLoading && <Logo animation="spin" />}
```

### Success Notification (Bounce or Pulse)
```tsx
{showSuccess && <Logo animation={['bounce', 'pulse']} />}
```

### Static Branding
```tsx
<Footer>
  <Logo version="v1.0.0" animation="none" />
</Footer>
```

## Timing Details

### Initial Delay
- **3-8 seconds** after component mounts (randomized)
- Prevents all logos from animating simultaneously

### Repeat Interval
- **10-20 seconds** between animations (randomized)
- Creates a natural, occasional movement
- Not distracting or attention-seeking

### Animation Duration
- All animations run for exactly **2 seconds**
- Then stop until the next trigger

### Animation Selection
When multiple animations are specified:
- **Random selection** on each trigger
- Equal probability for all available animations
- Each animation is independently chosen

### Implementation
The component uses React `useState` and `useEffect` to:
1. Determine available animations (single, array, or 'all')
2. Randomly schedule animation triggers
3. Randomly select one animation from available options
4. Apply the animation class for 2 seconds
5. Remove the class after animation completes
6. Schedule the next animation with a new random selection

## Customization

### Adjusting Timing Intervals

Edit `src/common/Logo.tsx` to change when animations trigger:

```tsx
// Initial delay (currently 3-8 seconds)
const initialDelay = Math.random() * 5000 + 3000;

// Repeat interval (currently 10-20 seconds)
const interval = setInterval(
  () => triggerAnimation(),
  Math.random() * 10000 + 10000  // Change these values
);
```

### Adjusting Animation Duration

The animation duration is set to 2 seconds in the CSS. To change it, edit `src/common/Logo.css`:

```css
/* Example: Faster animation (1 second instead of 2) */
.logo-spin {
  animation: logo-spin 1s linear 1; /* Changed from 2s to 1s */
}

/* Example: Bigger pulse */
@keyframes logo-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.5); } /* Changed from 1.2 to 1.5 */
}

/* Note: The '1' at the end means "run once" (not infinite) */
```

## Accessibility Considerations

- Animations are **purely decorative** and don't convey critical information
- Animations are **occasional** (not continuous), reducing motion sensitivity issues
- Duration is limited to **2 seconds**, minimizing distraction
- Consider adding `prefers-reduced-motion` support for users who prefer minimal animations

### Adding Reduced Motion Support (Optional)

```css
// In Logo.tsx, add to useEffect:
useEffect(() => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || animation === 'none') return;
  
  // ... rest of animation logic
}, [animation]);
```

## Performance

- All animations use CSS `transform` property for optimal performance
- GPU-accelerated (no layout reflows)
- **Occasional triggers** reduce CPU/GPU usage compared to continuous animations
- React state updates are minimal (only when animation starts/stops)
- No performance impact when animations are not running

## Browser Support

CSS animations are supported in all modern browsers:
- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Opera: ✅

## Related Files

- Component: `src/common/Logo.tsx`
- Styles: `src/common/Logo.css`
- Type definitions: Inline in `Logo.tsx`

## Random Cycling Behavior

### How It Works

When you specify multiple animations, the Logo component:

1. **Builds an array** of available animations:
   - `'all'` → `['spin', 'pulse', 'bounce', 'wiggle']`
   - `['spin', 'bounce']` → `['spin', 'bounce']`
   - `'wiggle'` → `['wiggle']`

2. **On each trigger**, randomly selects one animation:
   ```tsx
   const randomIndex = Math.floor(Math.random() * availableAnimations.length);
   const nextAnimation = availableAnimations[randomIndex];
   ```

3. **Applies the selected animation** for 2 seconds

4. **Repeats** the process on the next trigger (10-20 seconds later)

### Example Timeline

With `animation="all"`:
```
Time:  0s ---- 5s ---- 7s ---- 9s ---- 22s --- 24s --- 38s --- 40s
       |       |       |       |        |      |       |      |
      Mount  Delay   SPIN    Stop    BOUNCE  Stop   WIGGLE  Stop
                    (2s)            (2s)            (2s)
```

Each animation is randomly chosen, so you might see:
- Spin → Pulse → Bounce → Spin → Wiggle → Pulse → ...
