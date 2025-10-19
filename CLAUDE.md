See @README for project overview and @package.json for available npm commands for this project.


# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands
- Always use Context7 MCP when writing code to fetch relevant documentation
- Don't run tests to verify changes. Run tests only when you're asked or when corresponding agent needs to run tests.

## Project Overview

This is a TypeScript-based Playwright testing project integrated with Playwright MCP server (`@playwright/mcp`), which enables browser automation via LLMs. The project uses Biome for linting/formatting instead of ESLint/Prettier.

## Essential Commands

### Development
```bash
npm run dev              # Run the application (src/index.ts) via tsx
npm run build            # Compile TypeScript to dist/
npm run check            # Run Biome linter and formatter
```

### Testing
```bash
npm test                           # Run all Playwright tests
npm run test:ui                    # Run tests with Playwright UI mode
npm run test:headed                # Run tests in headed (visible) browser mode
npm run tests:single               # Run smoke tests in headless mode
npx playwright test <file>         # Run a single test file
npx playwright test <file> --headed  # Run single test in headed mode
```

## Code Style and Configuration

### Coding Standards
- **Always use descriptive variable names** - Avoid single-letter variables, abbreviations, or unclear names
- Use meaningful names that convey purpose and intent
- Examples:
  - ✅ Good: `searchButton`, `userEmail`, `isPageLoaded`
  - ❌ Bad: `btn`, `e`, `x`, `flag`, `data`

### Biome Configuration
- Uses **tabs** for indentation (not spaces)
- Uses **double quotes** for strings
- Auto-organizes imports
- Runs on recommended rules with `noUnusedImports` as error

### TypeScript Configuration
- Strict mode enabled with additional strictness (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- Module system: NodeNext (ESM)
- Uses path aliases: `src/*` maps to `./src/*`
- All `.ts` files must use `.js` extensions in imports (due to `verbatimModuleSyntax`)
- Source files in `src/`, compiled output in `dist/`

## Architecture

### Project Structure
- `src/pages/` - Page Object Model classes
  - `abstractClasses.ts` - Base classes: `PageHolder`, `Component`, `AppPage`
  - `*.page.ts` - Individual page classes (e.g., `HomePage`, `WikiPage`)
  - `index.ts` - `AppPages` class that aggregates all page objects
- `src/fixtures/` - Custom Playwright test fixtures
- `src/tests/` - Playwright test specs (`.spec.ts` files)
- `dist/` - Compiled TypeScript output

### Playwright Configuration
- Test directory: `./src/tests`
- Uses chromium browser with Chrome channel
- Headless mode controlled by `HEADLESS` environment variable
- `slowMo` parameter available for debugging (currently set to 0)
- Retries: 1 in CI, 0 locally
- Video recorded on first retry, screenshots on failure
- Permissions enabled: clipboard read/write
- HTML reporter for test results

### Page Object Model Pattern

The project uses a layered Page Object Model:

1. **Base abstractions** (`src/pages/abstractClasses.ts`):
   - `PageHolder` - Base class holding `page` and `context`
   - `Component` - Abstract class with `expectLoaded()` and `isLoaded()` methods
   - `AppPage` - Extends `Component` with `goto()` and `wait()` methods

2. **Page classes** - Extend `AppPage` and implement page-specific logic

3. **AppPages aggregator** (`src/pages/index.ts`) - Provides unified access to all page objects

4. **Custom fixture** (`src/fixtures/index.ts`):
   - Exports `demoTest` which extends base Playwright test
   - Provides `pages` fixture of type `AppPages`
   - Tests should import `demoTest` and `expect` from this file

### Testing Patterns

Tests follow these patterns:
- Import `demoTest` and `expect` from `src/fixtures/index.js` (note: `.js` extension required)
- Use `demoTest.describe()` for test grouping
- Access page objects via `pages` fixture: `async ({ pages }) => { await pages.homePage.goto(...) }`
- For simple tests, use the `page` fixture directly: `async ({ page }) => { await page.goto(...) }`
- Use `page.getByRole()` for accessible element selection
- Make assertions with `expect()` from the fixtures

### MCP Integration

The `.mcp.json` configures two MCP servers:
- **playwright-test**: Enables Playwright MCP server for LLM-driven browser automation
  - Environment: `MAX_RESPONSE_SIZE=10000`
- **context7**: Provides access to library documentation via `@upstash/context7-mcp`
- Always use Context7 MCP when writing code to fetch relevant documentation