# AI Agent Instructions for Stanford OOD Giving Site

## Architecture Overview

This is a **Next.js 16+ App Router** headless CMS site using **Storyblok** as the content management system, deployed on **Netlify** with static generation and edge caching.

### Key Architectural Patterns

**Headless CMS Integration**: All content comes from Storyblok via `utilities/storyblok.tsx`. Components are mapped to Storyblok "bloks" through the `components` object - when adding new Storyblok components, register them here.

**Static-First Strategy**: Uses `generateStaticParams` in `app/(storyblok)/[[...slug]]/page.tsx` with `dynamicParams = false` to pre-generate all pages at build time. Content updates trigger rebuilds via Storyblok webhooks.

**Next.js 16 Caching & PPR Strategy** (see [ADR 0008](docs/adr/0008-next-js-16-caching-strategy.md)):
- **Partial Prerendering (PPR)** enabled via `cacheComponents: true` in `next.config.ts`
- All pages and layouts use `'use cache'` directive at the file level for optimal prerendering
- All data fetching functions in `utilities/data/` use `'use cache'` for automatic caching
- **No ISR** - full rebuilds via Storyblok webhooks provide atomic updates
- Cache is per-build (fresh content on each deployment)
- Visual editor uses `version: 'draft'` (client-side), production uses `version: 'published'` (build-time)
- Worker concurrency limited to 10 via `experimental.cpus` to prevent race conditions

**Route Groups**: 
- `(storyblok)` - Main content pages via catch-all `[[...slug]]`
- `(editor)` - Storyblok visual editor (protected by server-side validation)
- `endowed-positions/` - Dedicated section with custom layout

## Next.js 16 Upgrade Notes (Dec 2025)

### Major Changes from Next.js 15

1. **Middleware Removed (Architectural Decision)**: 
   - `middleware.ts` was removed and replaced with route-level validation
   - Storyblok editor access is now validated in `/app/(editor)/editor/EditorGuard.tsx`
   - This provides better colocation and explicit security boundaries
   - Note: Next.js 16 still supports middleware; we chose to remove it for this specific use case

2. **Removed Custom Cache Handler**:
   - Previous workaround for 2MB cache limit has been removed
   - Next.js 16's new caching architecture handles most cases
   - Large payload warnings (>2MB) are non-fatal; pages still render correctly
   - Future implementation of Upstash Redis cache handler planned for optimal performance

3. **ESLint Configuration**:
   - `eslint` config removed from `next.config.ts` (no longer supported)
   - All ESLint configuration is in `eslint.config.mjs` (flat config format)

4. **Turbopack as Default**:
   - Build times improved by 2-5× with stable Turbopack
   - Fast Refresh is up to 10× faster in development
   - No configuration needed - runs by default

**See [ADR 0007](docs/adr/0007-next-js-16-upgrade.md) for complete upgrade details.**

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

### Storyblok Configuration
**CRITICAL API Configuration**:
- **Region**: This Storyblok space is hosted in the **EU region**
- The `region: 'eu'` parameter MUST be set in `apiOptions` when initializing the client
- Without the EU region setting, all API requests will fail with 401 Unauthorized errors
- See `utilities/storyblok.tsx` for the client configuration

**Token Types**: Two different token types are used for different access levels:
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
Use data fetching functions directly: `getStoryData()`, `getAllStories()`, etc. These use Next.js 16's `'use cache'` directive for automatic caching with Storyblok SDK's built-in memory cache for optimal performance. See [ADR 0008](docs/adr/0008-next-js-16-caching-strategy.md) for details.

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