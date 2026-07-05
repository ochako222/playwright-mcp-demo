# Ciklum Playwright Demo

Enterprise Playwright + TypeScript automation framework. Minimal scaffold that codifies six years of AQA practice: typed page objects, component composition, a fixture chain, a `@step` reporting decorator, and a fail-fast global env layer.

## Features

- **Page Object Model with component composition** — `AppPage`, `AppComponent`, and `BasePage` abstract classes over a shared `PageHolder`.
- **`@step` decorator** — TypeScript stage-3 decorator wraps methods in `test.step({ box: true })` so the HTML report reads like a user narrative.
- **Fixture chain** — `baseFixture` provides `pages` and `globalEnv`; per-feature fixtures (`demoTest`, etc.) extend it without touching the base.
- **Typed global env** — `envalid` validates `process.env` in `globalSetup` and bridges the result to workers via a serialized `process.env.globalEnv` key.
- **Biome + Husky pre-commit gate** — lint and format on every commit, single-binary tooling (no ESLint + Prettier zoo).
- **Deterministic execution** — `workers: 1`, `fullyParallel: false` by default. Reproducibility first, raise parallelism only after fixture isolation is proven.

## Prerequisites

- Node.js 18+
- npm
- Google Chrome (installed via `npx playwright install chrome`)
  - On Arch Linux, install Chromium via pacman and set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium` (and drop `channel: "chrome"` from `playwright.config.ts` locally).

## Quick start

```bash
git clone https://github.com/ochako222/playwright-demo.git
cd playwright-demo
npm install
cp .env.example .env
npx playwright install chrome
npx playwright test
```

Open the HTML report:

```bash
npx playwright show-report
```

## Project structure

```
.
├── configs/setup/          # Typed global env layer
│   ├── globalTypes.ts      # GlobalVariablesI interface
│   ├── globalHelpers.ts    # envalid validator
│   └── globalSetup.ts      # Playwright globalSetup entry
├── src/
│   ├── app/                # Page Object Model
│   │   ├── abstractClasses.ts  # PageHolder / BasePage / AppPage / AppComponent
│   │   ├── components/         # Reusable widgets (*.component.ts)
│   │   ├── home.page.ts        # Concrete pages (*.page.ts)
│   │   └── index.ts            # AppPages container
│   ├── fixtures/
│   │   ├── index.ts        # baseFixture (globalEnv + pages)
│   │   └── demoTest.ts     # Per-feature fixture
│   ├── misc/
│   │   └── step.ts         # @step decorator
│   └── tests/              # *.spec.ts
├── biome.json
├── playwright.config.ts
└── tsconfig.json
```

## Scripts

| Command                                    | Purpose                                              |
| ------------------------------------------ | ---------------------------------------------------- |
| `npm run lint`                             | Run Biome lint + format check                        |
| `npm run format`                           | Auto-format the codebase                             |
| `npx playwright test`                      | Run the full suite                                   |
| `npx playwright test --ui`                 | Launch the Playwright UI mode                        |
| `npx playwright test --grep @regression`   | Run only tests tagged `@regression`                  |
| `npx playwright test --debug`              | Step through with the Playwright inspector           |
| `npx playwright show-report`               | Open the last HTML report                            |

## Environment variables

Defined in `.env` (copy from `.env.example`):

| Variable      | Required | Values                | Purpose                    |
| ------------- | -------- | --------------------- | -------------------------- |
| `BASE_URL`    | yes      | any URL               | Application under test     |
| `ENVIRONMENT` | yes      | `dev` \| `qa` \| `test` | Environment tag           |

Validation happens in `configs/setup/globalHelpers.ts` — the suite refuses to boot on missing or malformed values.

## Writing a test

```ts
import { demoTest } from "src/fixtures/demoTest";

demoTest.describe("Cart", { tag: ["@cart", "@regression"] }, () => {
  demoTest("adds item to cart", async ({ pages, globalEnv }) => {
    await pages.homePage.goto(globalEnv.BASE_URL);
    await pages.homePage.expectLoaded();
    // ...
  });
});
```

Consume only the fixtures a test needs. Actions live on page objects, not in the spec.

## Adding a page

1. Create `src/app/newPage.page.ts` extending `AppPage` (or `BasePage`).
2. Implement `expectLoaded()`.
3. Declare locators as `private` inline fields.
4. Decorate public methods with `@step("...")` for report visibility.
5. Register the page in `src/app/index.ts`.

## Adding a component

1. Create `src/app/components/<name>.component.ts` extending `AppComponent`.
2. Instantiate it inside the owning page: `public foo = new FooComponent(this.page, this.context);`

## Naming conventions

| Kind      | Convention        | Example              |
| --------- | ----------------- | -------------------- |
| Page      | `*.page.ts`       | `home.page.ts`       |
| Component | `*.component.ts`  | `demo.component.ts`  |
| Test spec | `*.spec.ts`       | `demoTest.spec.ts`   |
| Interface | `PascalCase` + `I` | `GlobalVariablesI`  |

## Commit workflow

Husky runs `npx @biomejs/biome check --write` before every commit. Fix any errors Biome cannot auto-fix, re-stage, and commit again.

## License

ISC
