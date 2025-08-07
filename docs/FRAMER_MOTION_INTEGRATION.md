# Framer Motion Integration

This project has been enhanced with Framer Motion animations while preserving the existing design aesthetic. All animations are subtle and enhance the user experience without being distracting.

## 🎨 Animation Variants

All animation variants are defined in `lib/motion.ts` and follow a consistent design language:

### Page Transitions

- `pageTransition`: Smooth fade-in/fade-out with slight vertical movement
- `fadeInUp`: Elements fade in while moving up from their initial position
- `fadeIn`: Simple fade-in animation
- `scaleIn`: Elements scale up from 95% to 100% while fading in

### Interactive Animations

- `buttonHover`: Subtle scale effect on button hover and tap
- `cardHover`: Cards lift slightly on hover
- `iconSpin`: Icons rotate 360° on hover

### Layout Animations

- `staggerContainer`: Container that staggers child animations
- `slideInFromLeft`: Elements slide in from the left
- `slideInFromRight`: Elements slide in from the right

## 🧩 Enhanced Components

### Main Page (`app/page.tsx`)

- Staggered entrance animations for all sections
- Header slides in from left
- Cards fade in with staggered timing
- Recent projects and contributions slide in from opposite sides

### Card Component (`components/card.tsx`)

- Hover animation: cards lift slightly
- Icon rotation on hover
- Smooth transitions for all interactive elements

### BoundlessButton (`components/buttons/BoundlessButton.tsx`)

- Scale animation on hover and tap
- Maintains all existing functionality and styling
- Wrapped in motion.div for smooth interactions

### EmptyState (`components/EmptyState.tsx`)

- Fade-in animation for the container
- Scale animation for the empty state image
- Staggered text animations

### ProjectCard (`components/project-card.tsx`)

- Card hover effects
- Badge animations with delays
- Avatar hover interactions
- Dropdown menu animations

### RecentProjects (`components/overview/RecentProjects.tsx`)

- Container fade-in animation
- Staggered project card animations
- Empty state animations

## 🎯 New Components

### PageTransition (`components/PageTransition.tsx`)

A wrapper component that provides smooth page transitions:

```tsx
<PageTransition>
  <YourPageContent />
</PageTransition>
```

### LoadingSpinner (`components/LoadingSpinner.tsx`)

A versatile animated loading component with multiple variants:

#### Variants

- `spinner`: Classic rotating spinner (default)
- `dots`: Three animated dots
- `pulse`: Pulsing circle

#### Sizes

- `xs`: 12px (w-3 h-3)
- `sm`: 16px (w-4 h-4)
- `md`: 24px (w-6 h-6) - default
- `lg`: 32px (w-8 h-8)
- `xl`: 48px (w-12 h-12)

#### Colors

- `default`: Uses current text color
- `primary`: Uses primary theme color
- `white`: White color
- `muted`: Muted text color

#### Speeds

- `slow`: 2 seconds
- `normal`: 1 second (default)
- `fast`: 0.5 seconds

#### Usage Examples

```tsx
// Basic usage
<LoadingSpinner />

// Customized spinner
<LoadingSpinner
  variant="dots"
  size="lg"
  color="primary"
  speed="fast"
/>

// Button loading state
<LoadingSpinner variant="spinner" size="sm" color="white" />

// Page loading
<LoadingSpinner variant="dots" size="xl" color="primary" />
```

### AnimatedCounter (`components/AnimatedCounter.tsx`)

Animated number counter for displaying changing values:

```tsx
<AnimatedCounter value={100} duration={1} />
```

## 🎨 Design Principles

1. **Subtle**: All animations are understated and enhance rather than distract
2. **Consistent**: Using the same easing curves and timing across all animations
3. **Performance**: Optimized animations that don't impact performance
4. **Accessibility**: Animations respect user preferences and can be disabled
5. **Preserved Design**: All existing styling and functionality remains unchanged

## 🚀 Usage Examples

### Adding animations to new components:

```tsx
import { motion } from 'framer-motion';
import { fadeInUp, cardHover } from '@/lib/motion';

const MyComponent = () => {
  return (
    <motion.div variants={fadeInUp} whileHover='hover' variants={cardHover}>
      {/* Your content */}
    </motion.div>
  );
};
```

### Using the PageTransition wrapper:

```tsx
import PageTransition from '@/components/PageTransition';

const MyPage = () => {
  return (
    <PageTransition>
      <div>Page content</div>
    </PageTransition>
  );
};
```

### LoadingSpinner Demo

Check out `components/LoadingSpinnerDemo.tsx` to see all variants in action.

## 📱 Performance Considerations

- All animations use `transform` and `opacity` properties for optimal performance
- Animations are hardware-accelerated where possible
- Reduced motion support can be added for accessibility
- Animation durations are kept short (0.2-0.4s) for snappy interactions

## 🎭 Customization

To modify animations, edit the variants in `lib/motion.ts`. All animations use consistent easing curves and timing for a cohesive experience.

The integration maintains 100% backward compatibility with existing components while adding smooth, professional animations that enhance the user experience.
