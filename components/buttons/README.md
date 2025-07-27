# Boundless Button Components

This folder contains custom button components built on top of the shadcn Button component, specifically designed for the Boundless platform.

## BoundlessButton

A comprehensive button component that extends the base shadcn Button with Boundless-specific variants and features.

### Features

- **Boundless-specific variants**: funding, grant, milestone, verify, escrow
- **Loading states**: Built-in loading spinner and disabled state
- **Icon support**: Left or right positioned icons
- **State management**: Success, error, pending states
- **Extended sizes**: Includes xl size for prominent actions

### Usage

```tsx
import { BoundlessButton } from '@/components/buttons'

// Basic usage
<BoundlessButton>Click me</BoundlessButton>

// With variants
<BoundlessButton variant="funding">Fund Project</BoundlessButton>
<BoundlessButton variant="grant">Apply for Grant</BoundlessButton>
<BoundlessButton variant="milestone">Submit Milestone</BoundlessButton>
<BoundlessButton variant="verify">Verify Progress</BoundlessButton>
<BoundlessButton variant="escrow">Release Funds</BoundlessButton>

// With loading state
<BoundlessButton loading>Processing...</BoundlessButton>

// With icons
<BoundlessButton icon={<PlusIcon />}>Create Campaign</BoundlessButton>
<BoundlessButton icon={<ArrowRightIcon />} iconPosition="right">
  Continue
</BoundlessButton>

// With states
<BoundlessButton state="success">Success!</BoundlessButton>
<BoundlessButton state="error">Error occurred</BoundlessButton>
<BoundlessButton state="pending">Pending approval</BoundlessButton>

// Different sizes
<BoundlessButton size="sm">Small</BoundlessButton>
<BoundlessButton size="lg">Large</BoundlessButton>
<BoundlessButton size="xl">Extra Large</BoundlessButton>
```

### Variants

- `default` - Standard primary button
- `destructive` - For dangerous actions
- `outline` - Bordered button
- `secondary` - Secondary action button
- `ghost` - Minimal styling
- `link` - Link-style button
- `funding` - Green button for funding actions
- `grant` - Purple button for grant actions
- `milestone` - Blue button for milestone actions
- `verify` - Orange button for verification actions
- `escrow` - Amber button for escrow actions

### Sizes

- `sm` - Small (32px height)
- `default` - Default (36px height)
- `lg` - Large (40px height)
- `xl` - Extra Large (48px height)
- `icon` - Square icon button (36px)

### States

- `default` - Normal state
- `loading` - Shows spinner and disables button
- `success` - Green success state
- `error` - Red error state
- `pending` - Yellow pending state 
