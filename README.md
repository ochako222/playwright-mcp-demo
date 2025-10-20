# Playwright MCP Demo

Welcome! This project demonstrates how to build browser automation tests using Playwright, enhanced with AI capabilities through the Model Context Protocol (MCP). It's designed to show how you can create maintainable, scalable test automation with modern TypeScript and AI-powered browser interactions.

## What is This?

This is a demonstration project that combines:
- **Browser Testing**: Automated tests for web applications using Playwright
- **AI Integration**: LLM-powered browser automation via Playwright's MCP server
- **Modern TypeScript**: Type-safe code with the latest ES modules
- **Page Object Model**: A clean architecture pattern for organizing your test code

Perfect for developers who want to see how AI can enhance browser automation, or teams looking for a solid foundation for their test automation framework.

## Quick Start

### Installation

First, make sure you have Node.js installed (version 18 or higher recommended). Then install the project dependencies:

```bash
npm install
```

This will install Playwright, TypeScript, Biome (our linter/formatter), and the Playwright MCP server.

### Running Your First Test

Try running the example tests to make sure everything works:

```bash
npm test
```

Want to see the browser in action? Run tests in headed mode:

```bash
npm run test:headed
```

Or use the interactive UI mode to explore your tests:

```bash
npm run test:ui
```

## Available Commands

Here's what you can do with this project:

### Development
- **`npm run dev`** - Runs the main application (located in `src/index.ts`)
- **`npm run build`** - Compiles your TypeScript code into JavaScript
- **`npm run check`** - Checks your code style and formatting with Biome

### Testing
- **`npm test`** - Runs all tests in headless mode (no visible browser)
- **`npm run test:ui`** - Opens Playwright's interactive test UI for debugging and exploration
- **`npm run test:headed`** - Runs tests with a visible browser window (great for debugging)
- **`npm run tests:single`** - Runs only smoke tests (tests tagged with @smoke)

### Pro Tips
- Use `npx playwright test <file>` to run a specific test file
- Add `--headed` to any test command to see the browser
- Check out `playwright.config.ts` to customize browser settings, timeouts, and more

## Project Architecture

This project uses the Page Object Model (POM) pattern, which helps keep your tests clean and maintainable. Here's how it's organized:

```
playwright-mcp-demo/
├── src/
│   ├── pages/              # Page Object Model classes
│   │   ├── abstractClasses.ts   # Base classes for all pages
│   │   ├── homePage.page.ts     # Example page object
│   │   ├── wikiPage.page.ts     # Wikipedia page object
│   │   └── index.ts             # Aggregates all pages together
│   ├── fixtures/           # Custom Playwright test fixtures
│   │   └── index.ts        # Provides 'pages' fixture for tests
│   ├── tests/              # Your test files go here
│   │   └── *.spec.ts       # Test specifications
│   └── index.ts            # Main application entry point
├── dist/                   # Compiled JavaScript (auto-generated)
├── .mcp.json              # MCP server configuration
├── biome.json             # Code style configuration
├── playwright.config.ts   # Playwright settings
└── tsconfig.json          # TypeScript settings
```

### Understanding the Page Object Model

Instead of writing selectors directly in your tests, we use "Page Objects" - classes that represent web pages and know how to interact with them. This makes tests:
- **Easier to read**: Tests describe what you're testing, not how to click buttons
- **Easier to maintain**: When the UI changes, update one page object instead of many tests
- **More reusable**: Share page interactions across multiple tests

For example:
```typescript
// Instead of this in every test:
await page.goto('https://example.com');
await page.getByRole('button', { name: 'Search' }).click();

// You write this:
await pages.homePage.goto();
await pages.homePage.clickSearchButton();
```

## Technologies Explained

### TypeScript
Provides type safety and better IDE support. Catches bugs before you run your code, and makes refactoring much safer.

### Biome
A super-fast linter and formatter (think ESLint + Prettier, but faster). Automatically formats your code consistently and catches common mistakes.

### Playwright
The browser automation framework that powers the tests. It can control Chrome, Firefox, Safari, and more. Great for testing web applications and scraping websites.

### Playwright MCP Server
This is where AI comes in! The MCP (Model Context Protocol) server lets you control browsers through natural language using Large Language Models. It's configured in `.mcp.json` and enables AI-powered browser automation.

### Context7 MCP
Provides AI assistants with access to library documentation, making it easier to write code with up-to-date API references.

## Configuration Files

- **`biome.json`**: Code style rules (we use tabs, double quotes, and auto-organize imports)
- **`playwright.config.ts`**: Test settings (browsers, timeouts, screenshots, videos)
- **`tsconfig.json`**: TypeScript compiler options (strict mode, module system)
- **`.mcp.json`**: MCP server configuration for AI-powered automation

## Getting Help

New to any of these technologies? Here are some helpful resources:
- [Playwright Documentation](https://playwright.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Biome Documentation](https://biomejs.dev)
- [Model Context Protocol](https://modelcontextprotocol.io)

## Next Steps

1. Explore the example tests in `src/tests/`
2. Check out the page objects in `src/pages/`
3. Try writing your own test using the `pages` fixture
4. Experiment with the MCP server for AI-powered automation

Happy testing!
