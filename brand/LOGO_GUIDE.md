# Logo Assets Guide

This guide explains where the logo files live, how the front-end consumes them, and how designers can publish updates without touching code.

## Repository layout
- `brand/logos/master/` – editable source exports (SVG for Wiley, high-res PNG for WOL). Keep these in sync with the canonical artwork stored in Figma.
- `public/brand/logos/web/` – optimized files that ship with the site. The React logo component points to the files in this folder at runtime.
- `src/styles/tokens/logo.css` – design tokens that declare logo sizing, spacing, and the canonical asset paths. Engineers use these tokens when rendering the logo component.
- `src/components/Brand/Logo/` – React implementation (`Logo.tsx` + `Logo.css`) that reads the tokens and selects the correct asset variant. Storybook stories in the same folder document usage and approved combinations.

### How the pieces work together
1. Designers update Figma, export masters and web assets (see next section).
2. The web assets are served directly from `public/brand/logos/web/`.
3. `src/styles/tokens/logo.css` exposes sizing, clear-space, and asset paths as named tokens.
4. `Logo.tsx` consumes those tokens, picking the right brand/form/light–dark combination at runtime without hardcoding paths or dimensions.
5. Storybook (`Logo.stories.tsx`) showcases the same component so teams can review updates before shipping.

## Updating the logo from Figma
1. Open the official logo in Figma and make your edits there. Figma remains the source of truth.
2. Export two sets of files using the existing naming convention:
   - **Master exports** → drop the files into `brand/logos/master/` so the repo captures the latest artwork.
   - **Web exports** → export the optimized variants (PNG for WOL, SVG for Wiley) and overwrite the matching files in `public/brand/logos/web/`.
3. Commit the updated files or hand them to a developer to commit. No code changes are required as long as filenames remain identical.

## Naming conventions
Each variant follows `{{brand}}-logo-{{form}}-{{mode}}.ext`:
- `brand` – `wol` or `wiley`
- `form` – `full` (wordmark) or `compact` (icon)
- `mode` – `light` or `dark`
- `ext` – `png` for WOL, `svg` for Wiley

## Quality checklist
- Confirm the exported artwork matches Figma’s clear-space and minimum-size guidance.
- Verify dark-mode versions have transparent backgrounds and correct colors.
- Keep file sizes lean (<200 KB) to avoid layout jank.

Following these steps keeps design changes fully under your control while ensuring the front-end always serves the approved logo variants.
