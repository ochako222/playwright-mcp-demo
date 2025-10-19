---
name: playwright-repo-generator
description: Creates Playwright + TypeScript automation testing repositories from scratch. Use when the user asks to create, initialize, set up, or scaffold a new Playwright project, automation repository, testing framework, or TypeScript test project. Includes proper project structure with Page Object Model, fixtures, Biome linting, and comprehensive configuration.
---

# Playwright Repository Generator

Creates complete Playwright + TypeScript automation testing repositories with best practices, proper structure, and production-ready configuration.

## When to Use This Skill

Trigger this skill when the user requests:
- "Create a new Playwright automation repository"
- "Set up a TypeScript testing project with Playwright"
- "Initialize a Playwright repo from scratch"
- "Scaffold an automation testing framework"
- Any request to create a new test automation or Playwright project

## Repository Structure

Create the following directory structure:

```
project-name/
├── src/
│   ├── pages/
│   │   ├── abstractClasses.ts
│   │   ├── index.ts
│   │   └── example.page.ts
│   ├── fixtures/
│   │   └── index.ts
│   └── tests/
│       └── example.spec.ts
├── package.json
├── tsconfig.json
├── biome.json
├── playwright.config.ts
├── .gitignore
├── README.md
└── CLAUDE.md
```

## Core Files to Create

### 1. package.json
Include these essential scripts and dependencies:
- Scripts: `dev`, `build`, `check`, `test`, `test:ui`, `test:headed`, `test:single`, `test:debug`
- Dependencies: `@playwright/test`, `typescript`, `@biomejs/biome`, `tsx`, `@types/node`
- Use `"type": "module"` for ESM support

### 2. tsconfig.json
Configure with:
- Strict mode enabled
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`
- `module: "NodeNext"` and `moduleResolution: "NodeNext"`
- `verbatimModuleSyntax: true` (requires `.js` extensions in imports)
- Path aliases: `"src/*": ["./src/*"]`
- Output to `dist/`, source in `src/`

### 3. biome.json
Configure Biome (not ESLint/Prettier):
- Use **tabs** for indentation
- Use **double quotes** for strings
- Enable `organizeImports`
- Set `noUnusedImports` as error
- Ignore: `node_modules`, `dist`, `playwright-report`, `test-results`

### 4. playwright.config.ts
Configure with:
- `testDir: "./src/tests"`
- Chromium with Chrome channel
- Headless controlled by `HEADLESS` env var
- Retries: 1 in CI, 0 locally
- Video on retry, screenshots on failure
- Permissions: clipboard read/write
- HTML reporter

### 5. Page Object Model Structure

**src/pages/abstractClasses.ts** - Base classes:
```typescript
export class PageHolder {
  constructor(public page: Page, public context: BrowserContext) {}
}

export abstract class Component extends PageHolder {
  abstract expectLoaded(): Promise<void>;
  abstract isLoaded(): Promise<boolean>;
}

export abstract class AppPage extends Component {
  abstract goto(...args: unknown[]): Promise<void>;
  async wait(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
}
```

**src/pages/index.ts** - AppPages aggregator that holds all page objects

**src/fixtures/index.ts** - Custom fixtures:
- Export `demoTest` extending base Playwright test
- Provide `pages` fixture of type `AppPages`
- Export `expect` from `@playwright/test`

### 6. README.md
Include:
- Project overview
- Installation instructions (`npm install`, `npx playwright install`)
- Available commands
- Project structure explanation
- Testing guidelines

### 7. CLAUDE.md
Provide guidance for Claude Code:
- Development commands
- Project overview
- Essential commands (dev, build, check, test variants)
- Code style standards (descriptive names, no single letters)
- Biome configuration (tabs, double quotes)
- TypeScript configuration details
- Architecture explanation (POM pattern, fixtures)
- Testing patterns and import requirements
- Note about using `.js` extensions in imports

## Coding Standards to Document

**Always use descriptive variable names:**
- ✅ Good: `searchButton`, `userEmail`, `isPageLoaded`
- ❌ Bad: `btn`, `e`, `x`, `flag`, `data`

**Import requirements:**
- Tests import from `src/fixtures/index.js` (note `.js` extension)
- All TypeScript imports must use `.js` extensions due to `verbatimModuleSyntax`

**Testing patterns:**
- Use `demoTest.describe()` for grouping
- Access pages via `pages` fixture: `async ({ pages }) => { await pages.homePage.goto() }`
- Use `page.getByRole()` for accessible selectors
- Simple tests can use `page` fixture directly

## Implementation Steps

1. Ask user for project name and description
2. Create directory structure
3. Generate all configuration files
4. Create Page Object Model base classes
5. Create fixtures with custom test extension
6. Generate example page object and test
7. Create README.md with instructions
8. Create CLAUDE.md with comprehensive guidance
9. Inform user to run: `npm install && npx playwright install`

## Post-Creation Instructions

Tell the user to run:
```bash
npm install
npx playwright install
npm run check
npm test
```
