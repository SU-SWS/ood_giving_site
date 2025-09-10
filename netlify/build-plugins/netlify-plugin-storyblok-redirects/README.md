# netlify-plugin-storyblok-redirects

This plugin automatically fetches redirect definitions from Storyblok and injects them into your Netlify configuration. It reads Storyblok “from/to” entries, along with optional URL query parameters, and converts them into Netlify redirects.

---

## Overview

### Manifest & Inputs

- **`keyvar`** (default: `STORYBLOK_ACCESS_TOKEN`)  
  Environment variable name for the Storyblok API token.  
- **`region`** (default: `us`)  
  The Storyblok space region.  
- **`storypath`** (default: `global-components/redirects`)  
  Path prefix (used in `starts_with`) to locate redirect definitions in Storyblok.  

### How It Works

- Runs in the `onPostBuild` phase.  
- Uses `storyblok-js-client` to fetch stories from Storyblok matching the `storypath` prefix.  
- Looks for each story’s `content.from` and `content.to`.  
- Injects the final redirect entries into `netlifyConfig.redirects`, each with:  
  - **source** → `from` path  
  - **destination** → `to` path  
  - **optional query parameters** → Parses them as Netlify “conditions”  
  - **status code** → Defaults to `301` unless you specify `302`, `303`, `307`, or `308`.

---

## Usage in `netlify.toml`

Below is a minimal example. Adjust the `package` path to match your directory structure:

```toml
[[plugins]]
  package = "/netlify/build-plugins/netlify-plugin-storyblok-redirects"
  [plugins.inputs]
    keyvar = "STORYBLOK_ACCESS_TOKEN"
    region = "us"
    storypath = "global-components/redirects"
```

---

## Environment Variables

By default, the plugin reads your Storyblok token from the environment variable specified in `keyvar`.  
For example, if `keyvar` is `STORYBLOK_ACCESS_TOKEN`, then the plugin looks for `process.env.STORYBLOK_ACCESS_TOKEN`.  

If you use Netlify’s environment variables or a secret manager (Vault, etc.), set that variable in your Netlify environment or `.env` file.

---

## Example Storyblok Entry

Suppose you have a story with the following fields:

- `from` = `/old-page?utm_source=abc`  
- `to` = `/new-page`  
- `statusCode` = `302`  

The plugin converts this into a Netlify redirect:

- `/old-page` → `/new-page`  
  - **HTTP code** = `302`  
  - **Condition**: query parameter `utm_source=abc`

---

## Local Testing

1. **Install dependencies**  
2. Run Netlify build locally (`netlify build`) or test your build plugins with the Netlify CLI.  
3. Verify that the console logs the status of the new redirects

---

## Further Notes

- The plugin only updates redirects if Storyblok returns entries with a valid `content.from` and `content.to`.  
- If no stories match, the build continues without failing, but no new redirects are added.  
- If you want to change the region or the default file path, edit the `[plugins.inputs]` configuration in your `netlify.toml`.