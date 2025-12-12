# ADR 0009: Remove Storyblok Editor Preview Token Timestamp Validation

**Date**: 2025-12-12  
**Status**: Accepted

## Context

Storyblok's visual editor uses signed preview tokens to authenticate access to the editor interface. The standard security recommendation from Storyblok includes:

1. **Token signature verification**: SHA-1 hash of `spaceId:accessToken:timestamp` must match the provided token
2. **Timestamp validation**: The timestamp should be within the last hour (3600 seconds) to prevent replay attacks

### The Problem

Content reviewers and stakeholders need preview URLs that remain functional for extended periods:

- **Review workflows**: Editors share preview URLs with stakeholders for content approval
- **Asynchronous review**: Reviewers may not access links immediately
- **Meeting preparation**: Preview links are often shared before scheduled review meetings
- **Cross-timezone collaboration**: Teams in different timezones need flexible access windows

The 1-hour timestamp expiration caused preview URLs to become invalid during normal review workflows, forcing editors to regenerate and reshare links repeatedly.

## Decision

**Remove the timestamp validation** from the Storyblok editor token verification while **retaining the cryptographic signature verification**.

## Security Considerations

### Retained Security Measures

1. **Cryptographic signature verification**: The SHA-1 hash validation ensures tokens cannot be forged without knowledge of the preview access token
2. **Preview token secrecy**: The `STORYBLOK_PREVIEW_EDITOR_TOKEN` is stored securely in environment variables and never exposed to clients
3. **Space ID binding**: Tokens are bound to a specific Storyblok space
5. **No write access**: Preview tokens are read-only; they cannot modify content

### Accepted Risks

1. **Replay attacks**: A captured preview URL could be reused indefinitely
   - **Mitigation**: Preview URLs only show draft content; no sensitive data exposure
   - **Mitigation**: Changing the preview token invalidates all existing URLs
   
2. **URL sharing**: Preview URLs remain valid if shared externally
   - **Mitigation**: This is actually the desired behavior for reviewer workflows
   - **Mitigation**: URLs still require the cryptographic token to function

## Consequences

### Positive

✅ **Improved reviewer experience**: Preview URLs work for days/weeks, not just 1 hour  
✅ **Simplified workflow**: No need to regenerate and reshare preview links  
✅ **Cross-timezone support**: Reviewers in any timezone can access links when convenient  
✅ **Meeting-friendly**: Preview links shared before meetings remain valid  

### Negative

⚠️ **Reduced replay attack protection**: Old preview URLs remain valid until token rotation  
⚠️ **Shared URL persistence**: URLs shared externally continue to work  

## Alternatives Considered

1. **Extend timestamp to 24 hours**: Still too short for some review workflows
2. **Extend timestamp to 7 days**: Arbitrary limit that may still cause issues
3. **Remove timestamp validation entirely**: Chosen approach - simplest and meets all use cases
4. **Implement custom token system**: Overly complex for the security benefit

## References

- [Storyblok Preview Token Verification](https://www.storyblok.com/faq/how-to-verify-the-preview-query-parameters-of-the-visual-editor)
- [ADR 0007: Next.js 16 Upgrade](./0007-next-js-16-upgrade.md) - EditorGuard implementation context
