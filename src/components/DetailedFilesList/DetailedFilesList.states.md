# DetailedFilesList – Atomic Element × State Matrix

| Element / State | Default | Hover | Focus-within |
| --- | --- | --- | --- |
| Container | Background `var(--igds-detailed-files-list-background-default)`, radius `var(--igds-detailed-files-list-radius)` | Background `var(--igds-detailed-files-list-background-hover)` | Matches hover background so keyboard users get identical feedback |
| Thumbnail | 40px square (`--thumbnail-size`) with border `--thumbnail-border-color`, renders Material Icon `picture_as_pdf` (outlined) sized by `--thumbnail-icon-size`; optional uppercase label (via `fileTypeLabel`) uses `--thumbnail-font-*` tokens | No visual change per Figma | No change |
| File name | Body Small Strong typography (tokens `--name-font-*`), ellipsis overflow | No change | No change |
| File size | Body Small Medium (`--meta-*` tokens) color `--meta-color` | No change | No change |
| Action button | Neutral ghost button with Material `close` icon (outlined, 20px) using `--action-color` | Button component handles hover background + focus ring | Button component focus ring + hover background remain active |

Notes:
- `forceHover` prop mirrors the hover visuals programmatically for documentation/QA snapshots.
- Icon-only action enforces accessible `aria-label` via `actionAriaLabel` (defaults to “Remove {fileName}”).
