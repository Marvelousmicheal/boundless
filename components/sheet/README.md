# BoundlessSheet Component

A professional, fully responsive sheet component built with React and Radix UI that adapts seamlessly across mobile, tablet, and desktop devices.

## Features

- 🎯 **Fully Responsive** - Automatically adapts to mobile, tablet, and desktop screens
- ♿ **Accessible** - Built with ARIA labels and keyboard navigation support
- 🎨 **Customizable** - Extensive styling and behavior customization options
- ⌨️ **Keyboard Support** - ESC key to close, proper focus management
- 📱 **Mobile Optimized** - Touch-friendly interactions and mobile-first design
- 🎭 **Smooth Animations** - Fluid transitions and micro-interactions
- 🔧 **TypeScript Ready** - Full TypeScript support with proper type definitions

## Responsive Behavior

| Screen Size                 | Behavior                                                       |
| --------------------------- | -------------------------------------------------------------- |
| **Mobile** (< 768px)        | Full width, bottom sheet, 85% max height, smaller close button |
| **Tablet** (768px - 1024px) | Centered with max-width, 80% max height, medium close button   |
| **Desktop** (> 1024px)      | Large max-width, optimized spacing, larger close button        |

## Props

| Prop                  | Type                                     | Default    | Description                                    |
| --------------------- | ---------------------------------------- | ---------- | ---------------------------------------------- |
| `open`                | `boolean`                                | -          | Controls the visibility of the sheet           |
| `setOpen`             | `(open: boolean) => void`                | -          | Function to control the sheet state            |
| `title`               | `string`                                 | -          | Optional title displayed in the header         |
| `children`            | `React.ReactNode`                        | -          | Content to be displayed inside the sheet       |
| `className`           | `string`                                 | -          | Additional CSS classes for the sheet container |
| `contentClassName`    | `string`                                 | -          | Additional CSS classes for the sheet content   |
| `showCloseButton`     | `boolean`                                | `true`     | Whether to show the close button               |
| `closeOnOverlayClick` | `boolean`                                | `true`     | Whether clicking overlay closes the sheet      |
| `side`                | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Which side the sheet slides in from            |
| `maxHeight`           | `string`                                 | -          | Maximum height of the sheet                    |
| `minHeight`           | `string`                                 | `'400px'`  | Minimum height of the sheet                    |

## Basic Usage

```tsx
import React, { useState } from 'react';
import BoundlessSheet from './components/sheet/boundless-sheet';

const MyComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Sheet</button>

      <BoundlessSheet open={open} setOpen={setOpen}>
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-white'>My Content</h2>
          <p className='text-gray-300'>This is the content inside the sheet.</p>
        </div>
      </BoundlessSheet>
    </div>
  );
};
```

## Advanced Usage

### Sheet with Title

```tsx
<BoundlessSheet
  open={open}
  setOpen={setOpen}
  title='My Sheet Title'
  minHeight='500px'
>
  <div className='space-y-4'>
    <p className='text-gray-300'>Content with a custom title in the header.</p>
  </div>
</BoundlessSheet>
```

### Right Side Sheet

```tsx
<BoundlessSheet open={open} setOpen={setOpen} side='right' maxHeight='90vh'>
  <div className='space-y-4'>
    <h2 className='text-xl font-semibold text-white'>Navigation Menu</h2>
    {/* Navigation content */}
  </div>
</BoundlessSheet>
```

### Custom Styled Sheet

```tsx
<BoundlessSheet
  open={open}
  setOpen={setOpen}
  title='Custom Styled Sheet'
  contentClassName='bg-gradient-to-br from-purple-900/90 to-blue-900/90'
  maxHeight='70vh'
  minHeight='600px'
>
  <div className='space-y-6'>{/* Custom styled content */}</div>
</BoundlessSheet>
```

### Sheet without Close Button

```tsx
<BoundlessSheet open={open} setOpen={setOpen} showCloseButton={false}>
  <div className='space-y-4'>
    <p className='text-gray-300'>
      This sheet has no close button - you need to handle closing
      programmatically.
    </p>
    <button onClick={() => setOpen(false)}>Close Sheet</button>
  </div>
</BoundlessSheet>
```

## Styling

The component uses Tailwind CSS classes and can be customized through:

- `className` prop for container styling
- `contentClassName` prop for content area styling
- CSS custom properties for fine-grained control

### Default Styling

```css
/* Base styles */
.bg-[#030303] /* Dark background */
.border-[rgba(255,255,255,0.10)] /* Subtle border */
.backdrop-blur-[10px] /* Backdrop blur effect */

/* Responsive classes */
/* Mobile: w-full mx-0 rounded-t-[20px] */
/* Tablet/Desktop: w-full max-w-4xl mx-auto rounded-t-[24px] */
```

## Accessibility Features

- **Keyboard Navigation**: ESC key closes the sheet
- **Focus Management**: Proper focus trapping and restoration
- **ARIA Labels**: Screen reader friendly with proper labels
- **Semantic HTML**: Uses proper HTML structure
- **High Contrast**: Designed for accessibility compliance

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Dependencies

- React 18+
- Radix UI Dialog
- Tailwind CSS
- Lucide React (for icons)

## Installation

The component is part of the Boundless UI library and requires the following dependencies:

```bash
npm install @radix-ui/react-dialog lucide-react
```

## Contributing

When contributing to this component:

1. Ensure responsive behavior works across all screen sizes
2. Test keyboard navigation and accessibility
3. Maintain TypeScript type safety
4. Follow the existing code style and patterns
5. Add comprehensive tests for new features

## License

This component is part of the Boundless project and follows the project's licensing terms.
