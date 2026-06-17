---
name: AuraSpa Digital Essence
colors:
  surface: '#fff8f5'
  surface-dim: '#e1d8d4'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf2ed'
  surface-container: '#f5ece7'
  surface-container-high: '#efe6e2'
  surface-container-highest: '#e9e1dc'
  on-surface: '#1e1b18'
  on-surface-variant: '#53433f'
  inverse-surface: '#34302c'
  inverse-on-surface: '#f8efea'
  outline: '#86736e'
  outline-variant: '#d9c1bc'
  surface-tint: '#904b39'
  primary: '#713323'
  on-primary: '#ffffff'
  primary-container: '#8e4a38'
  on-primary-container: '#ffcbbd'
  inverse-primary: '#ffb4a1'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#464642'
  on-tertiary: '#ffffff'
  tertiary-container: '#5e5d59'
  on-tertiary-container: '#d9d6d1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd2'
  primary-fixed-dim: '#ffb4a1'
  on-primary-fixed: '#3a0a01'
  on-primary-fixed-variant: '#723424'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e5e2dd'
  tertiary-fixed-dim: '#c9c6c2'
  on-tertiary-fixed: '#1c1c19'
  on-tertiary-fixed-variant: '#474743'
  background: '#fff8f5'
  on-background: '#1e1b18'
  surface-variant: '#e9e1dc'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '600'
    lineHeight: 72px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  section-padding-desktop: 120px
  section-padding-mobile: 64px
---

## Brand & Style

The design system is anchored in a philosophy of **Elevated Serenity**. It targets a discerning audience seeking wellness and luxury, prioritizing an emotional response of immediate decompression and professional trust. 

The aesthetic identity is a fusion of **High-End Minimalism** and **Classical Elegance**. It utilizes generous whitespace to signify "luxury of space" and "mental clarity." The visual language avoids the coldness of traditional tech minimalism by introducing tactile warmth through organic textures and a sophisticated color story. Every interaction should feel intentional, quiet, and refined, reflecting the physical experience of a premium spa environment.

## Colors

The palette is derived from natural elements—clay, sun-drenched stone, and precious metals—to create an atmosphere of warmth and grounded luxury.

- **Primary (Terracotta - #8E4A38):** Used for key call-to-actions, brand accents, and active states. It provides a grounded, earthy warmth.
- **Secondary (Soft Gold - #D4AF37):** Reserved for high-value details, iconography, and decorative borders. It should be used sparingly to maintain its prestige.
- **Tertiary (Warm Beige - #F5F2ED):** The primary surface color. It replaces pure white to reduce eye strain and evoke a more natural, parchment-like feel.
- **Neutral (Deep Charcoal - #2D2926):** Used for typography and deep structural elements to ensure high legibility and a sense of permanence.

Functional accents should use soft, desaturated variants of the primary terracotta for success/info states to maintain the muted, serene profile.

## Typography

The typography system relies on a high-contrast pairing of a sophisticated Serif and a refined Sans-Serif.

- **Headings:** Use **Playfair Display**. This serif typeface communicates heritage, elegance, and authoritative beauty. Large displays should utilize tighter tracking and generous leading.
- **Body & UI:** Use **Manrope**. Its modern, geometric construction ensures perfect legibility on digital screens while remaining approachable and clean.
- **Hierarchy:** Maintain significant vertical rhythm. Use `label-md` for overlines or small category tags to create a rhythmic "editorial" feel.

## Layout & Spacing

This design system employs a **Fixed Grid with Fluid Internal Padding**. 

- **Grid:** A 12-column grid for desktop (1280px max-width) with 24px gutters. Elements should be grouped to create asymmetrical layouts that feel organic and less "robotic."
- **Whitespace:** Use aggressive vertical padding between sections (120px+) to allow content to "breathe." This mimics the physical space found in luxury resorts.
- **Mobile:** Transition to a 4-column grid with 16px margins. Stack content vertically but maintain generous top/bottom margins to preserve the premium feel.

## Elevation & Depth

To maintain a minimalist and sophisticated profile, the system avoids heavy shadows. Depth is achieved through **Tonal Layering** and **Subtle Contrast**.

- **Surfaces:** Use shifts in background tone (e.g., a slightly darker beige or a very soft terracotta wash) to differentiate sections.
- **Borders:** Instead of shadows, use 1px solid borders in a color slightly darker than the surface (e.g., #E5E1DA) or a Soft Gold (#D4AF37) for featured items.
- **Hover States:** Subtle "lift" can be achieved via a very soft, high-diffusion shadow: `0px 10px 30px rgba(45, 41, 38, 0.05)`.
- **Glassmorphism:** Use sparingly for navigation bars or overlays. A light blur (12px) with 80% opacity of the Tertiary color creates a "frosted" luxury effect.

## Shapes

The shape language is primarily **Soft and Architectural**. 

- **Corners:** Elements use a consistent 0.25rem (Soft) radius. This provides just enough curvature to feel welcoming without losing the professional structure of a high-end brand.
- **Imagery:** Large hero images and gallery cards should feature either sharp 0px corners or very subtle 4px rounds to maintain an editorial, magazine-like appearance.
- **Decorative:** Use circular motifs for background ornaments or quote marks to contrast with the rectangular grid.

## Components

- **Buttons:** Primary buttons use the Terracotta background with White text. Secondary buttons should be Ghost style with a Soft Gold border and Charcoal text. Use high internal padding (16px 32px) for a "spacious" click area.
- **Input Fields:** Minimalist design with only a bottom-border (1px solid) in the default state. Focus state animates the border to Terracotta. Labels use `label-sm` above the field.
- **Cards:** Cards should have no borders or shadows by default, sitting on a slightly different tonal background. Content is centered with generous internal padding (40px).
- **Booking Widget:** A floating, persistent component. Use the tertiary color with a subtle 1px gold border to make it feel like an "invitation" rather than a tool.
- **Date Pickers:** Use a clean, sans-serif grid with the Primary color for selection circles.
- **Imagery Containers:** All photos should have a slight warm filter or "grain" overlay to match the brand's tactile warmth.