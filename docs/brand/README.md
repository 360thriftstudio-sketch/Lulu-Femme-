# Lulu Femme theme & type system

A rebrand proposal for the website's colours and typography. **The logo is not changed.**

| File | What it is |
| --- | --- |
| `style-guide.pdf` | The full guide (A4, 18 pages): logo constraints, 3 colour directions, contrast checks, usage, 3 font pairings, type scale, UI components, mockups, handoff, checklist |
| `style-guide.html` | The same guide as a web page |
| `swatches.png` | Swatch sheet of the three colour directions |
| `tokens.css` | CSS custom properties: Atelier Burgundy (default + dark mode), `[data-brand="rose"]`, `[data-brand="noir"]`, fluid type scale, base/button/form styles |
| `_tokens.scss` | Sass maps plus `lf-color()`, `lf-theme-vars()` and `lf-type()` |
| `tokens.json` | Design tokens for Figma Tokens / Style Dictionary |
| `mockup.html`, `mockup-desktop.png`, `mockup-mobile.png` | Home page mockup in the recommended direction |
| `brand-data.mjs` | Single source of truth for every value |
| `build.mjs` | Regenerates everything above |

## Rebuild

```bash
npm run brand:build
# behind a TLS-inspecting proxy that Chromium doesn't trust:
FONTS_VIA_CURL=1 npm run brand:build
# use a specific Chromium:
PW_CHROMIUM_PATH=/path/to/chrome npm run brand:build
```

Change a value in `brand-data.mjs`, rebuild, and the tokens, contrast tables, PDF and mockups all update together.

## Recommendation

- **Colour:** Atelier Burgundy. Burgundy `#632D43` for actions and headings, ivory `#F7F1E8` page background, blush `#EAD6D9` tints, logo pink `#E3165B` only for the logo, focus ring and small highlights.
- **Type:** Cormorant Garamond (headings, 24px and up) + Manrope (body, UI, prices).
- **Accessibility:** ivory on burgundy is 9.4:1 (AAA). Muted rose `#BC8A95` fails as text (2.6:1), so it is decorative only; use Rose ink `#8A5A67` for rose-coloured text. The logo must never sit on burgundy (2.3:1) or muted rose (1.6:1).

## Implementation checklist

1. Sign off the direction and font pairing.
2. Load Cormorant Garamond 500/600/500 italic and Manrope 400–700 with `next/font`; remove Anton.
3. Replace the colour variables in `app/globals.css` with the token values (mapping in the guide, chapter 08).
4. Audit every logo placement: ivory, warm white, blush or Night only.
5. Primary buttons burgundy/ivory; secondary burgundy outline; links burgundy, hover pink ink.
6. One focus style: 3px logo-pink outline, 2px offset.
7. Field borders use `--lf-border-strong` (3:1); errors use garnet text + border + icon + message.
8. Swap any rose text or icons to rose ink.
9. Apply the dark-mode tokens and re-check the contrast table.
10. Run `npm run test:a11y` and review key pages at 375, 768, 1024 and 1440px.
11. Update Open Graph images and favicon background; spot-check on a real phone.
