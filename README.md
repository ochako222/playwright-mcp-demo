# Playwright MCP Demo

A TypeScript application with Biome, Playwright, and Playwright MCP server.

## Setup

Install dependencies:

```bash
npm install
```

## Scripts

- `npm run dev` - Run the development server
- `npm run build` - Build the TypeScript project
- `npm test` - Run Playwright tests
- `npm run test:ui` - Run Playwright tests with UI mode
- `npm run test:headed` - Run Playwright tests in headed mode
- `npm run check` - Run Biome linter and formatter

## Project Structure

```
.
├── src/                # Source files
│   └── index.ts       # Main entry point
├── tests/             # Playwright tests
│   └── example.spec.ts
├── dist/              # Compiled output
├── biome.json         # Biome configuration
├── playwright.config.ts # Playwright configuration
└── tsconfig.json      # TypeScript configuration
```

## Technologies

- **TypeScript** - Static type checking
- **Biome** - Fast linter and formatter
- **Playwright** - Browser automation and testing
- **@playwright/mcp** - Playwright MCP server for browser automation via LLMs
