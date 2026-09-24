## Tool Connections Index

Before calling any external tool, MCP server, API, or CLI, you must FIRST read the `connections.md` file located in the workspace root.

This file serves as your tool index and specifies the correct, preferred connection type (e.g., specific CLI commands, MCP setup, or direct APIs) for tasks like reading emails, managing Google Drive, or checking Slack. Always match your tool calls to the definitions and preferences listed in that index.

## Project Docs (refer always)

- [docs/PRD.md](docs/PRD.md)
- [docs/TRD.md](docs/TRD.md)
- [docs/APP_FLOW.md](docs/APP_FLOW.md)
- [docs/UI_UX_DESIGN_BRIEF.md](docs/UI_UX_DESIGN_BRIEF.md)
- [docs/BACKEND_SCHEMA.md](docs/BACKEND_SCHEMA.md)
- [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md)

You have full autonomy: remove any phase/feature not needed or add one needed.

## Agent Operating Rules

- Use codebase MCP to read raw files before you want to read them for efficient results.
- Index using codebase MCP and keep updating on every git commit.
- Use research-protocol skill before doing any research or web fetch.
- Before starting any phase, scrape the web and do a deep research to make the phase perfect. Also do a deep research about the desires and wants of what people want, so we can add those features as well. Go through forums, social media, and places like those.
- After completing any phase (or a major chunk), immediately update [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md): tick the `- [x]` boxes for items actually done (verify against the phase's done criteria, don't assume). Update the status baseline note at the top with new state and date. Then update codebase MCP server. When reporting progress, state phase-by-phase status from the plan — never claim "all done" without checking it. Just keep completing, continuing phases by phases.
- Always use timer with TestSprite processes.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
