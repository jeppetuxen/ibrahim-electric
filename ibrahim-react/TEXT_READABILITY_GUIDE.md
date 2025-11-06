# Text Readability Over Images - CSS Techniques

## Available CSS Classes

### 1. Text Shadows (Most Common)

**Strong Shadow** - Best for large text over busy images
```jsx
<h1 className="text-shadow-strong">Your Text Here</h1>
```
- Triple-layered shadow
- High contrast
- Great for headers

**Medium Shadow** - Subtle for smaller text
```jsx
<p className="text-shadow-medium">Your paragraph</p>
```
- Lighter shadow
- Good for body text

**Glow Effect** - Halo around text
```jsx
<h2 className="text-shadow-glow">Glowing Text</h2>
```
- Creates glow/halo
- Works on light or dark images

### 2. Background Blur Box

**Backdrop Blur** - Blurs the image behind text
```jsx
<div className="backdrop-blur-text">
  <h2>Text with blurred background</h2>
  <p>More readable content</p>
</div>
```
- Blurs image behind
- Semi-transparent black background
- Modern glassmorphism look

### 3. Gradient Background

**Dark Gradient Box** - Contained dark background
```jsx
<div className="text-bg-gradient">
  <h2>Text in gradient box</h2>
</div>
```
- Dark to darker gradient
- Padding included
- Rounded corners

### 4. Scrim Overlay

**Full Section Overlay** - Darkens entire background
```jsx
<section className="scrim-overlay">
  <h1>Content automatically readable</h1>
  <p>Overlay behind all content</p>
</section>
```
- Gradient from light to dark (top to bottom)
- Affects entire section
- Content stays above overlay

### 5. Text Stroke (Advanced)

**Outline Effect** - Adds stroke around letters
```jsx
<h1 className="text-stroke">Outlined Text</h1>
```
- Adds black outline
- Webkit text stroke
- Use sparingly

## Combining Techniques

You can combine multiple classes:

```jsx
// Strong contrast for important text
<h1 className="text-shadow-strong text-stroke">
  Maximum Readability
</h1>

// Subtle box with shadow
<div className="backdrop-blur-text">
  <p className="text-shadow-medium">
    Readable paragraph text
  </p>
</div>
```

## Examples from Our Site

### Intro Quotes (Current Implementation)
```jsx
<p className="text-shadow-strong hover:text-accent-orange">
  "BETTER THAN VIAGRA"
</p>
```

### Alternative: Backdrop Blur Box
```jsx
<blockquote className="backdrop-blur-text max-w-4xl mx-auto">
  <p className="text-shadow-medium">"Your quote here"</p>
</blockquote>
```

### Alternative: Full Scrim Overlay
```jsx
<section className="relative min-h-screen scrim-overlay">
  {/* Background image */}
  <div className="absolute inset-0">
    <img src="bg.jpg" />
  </div>

  {/* Text automatically readable */}
  <div className="relative z-10">
    <h1>No extra classes needed!</h1>
  </div>
</section>
```

## Customization

### Adjust Shadow Strength
In `index.css`, modify values:
```css
.text-shadow-strong {
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.9),  /* Darker = 0.9 */
    0 4px 8px rgba(0, 0, 0, 0.7),  /* More opaque */
    0 8px 16px rgba(0, 0, 0, 0.5);
}
```

### Adjust Blur Amount
```css
.backdrop-blur-text {
  backdrop-filter: blur(12px);  /* Increase for more blur */
  background: rgba(0, 0, 0, 0.6); /* Darker background */
}
```

### Custom Scrim Colors
```css
.scrim-overlay::before {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 255, 0.3),    /* Blue tint */
    rgba(0, 0, 0, 0.8)       /* Fade to black */
  );
}
```

## Best Practices

1. **Large Text**: Use `text-shadow-strong`
2. **Small Text**: Use `backdrop-blur-text` or `text-bg-gradient`
3. **Entire Sections**: Use `scrim-overlay` on parent
4. **Hover Effects**: Combine with `hover:` utilities
5. **Mobile**: Test on small screens - shadows may need adjustment

## Performance Notes

- Text shadows: ✅ Very performant
- Backdrop filter: ⚠️ Slightly heavier (but fine for modern browsers)
- Scrim overlays: ✅ Very performant
- Mix-blend-mode: ⚠️ Can be heavy, use sparingly

## Browser Support

- Text shadow: ✅ All browsers
- Backdrop filter: ✅ All modern browsers (95%+ support)
- Text stroke: ✅ All webkit browsers (Safari, Chrome) + fallback
