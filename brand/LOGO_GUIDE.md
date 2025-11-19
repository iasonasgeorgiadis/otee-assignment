# Logo Assets Guide

This guide explains where the OTee logo files live, how the front-end consumes them, and how designers can publish updates without touching code.

## Repository layout
- `brand/logos/master/` – editable source exports for the light and dark OTee logos. Keep these in sync with the canonical artwork stored in Figma.
- `public/brand/logos/web/` – optimized files that ship with the site. The React logo component points to the files in this folder at runtime.
- `src/styles/tokens/logo.css` – design tokens that declare logo sizing, spacing, and the canonical asset paths. Engineers use these tokens when rendering the logo component.
- `src/components/Brand/Logo/` – React implementation (`Logo.tsx` + `Logo.css`) that reads the tokens and selects the correct color-mode variant at runtime. Storybook stories in the same folder document usage and approved combinations.

### How the pieces work together
1. Designers update Figma, export the latest logos (light + dark) and drop the source SVGs into `brand/logos/master/`.
2. The same files—optimized for the web—are copied into `public/brand/logos/web/`. The Logo component consumes assets directly from this directory.
3. `src/styles/tokens/logo.css` exposes sizing, clear-space, and asset paths as named tokens.
4. `Logo.tsx` consumes those tokens, picking the right color-mode combination at runtime without hardcoding dimensions.
5. Storybook (`Logo.stories.tsx`) showcases the component so teams can review updates before shipping.

## Updating the logo from Figma
1. Open the official logo in Figma and make your edits there. Figma remains the source of truth.
2. Export two files using the existing naming convention:
   - **Master exports** → drop `otee-logo-light.svg` and `otee-logo-dark.svg` into `brand/logos/master/`.
   - **Web exports** → overwrite the matching files in `public/brand/logos/web/` with the optimized variants.
3. Commit the updated files or hand them to a developer to commit. No code changes are required as long as filenames remain identical.

## Naming conventions
Each variant follows `otee-logo-{{mode}}.svg`:
- `mode` – `light` or `dark`
- `ext` – always `svg`

## Quality checklist
- Confirm the exported artwork matches Figma’s clear-space and minimum-size guidance.
- Verify dark-mode versions have transparent backgrounds and correct colors.
- Keep file sizes lean (<200 KB) to avoid layout jank.

Following these steps keeps design changes fully under your control while ensuring the front-end always serves the approved OTee logo variants.
