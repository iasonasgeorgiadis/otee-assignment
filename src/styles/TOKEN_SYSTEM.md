# Design Token System Guide

## Overview

This guide outlines the token architecture, naming conventions, and principles for the IGDS Design System. Our token system uses a three-layer architecture that maintains 1:1 mapping with Figma while providing developer-friendly patterns.

## Token Architecture

```
1. PRIMITIVES (Raw values)
   ↓
2. BRAND PALETTE (Design language)
   ↓
3. SEMANTIC (Context-specific usage)
```

### Layer 1: Primitives
Raw values that serve as building blocks.
```css
--igds-color-blue-500: #2c7ac3;
--igds-space-16: 1rem;
--igds-radius-md: 0.5rem;
```

### Layer 2: Brand Palette
Your design language abstraction that maps to Figma's "Primitives: Branding" collection.
```css
--igds-color-brand-primary-lightest: var(--igds-color-blue-50);
--igds-color-brand-primary: var(--igds-color-blue-500);
--igds-color-brand-primary-darkest: var(--igds-color-blue-900);
```

### Layer 3: Semantic
Context-specific tokens that define usage.
```css
--igds-color-text-primary: var(--igds-color-brand-primary-darker);
--igds-color-background-primary: var(--igds-color-brand-primary-light);
--igds-color-border-primary: var(--igds-color-brand-primary-dark);
```

## Core Principles

### 1. Default Pattern
**No suffix = recommended usage for that context**

- `--igds-color-text-primary` = the default/recommended text color
- `--igds-color-background-primary` = the default/recommended background color
- Variants use explicit suffixes: `-light`, `-dark`, `-contrast`

### 2. Absolute Positioning
Modifiers describe absolute positions on the color scale, not relative to default.

```css
/* ✅ CORRECT: Absolute scale */
--igds-color-text-primary-lightest   /* ALWAYS the lightest option */
--igds-color-text-primary-light      /* ALWAYS on the light side */
--igds-color-text-primary            /* DEFAULT (can be any position) */
--igds-color-text-primary-dark       /* ALWAYS on the dark side */
--igds-color-text-primary-darkest    /* ALWAYS the darkest option */
```

### 3. Context-Specific Scales
Different contexts need different numbers of variants:

- **Text**: 6 levels (including contrast)
- **Backgrounds**: 7 levels (full range)
- **Borders**: 4-5 levels (as needed)
- **Icons**: Similar to text

### 4. Flexible Mapping
Semantic tokens can map to different brand positions based on context needs:

```css
/* Text (optimized for readability) */
--igds-color-text-primary: var(--igds-color-brand-primary-darker);

/* Background (optimized for subtlety) */
--igds-color-background-primary: var(--igds-color-brand-primary-light);
```

## Naming Conventions

### Intensity Scale
Use these intensity modifiers that map to absolute positions on the color scale:

```
lightest → lighter → light → medium → DEFAULT → dark → darker → darkest
```

**Important**: These represent absolute positions, not relative to the default:
- `lightest` = always the lightest value available
- `medium` = middle intensity (may be lighter or darker than default depending on context)
- `darkest` = always the darkest value available
- `DEFAULT` (no suffix) = the recommended value for that specific context

### Special Cases

#### "Contrast" for Text & Icons
Use `contrast` instead of `lightest` when the purpose is high contrast:

```css
--igds-color-text-primary-contrast   /* For use on dark backgrounds */
--igds-color-icon-primary-contrast   /* For use on dark backgrounds */
```

#### "On-" Prefix Pattern
For foreground elements on specific backgrounds:

```css
--igds-color-text-on-primary         /* Text color for primary backgrounds */
--igds-color-icon-on-success         /* Icon color for success backgrounds */
```

### Neutral Colors
For neutral colors, primary/secondary/tertiary refer to **emphasis levels**, not brand tiers:

```css
--igds-color-text-neutral-primary    /* Highest emphasis (darkest) */
--igds-color-text-neutral-secondary  /* Standard emphasis */
--igds-color-text-neutral-tertiary   /* Reduced emphasis */
```

## Figma Integration

### Variable Structure in Figma

