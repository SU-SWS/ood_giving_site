# 2. Keep existing keys for Storyblok options

Date: 2025-06-17

## Status

Accepted

## Context

When the Giving site was first built on Storyblok, we were inexperienced with the platform. To handle single/multi-option fields in Storyblok, we created a lot of key/value pairs (some in datasources) with long string of class names that went directly into the keys separated by white spaces.

## Decision

We will keep the existing keys in the Storyblok options for now. This will allow us to maintain compatibility with existing content and avoid breaking changes. Later on we can revisit this decision, or at least creating maps to convert these keys into more readable names to be passed into component props.

## Consequences

We will have to maintain the existing keys in the Storyblok options, which may not be as readable or user-friendly as we would like.
