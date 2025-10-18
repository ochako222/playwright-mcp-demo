# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands
- Use Context7 to see library docs if you are creating or modifying existing files
  
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
npm test                 # Run all Playwright tests
npm run test:ui          # Run tests with Playwright UI mode
npm run test:headed      # Run tests in headed (visible) browser mode
npx playwright test <file>  # Run a single test file
```

## Code Style and Configuration

### Biome Configuration
- Uses **tabs** for indentation (not spaces)
- Uses **double quotes** for strings
- Auto-organizes imports
- Runs on recommended rules

### TypeScript Configuration
- Strict mode enabled with additional strictness (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- Module system: NodeNext (ESM)
- Source files in `src/`, compiled output in `dist/`
- Tests are excluded from compilation (they run directly via Playwright)

## Architecture

### Project Structure
- `src/` - Application source code (currently minimal, just entry point)
- `tests/` - Playwright test specs (`.spec.ts` files)
- `dist/` - Compiled TypeScript output

### Playwright Configuration
- Test directory: `./tests`
- Tests run against three browsers: chromium, firefox, webkit
- Base URL configured as `http://localhost:3000` (though not currently used by example tests)
- Fully parallel execution enabled
- HTML reporter for test results

### Key Dependency: @playwright/mcp
This project includes the Playwright MCP server, which enables LLM-driven browser automation. This is distinct from standard Playwright testing and allows AI assistants to control browsers programmatically.

## Testing Patterns

Tests use standard Playwright testing patterns:
- Import from `@playwright/test`
- Use async test functions with `{ page }` fixture
- Navigate with `page.goto()`
- Interact with elements via locators (`page.locator()`, `page.getByRole()`)
- Make assertions with `expect()` from Playwright Test
