# IG Design System

**Owner:** Iasonas Georgiadis

This project is a **scalable design system** designed to support various products and applications. Built with React + Vite, it features a flexible three-accent color architecture that enables designers to map branding colors at the semantic level, automated development workflows, quality assurance agents, and seamless Figma integration.

## Scalable Architecture for Multi-Product Support

The IG Design System is architected to serve as a foundation for multiple products, each with their own unique branding requirements. The system provides:

### Three-Accent Color System
- **Primary Accent** (Blue): Main brand color for primary actions and key interface elements
- **Secondary Accent** (Grey): Supporting neutral tones for backgrounds and secondary elements
- **Tertiary Accent** (Red): Accent color for alerts, warnings, and special highlighting

### Semantic Branding Flexibility
Each accent color includes a complete range from lightest to darkest variations, plus alpha transparency variants. Designers can easily map these semantic color roles to match any product's brand identity:

- **Brand Primary** → Maps to product's main brand color
- **Brand Secondary** → Maps to product's supporting color palette
- **Brand Tertiary** → Maps to product's accent/highlight color

This approach ensures visual consistency across all products while maintaining each product's unique brand expression through the semantic token layer.

## Automated Agents

This project includes 10 specialized agents that automatically assist with development tasks:

### Core Development Agents
- **design-verification**: Verifies component implementations match Figma designs and use correct tokens
- **component-composition-reviewer**: Reviews component creation/modification with nested components
- **token-analyzer**: Analyzes component token usage patterns and provides optimization recommendations

### Accessibility Agents
- **a11y-accessibility-orchestrator**: Main coordinator for comprehensive accessibility audits using Playwright MCP and axe-core
- **a11y-wcag-compliance-auditor**: Specialized WCAG 2.1 AA/AAA compliance testing and legal compliance assessment
- **a11y-color-contrast-specialist**: Expert color contrast analysis with designer-friendly recommendations
- **a11y-keyboard-navigation-tester**: Comprehensive keyboard accessibility testing and validation
- **a11y-screen-reader-tester**: Screen reader compatibility and ARIA implementation testing

### Quality Assurance
- **claude-md-compliance-checker**: Ensures all project guidelines are followed (mandatory final step for every task)

These agents work together to maintain code quality, accessibility standards, and design consistency throughout the development process.

# Technology Stack

This scalable design system is built with modern tools optimized for multi-product development:

- **React 19** + **Vite 7** for fast development and optimized builds
- **TypeScript** for type safety and improved developer experience across teams
- **Storybook** for component development, documentation, and cross-team collaboration
- **Figma Code Connect** for design-to-code integration and design system consistency
- **Playwright** for automated testing and accessibility compliance
- **ESLint** for code quality and consistent coding standards
- **CSS Custom Properties** for semantic token architecture enabling easy brand theming

## Brand & Logo Support

The logo implementation mirrors the token layering approach so designers can ship updates without code changes.

### Repository layout
- `brand/logos/master/` – editable master exports (SVG for Wiley, high-res PNG for WOL) that mirror the canonical Figma artwork.
- `public/brand/logos/web/` – optimized assets served by the app at runtime.
- `src/styles/tokens/logo.css` – logo-specific tokens covering sizes, clear space, and canonical asset paths.
- `src/components/Brand/Logo/` – React component and styles that read the tokens and select the right brand/form/light–dark variant.
- `brand/LOGO_GUIDE.md` – designer-facing walkthrough for the full workflow.

### Update workflow
1. Apply changes in Figma (source of truth).
2. Export masters to `brand/logos/master/` and web-ready files (PNG for WOL, SVG for Wiley) to `public/brand/logos/web/`, preserving filenames.
3. Commit the updated assets; the `Logo` component picks them up automatically via the tokens.
4. Preview in Storybook (`Logo.stories.tsx`) before release when needed.

## CLAUDE.md Configuration Structure

This project uses a modular CLAUDE.md structure for organized development guidelines:

### Directory-Specific Guidelines
- **Root CLAUDE.md**: Global rules and agent workflow overview
- **src/components/CLAUDE.md**: Component development guidelines
- **src/figma/CLAUDE.md**: Figma Code Connect guidelines
- **src/styles/CLAUDE.md**: Design token and styling rules
- **src/CLAUDE.md**: General source code guidelines
- **.claude/agents/CLAUDE.md**: Detailed agent configurations

Each directory contains specific rules and guidelines that apply to files within that location, ensuring consistent development practices across the entire codebase.

## MCP Servers

The project integrates several MCP (Model Context Protocol) servers for enhanced functionality:

### Figma Integration
- **Figma Dev Mode MCP Server**: Provides direct integration with Figma designs, enabling automatic code generation, design verification, and Code Connect functionality

### Testing and Quality Assurance
- **Playwright MCP**: Automated browser testing and accessibility auditing capabilities

### Documentation and Context
- **Context7**: Real-time documentation retrieval and context-aware development assistance

### IDE Integration
- **IDE MCP**: Enhanced VS Code integration with diagnostics and code execution capabilities

These MCP servers work together to provide a comprehensive development environment that bridges design, code, and quality assurance.

## Getting Started

### Development
```bash
npm run dev          # Start development server
npm run storybook    # Launch Storybook for component development
```

### Build & Quality
```bash
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Project Structure
- `src/components/` - Reusable UI components with stories
- `src/styles/` - Design tokens and styling utilities
- `src/figma/` - Figma Code Connect files
- `.claude/agents/` - Agent configuration files
- `brand/` - Brand assets and logo documentation
