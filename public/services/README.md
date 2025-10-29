# Service Detail Page Assets

This directory contains placeholder SVG assets for the Service Detail pages. These placeholders should be replaced with professional, high-quality vector illustrations.

## Asset Structure

Each service has its own directory under `public/services/<service-slug>/` containing:

- `hero-bg.svg` - Full-width hero banner background (1440x600px recommended)
- `offerings.svg` or `expertise.svg` or `capabilities.svg` - Section illustration (800x600px recommended)
- `why-choose.svg` - Section illustration for "Why Choose Us" (800x600px recommended)

## Design Guidelines

### Style Guide
- **Colors**: Use the brand gradient (indigo #4F46E5 → blue #2563EB → cyan #06B6D4)
- **Style**: Clean tech style, semi-isometric, modern
- **Effects**: Glassmorphism accents, subtle glow, clear negative space
- **Accessibility**: Ensure contrast ratios meet WCAG AA standards

### Hero Background SVG
- Size: 1440x600px viewBox
- Format: Optimized SVG with gradients
- Content: Abstract geometric shapes, tech patterns, flowing gradients
- Background: Transparent or gradient fill

### Section Illustrations
- Size: 800x600px viewBox
- Format: Optimized SVG
- Content: Service-specific illustrations (devices, dashboards, workflows)
- Style: Minimal, 2-3 primary objects, soft gradients

## Replacing Placeholders

To replace the placeholder SVGs:

1. Create professional illustrations matching the service theme
2. Export as optimized SVG files
3. Replace the placeholder files in the respective service directories
4. Ensure file names match exactly (case-sensitive)
5. Test the page to ensure images load correctly

## Note

PNG fallbacks are also supported. If you add PNG versions, name them the same as the SVG files but with `.png` extension. The AssetImage component will automatically fallback to PNG if SVG fails to load.

