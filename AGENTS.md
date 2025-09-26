# AI Agent Instructions for Stanford OOD Giving Site

## Architecture Overview

This is a **Next.js 15+ App Router** headless CMS site using **Storyblok** as the content management system, deployed on **Netlify** with static generation and edge caching.

### Key Architectural Patterns

**Headless CMS Integration**: All content comes from Storyblok via `utilities/storyblok.tsx`. Components are mapped to Storyblok "bloks" through the `components` object - when adding new Storyblok components, register them here.

**Static-First Strategy**: Uses `generateStaticParams` in `app/(storyblok)/[[...slug]]/page.tsx` with `dynamicParams = false` to pre-generate all pages at build time. Content updates trigger rebuilds via Storyblok webhooks.

**Aggressive Caching**: All API calls use `unstable_cache` with 10-minute revalidation (`utilities/data/*.ts`). Static pages cache for 1 year (`revalidate = 31536000`).

**Route Groups**: 
- `(storyblok)` - Main content pages via catch-all `[[...slug]]`
- `(editor)` - Storyblok visual editor (protected by middleware)
- `endowed-positions/` - Dedicated section with custom layout

## Development Workflow

### Environment Setup
```bash
# Copy environment template
cp example.env .env

# Add VAULT_ROLE_ID and VAULT_SECRET_ID manually, then:
npm run vault:local  # Fetches all other env vars from Vault
npm ci
npm run dev  # Starts with Turbopack and HTTPS
```

### HTTPS for Storyblok Editor
Run `npm run https-proxy-start` in separate terminal to enable Storyblok visual editor at https://localhost:3010 (required - Storyblok v2 doesn't support HTTP).

### Storyblok Token Types
**IMPORTANT**: Two different token types are used for different access levels:
- `STORYBLOK_ACCESS_TOKEN` - Public token with access to **published content only**
- `STORYBLOK_PREVIEW_EDITOR_TOKEN` - Preview token with access to **draft content** (used in visual editor)

The application uses separate dev/prod Storyblok spaces, so always request `published` content and rely on environment-specific tokens to access the correct space.

### Critical Commands
- `npm run typecheck` - Essential before commits
- `npm run lint:fix` - Auto-fixes ESLint issues
- `npm run build` - Tests static generation locally

## Component Patterns

### Storyblok Components
All Storyblok components in `components/Storyblok/` follow the pattern:
```tsx
import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';

type SbComponentProps = {
  blok: SbBlokData & {
    // Define Storyblok field types here
  }
};

export const SbComponent = (props: SbComponentProps) => (
  <div {...storyblokEditable(props.blok)}>
    {/* Component content */}
  </div>
);
```

### Content Rendering
Use `<CreateBloks blokSection={blok.body} />` to render Storyblok content arrays. This handles null checks and maps over blok arrays automatically.

### Data Fetching
Always use cached versions: `getStoryDataCached()`, `getAllStoriesCached()`, etc. These are already optimized with proper cache tags for revalidation.

## Styling & Design System

**Stanford Decanter**: Uses the `decanter` TailwindCSS preset for Stanford's design system. Reference existing components for spacing, colors, and typography patterns.

**Font Configuration**: Three fonts configured in `app/layout.tsx`:
- `source_sans` (--font-source-sans)
- `source_serif` (--font-source-serif) 
- `stanford` (--font-stanford) - Local font for Stanford branding

**Container Queries**: Available via `@tailwindcss/container-queries` but use sparingly (Safari 15 compatibility).

## Data Flow & Content Management

### Content Hierarchy
```
Storyblok Space
├── Pages (public content)
├── global-components/ (alerts, search config, footers)
│   ├── alerts/ (site-wide notifications)
│   └── search-overlay/ (search modal configuration)
└── test/ (filtered out in production)
```

### Search Integration
Uses **Algolia** with Storyblok plugin for automatic sync. Content is processed via Algolia index connector (triggered post-deployment through `netlify/functions/deploy-succeeded.mts`).

### Global Context Providers
Root layout loads global data for:
- **Global Alerts**: Site-wide notification banners
- **Search Config**: Search modal content and categories
- **Analytics**: Google Analytics via `GAProvider`

## Hosting & Deployment Strategy

### Netlify Hosting Architecture
**Dual Environment Setup**: Two complete environments with separate Storyblok spaces:
- **Production** (`main` branch) → Production Storyblok space → `giving.stanford.edu`
- **Development** (`dev` branch) → Development Storyblok space → Dev preview URL

### Content Deployment Strategy
**Static Generated Atomic Deployments**: 
- **No ISR (Incremental Static Regeneration)** - content stays static once deployed
- **Full rebuilds triggered by Storyblok webhooks** on any content change
- **Atomic deployments** ensure consistent site state (all-or-nothing updates)
- **Build-time content fetching** via `generateStaticParams` and cached utilities

### Branch Strategy & Release Process
- Work from `dev` branch (auto-deploys to dev environment)
- Create `release/vX.X.X` branches for releases  
- PR to `main` triggers production build and deployment
- Use semver labels: `patch`, `minor`, `major`, `rc`, `alpha`, `beta`
- Merges to `main` trigger: version bump → GitHub release → production deploy → merge back to `dev`

### Performance Optimizations
- **Edge Caching**: Configured for Netlify with 1-year static cache
- **Custom Cache Handler**: Bypasses Next.js 2MB cache limit (see `next.config.ts`)
- **Image Optimization**: Only allows `assets.stanford.edu` images

## Common Patterns & Conventions

### Code Style
- Follow existing code styles
- Don't forget to add the EOF newline

### Error Handling
- Each route group has dedicated error.tsx components
- Global error boundary in `app/global-error.tsx`
- Storyblok API errors return `{ data: 404 }` pattern

### TypeScript Patterns
- Use `SbBlokData` for Storyblok component props
- Cached functions return `ISbResult | { data: 404 }`
- Prefer type imports: `import { type Metadata }`

### Testing Content
- Test content goes in `/test` folder (filtered in production)
- Use Storyblok's visual editor for content preview
- Local development shows all content including test

## Key Files for Reference
- `utilities/storyblok.tsx` - Component registration and Storyblok client
- `app/(storyblok)/[[...slug]]/page.tsx` - Main routing and static generation
- `utilities/data/` - All cached API functions
- `components/CreateBloks.tsx` - Core content rendering
- `docs/adr/` - Architectural Decision Records

## Anti-Patterns to Avoid
- ❌ Direct Storyblok API calls (use cached utilities)
- ❌ Client-side data fetching for content (use SSG)
- ❌ Modifying `dynamicParams` (breaks static generation)
- ❌ Removing Storyblok visual editor attributes (`storyblokEditable`)
- ❌ Using non-Stanford fonts without design system approval