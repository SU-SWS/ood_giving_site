# Copilot Instructions for Stanford Giving Site

## Architecture Overview

This is a **Next.js 15+ headless CMS site** using **Storyblok** for content management, deployed on **Netlify**. The site follows a component-based architecture where Storyblok content types map to React components.

### Key Stack Components
- **Frontend**: Next.js App Router with TypeScript
- **CMS**: Storyblok headless CMS with visual editor
- **Styling**: TailwindCSS + Stanford's Decanter design system
- **Deployment**: Netlify with custom build plugins
- **Environment**: Vault-based secret management

## Storyblok Integration Patterns

### Component Registration
All Storyblok components must be registered in `utilities/storyblok.tsx` in the `components` object. Components follow the naming convention:
- Storyblok: `SbComponentName` (e.g., `SbPage`, `SbBasicCard`)
- Regular: Descriptive names (e.g., `Container`, `Typography`)

### Content Fetching
- Use `getStoryDataCached()` from `utilities/data/getStoryData.ts` for page-level content
- Cache tags: `['story', 'page']` for invalidation
- Always handle 404 responses: `{ data: 404 }`

### Storyblok Component Structure
```typescript
// Standard Storyblok component pattern
interface SbComponentProps {
  blok: ComponentStoryblok; // Generated type from Storyblok
}

export const SbComponent = ({ blok }: SbComponentProps) => {
  // Component implementation
};
```

## Development Environment Setup

### Required Environment Variables
1. Copy `example.env` to `.env`
2. Add `VAULT_ROLE_ID` and `VAULT_SECRET_ID` (get from Netlify or team)
3. Run `npm run vault:local` to fetch remaining vars from Vault
4. Use `npm run dev` for development

### HTTPS Development (Storyblok Editor)
Storyblok visual editor requires HTTPS:
1. `npm run dev` (starts HTTP on :3000)
2. `npm run https-proxy-start` (HTTPS proxy on :3010)
3. Use https://localhost:3010 in Storyblok editor

## Styling Conventions

### Design System Integration
- **Decanter preset**: Stanford's design system in `tailwind.config.ts`
- **Color system**: Use `datasource.ts` color mappings (e.g., `bgColors`, `cardBgColors`)
- **Responsive spacing**: Use `rs-` prefixed classes (e.g., `rs-pt-4`, `rs-mb-2`)
- **Typography**: Modular scale via `modTypeSizes` in `datasource.ts`

### Component Styling Pattern
```typescript
// Use cnb (cnbuilder) for conditional classes
import { cnb } from 'cnbuilder';

const classes = cnb(
  'base-classes',
  conditionalClass && 'conditional-classes',
  bgColors[bgColor] // Map from datasource
);
```

## Critical File Locations

### Component Architecture
- `/components/Storyblok/` - CMS-connected components
- `/components/` - Reusable UI components (Typography, Container, etc.)
- `/utilities/storyblok.tsx` - Component registration and Storyblok client config

### Data & Utilities
- `/utilities/data/` - Data fetching functions with caching
- `/utilities/datasource.ts` - Design system mappings and constants
- `/utilities/resolveRelations.ts` - Storyblok relation resolving

### Configuration
- `middleware.ts` - Storyblok editor authentication
- `next.config.ts` - Includes cache handler hack for 2MB limit

## Common Patterns

### Error Handling
- Always use `try/catch` for Storyblok API calls
- Handle 404s explicitly: `return { data: 404 }`
- Use `ComponentNotFound` for missing Storyblok components

### Caching Strategy
- **Static-first approach**: Content is primarily static and should be rendered as static pages with maximum caching
- Page-level: `unstable_cache` with story/page tags for data fetching
- Global data: Separate cached functions for alerts, search config
- **No cache invalidation**: We never invalidate cache - instead rely on atomic deployments
- **Netlify serverless optimization**: Site is optimized for serverless hosting with static generation

### Environment Detection
- Use `getActiveEnv()` utility for environment-specific logic
- Different Storyblok spaces for dev/prod
- Editor mode detection via URL params

## Build & Deployment

### Netlify Deployment Strategy
- **Atomic deployments**: When content changes in Storyblok, a webhook triggers a full rebuild on Netlify
- **Static-first**: Site is optimized for serverless hosting with maximum static generation
- **No ISR**: Instead of Incremental Static Regeneration, we use complete rebuilds for content updates
- **Serverless optimization**: All code should be optimized for Netlify's serverless environment

### Development Commands
- `npm run dev` - Development server with Turbopack
- `npm run lint` - ESLint with max 0 warnings
- `npm run typecheck` - TypeScript validation
- `npm run vault:local` - Fetch environment variables

### Release Workflow
1. Create `release/vX.X.X` branch from `dev`
2. PR to `main` with semver label (`patch`, `minor`, `major`)
3. Merge commit (not squash) triggers production deployment
4. Auto-merges back to `dev`

## Authentication & Security

### Storyblok Editor Protection
- Middleware validates editor access tokens
- Preview content requires authentication
- Environment-based access control

### Content Security
- Published vs. draft content separation
- Relation resolving for linked content
- URL validation for Stanford domains

## Key Dependencies to Know

- `@storyblok/react/rsc` - Server-side Storyblok integration
- `decanter` - Stanford design system
- `cnbuilder` - Conditional class utility
- `netlify-plugin-vault-variables` - Secret management
- `@fortawesome/react-fontawesome` - Icon system