```
Colors/
├── Text/
│   └── Accent/
│       └── Primary/
│           ├── darkest     → "Headers, maximum emphasis"
│           ├── darker      → "Strong emphasis"
│           ├── DEFAULT     → "Body text"
│           ├── light       → "Secondary text"
│           ├── lighter     → "Captions, metadata"
│           └── contrast    → "Text on dark backgrounds"
├── Background/
│   └── Accent/
│       └── Primary/
│           ├── lightest    → "Minimal emphasis"
│           ├── lighter     → "Very subtle"
│           ├── light       → "Subtle backgrounds"
│           ├── DEFAULT     → "Standard backgrounds"
│           ├── dark        → "Emphasis areas"
│           ├── darker      → "Strong backgrounds"
│           └── darkest     → "Hero sections"
└── System/
    ├── Success            → Single reference color
    ├── Warning            → Single reference color
    ├── Danger             → Single reference color
    └── Information        → Single reference color
```

### Designer Workflow
1. **Choose by purpose**, not by color value
2. **Start with defaults** (no suffix) unless specific variant needed
3. **Use contrast variants** for accessibility requirements
4. **Reference system colors** for consistent state messaging

## System Colors

Keep system colors **minimal and focused**:

```css
/* Base system colors (single source of truth) */
--igds-color-system-success: var(--igds-color-green-600);
--igds-color-system-warning: var(--igds-color-orange-700);
--igds-color-system-danger: var(--igds-color-red-700);
--igds-color-system-information: var(--igds-color-blue-600);

/* Alpha versions (one opacity level each) */
--igds-color-system-alpha-success: rgba(58, 127, 59, 0.10);
--igds-color-system-alpha-warning: rgba(148, 47, 0, 0.10);
--igds-color-system-alpha-danger: rgba(102, 0, 0, 0.10);
--igds-color-system-alpha-information: rgba(32, 107, 213, 0.10);
```

**Expand at semantic level:**
```css
--igds-color-background-success: var(--igds-color-green-50);      /* Light bg */
--igds-color-background-success-strong: var(--igds-color-system-success); /* Full intensity */
--igds-color-text-success: var(--igds-color-system-success);     /* Text uses base */
--igds-color-border-success: var(--igds-color-system-success);   /* Border uses base */
```

## Usage Examples

### For Designers (Figma)
```
Need body text color?
→ Use "Text/Accent/Primary/Default"

Need emphasized heading?
→ Use "Text/Accent/Primary/Darker" or "Text/Accent/Primary/Darkest"

Need text on dark button?
→ Use "Text/Accent/Primary/Contrast"

Need subtle background?
→ Use "Background/Accent/Primary/Light" or "Background/Accent/Primary/Lighter"
```

### For Developers (CSS)
```css
/* Standard text */
color: var(--igds-color-text-primary);

/* Emphasized text */
color: var(--igds-color-text-primary-darker);

/* Text on dark background */
color: var(--igds-color-text-primary-contrast);

/* Subtle background */
background: var(--igds-color-background-primary-light);

/* Success message */
color: var(--igds-color-text-success);
background: var(--igds-color-background-success);
```

## Guidelines

### Best Practices

- **Use defaults first** - Start with no-suffix tokens unless you need a variant
- **Choose by purpose** - Select tokens based on their intended use, not color value
- **Keep system colors minimal** - Let semantic layer handle variations
- **Use "contrast" for accessibility** - When you need high contrast variants
- **Document intent** - Focus on when to use tokens, not their technical mappings
- **Map flexibly** - Different contexts can map to different brand positions

### Avoid

- **Create unnecessary variants** - Only add tokens you actually need
- **Mix relative and absolute naming** - Stick to absolute positioning ("dark" always means dark)
- **Force perfect symmetry** - Different contexts need different numbers of variants
- **Expose technical mappings** - Users should interact with semantic layer
- **Over-engineer system colors** - Resist adding multiple emphasis levels to system colors

## Future Considerations

As the system grows:

1. **New contexts** may need their own scales (e.g., chart colors, data visualization)
2. **State tokens** can be added as separate semantic tokens (hover, active, selected)
3. **Component tokens** may be needed for complex components with coordinated color relationships
4. **Dark mode** can be added by swapping primitive values while keeping semantic structure

## Success Metrics

- **Designers** can quickly find the right token without guessing
- **Developers** can predict token behavior without checking definitions
- **New team members** can understand the system within 30 minutes
- **Token usage** is consistent across components and projects

---

*This documentation reflects the token architecture decisions and naming conventions established through collaborative design and development review. Update this document when making architectural changes to maintain system consistency.*