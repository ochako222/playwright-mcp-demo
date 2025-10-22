See @README for project overview and @package.json for available npm commands for this project.


# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript-based Playwright testing project integrated with Playwright MCP server (`@playwright/mcp`), which enables browser automation via LLMs. The project uses Biome for linting/formatting instead of ESLint/Prettier.

## Development Workflow

- **Always use Context7 MCP** when writing code to fetch relevant documentation for libraries (Playwright, TypeScript, etc.)
- **Don't run tests automatically** to verify changes. Run tests only when explicitly asked or when a specific agent needs to run them
- **Run formatting before commits**: Use `npm run check -- --write` to fix formatting issues

## Essential Commands

### Development
```bash
npm run dev              # Run the application (src/index.ts) via tsx
npm run build            # Compile TypeScript to dist/
npm run check            # Run Biome linter and formatter
```

### Testing
```bash
npm test                                    # Run all Playwright tests
npm run test:ui                             # Run tests with Playwright UI mode
npm run test:headed                         # Run tests in headed (visible) browser mode
npm run tests:single                        # Run smoke tests in headless mode (@smoke tag)
npx playwright test <file>                  # Run a single test file
npx playwright test <file> --headed         # Run single test in headed mode
npx playwright test --grep "@smoke"         # Run tests with @smoke tag
HEADLESS=true npm test                      # Force headless mode via environment variable
```

**Test Reporting:**
- HTML report generated after test run: `npx playwright show-report`
- Screenshots saved on failure in `test-results/`
- Videos recorded on first retry only

## Code Style and Configuration

### Coding Standards
- **Always use descriptive variable names** - Avoid single-letter variables, abbreviations, or unclear names
- Use meaningful names that convey purpose and intent
- **Add explicit return type annotations** to all methods (don't rely solely on inference)
- **Never use `waitForTimeout()`** - use conditional waits like `waitForSelector()`, `waitForLoadState()`, or `expect().toBeVisible()`
- **Prefer role-based selectors** over CSS selectors: `page.getByRole('button', { name: 'Search' })` instead of `page.locator('.search-btn')`
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

The project uses a **layered Page Object Model** architecture:

1. **Base abstractions** (`src/pages/abstractClasses.ts`):
   - `PageHolder` - Base class holding `page: Page` and `context: BrowserContext`
   - `Component` - Abstract class requiring `expectLoaded()` implementation
     - `isLoaded()` calls `expectLoaded()` and returns boolean (catches errors)
   - `AppPage` - Extends `Component`, adds navigation methods
     - `goto(url: string)` - Navigate to URL
     - `wait(timeout: number)` - **Deprecated, avoid using**

2. **Page classes** (`src/pages/*.page.ts`):
   - Extend `AppPage`
   - Define private readonly locators in constructor
   - Implement `expectLoaded()` with visibility assertions
   - Provide action methods (e.g., `search()`, `click()`)
   - Use getter methods for locator access

3. **AppPages aggregator** (`src/pages/index.ts`):
   - Extends `PageHolder`
   - Instantiates all page objects: `homePage`, `wikiPage`
   - Provides centralized access: `pages.wikiPage.search()`

4. **Custom fixture** (`src/fixtures/index.ts`):
   - Exports `demoTest` - extended Playwright test with `pages` fixture
   - Exports `expect` for assertions
   - Usage: `import { demoTest, expect } from "src/fixtures/index.js"`

**Creating a new page object:**
```typescript
import { AppPage } from "src/pages/abstractClasses.js";
import type { Locator } from "@playwright/test";

export class ExamplePage extends AppPage {
	private readonly heading: Locator = this.page.getByRole("heading", { level: 1 });

	async expectLoaded(): Promise<void> {
		await expect(this.heading).toBeVisible();
	}

	async performAction(): Promise<void> {
		// Implementation
	}
}
```

### Testing Patterns

**Test structure:**
```typescript
import { demoTest, expect } from "src/fixtures/index.js"; // .js extension required!

demoTest.describe(
	"Feature Name",
	{
		annotation: { type: "task", description: "Feature description" },
	},
	() => {
		demoTest(
			"test case description",
			{
				tag: ["@smoke", "@regression"], // Tags for filtering
			},
			async ({ pages, page }) => {
				// Use pages fixture for POM access
				await pages.wikiPage.navigate();
				await pages.wikiPage.search("Query");

				// Use page fixture for assertions
				await expect(page).toHaveTitle(/Expected/);
				await expect(page).toHaveURL(/expected-url/);
			},
		);
	},
);
```

**Key patterns:**
- Import from `src/fixtures/index.js` (`.js` extension required due to `verbatimModuleSyntax`)
- Use `pages` fixture for Page Object Model access
- Use `page` fixture for direct Playwright API and assertions
- Tag tests with `@smoke`, `@regression`, etc. for selective execution
- Use `demoTest.describe()` for grouping with annotations

### MCP Integration

The `.mcp.json` configures two MCP servers:

1. **playwright-test** - LLM-driven browser automation
   - Command: `npx playwright run-test-mcp-server`
   - Environment: `MAX_RESPONSE_SIZE=10000`
   - Enables browser automation via Claude Code agents
   - Used by playwright-test-generator, playwright-test-planner, playwright-test-healer agents

2. **context7** - Library documentation access
   - Command: `npx -y @upstash/context7-mcp@latest`
   - Provides up-to-date documentation for libraries (Playwright, TypeScript, etc.)
   - **Always invoke Context7** when writing code to fetch relevant API documentation

**MCP Usage:**
- Available agents: `planner`, `generator`, `healer` for Playwright test automation
- Context7 provides real-time documentation beyond Claude's knowledge cutoff
- See `.claude/agents/` for custom agent configurations

## Common Pitfalls & Reminders

### Import Statements
- **MUST use `.js` extension** for local imports: `import { demoTest } from "src/fixtures/index.js"`
- This is required due to `verbatimModuleSyntax: true` in tsconfig.json
- TypeScript will error if you use `.ts` extensions

### Wait Strategies
- ❌ Avoid: `page.waitForTimeout(5000)` - hard waits are flaky
- ✅ Use: `expect(locator).toBeVisible()` - waits with auto-retry
- ✅ Use: `page.waitForLoadState('networkidle')` - for navigation
- ✅ Use: `locator.waitFor()` - for specific elements

### Locator Strategies (Priority Order)
1. **Role-based** (best): `page.getByRole('button', { name: 'Search' })`
2. **Label**: `page.getByLabel('Email')`
3. **Placeholder**: `page.getByPlaceholder('Enter email')`
4. **Text**: `page.getByText('Click me')`
5. **CSS** (last resort): `page.locator('.btn-primary')`

### Page Object Expectations
- Every page object **must implement** `expectLoaded()` with actual assertions
- Empty `expectLoaded()` defeats the purpose of the pattern
- Use `await expect(this.locator).toBeVisible()` to verify page state

### Test Organization
- Use tags for filtering: `@smoke`, `@regression`, `@api`, etc.
- Tag format: `tag: ["@smoke"]` or `tag: "@smoke"` (string or array)
- Run tagged tests: `npx playwright test --grep "@smoke"`