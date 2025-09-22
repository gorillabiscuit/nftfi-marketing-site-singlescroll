# Testimonial Avatar Images

This directory contains profile pictures for the testimonial cards in Section 5.

## Image Requirements:
- Format: JPG, PNG, or WebP
- Size: 48x48px minimum (will be scaled to fit)
- Aspect Ratio: 1:1 (square)
- Quality: Web-optimized

## Naming Convention:
Images should match the profile picture paths defined in `/data/testimonials.json`:
- `sergito.jpg`
- `phantom.jpg` 
- `benroy.jpg`
- `pranksy.jpg`
- etc.

## Fallback Behavior:
If an image fails to load, the testimonial card will display the user's initials instead, styled with a gradient background.

## Adding New Images:
1. Add the image file to this directory
2. Update the `profilePicture` path in the testimonials JSON data
3. Ensure the image is web-optimized for fast loading
