---
name: Replit npm security blocks
description: Replit's package firewall can reject vulnerable packages in the pinned Angular dependency tree.
---

An install from the lockfile was blocked by Replit's package firewall after it flagged a dependency in the current Angular SSR stack for a critical CVE. Updating individual transitive packages did not resolve the blocker.

**Why:** Install and preview validation were unavailable until the framework's server-rendering dependency is accepted by the package security policy.

**How to apply:** If this project needs dependencies installed, upgrade the Angular framework, CLI, builder, and SSR packages together to a compatible version that passes the firewall. Do not bypass the registry or security policy.
