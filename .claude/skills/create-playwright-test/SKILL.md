---
name: create-playwright-test
description: >
  REQUIRED when creating a new Playwright TypeScript test for the ciklum-playwright-demo
  project (~/Desktop/dev/ciklum-playwright-demo). Orchestrates the full lifecycle:
  enters plan mode, asks what to test, fetches target page DOM for real locators,
  plans page objects / components / fixtures / spec, implements on Sonnet, runs and
  auto-fixes up to 3 times before escalating.
  Triggers: create test, add e2e test, write playwright test, new spec, automate page,
  create aqa test, new playwright test, add test for [feature].
  Excludes: editing existing tests, running tests without adding one, debugging non-test code.
user-invocable: true
allowed-tools:
  - AskUserQuestion
  - Bash
  - Read
  - Write
  - Edit
  - WebFetch
  - Agent
  - EnterPlanMode
  - ExitPlanMode
---

Creates a new Playwright TypeScript test — page objects, components, fixture, spec — and validates it runs green.

## When This Skill MUST Be Used

**ALWAYS invoke this skill when the user asks to:**
- Create, add, or write a new Playwright test or spec
- Automate a new page flow, URL, or feature
- Add coverage for something not yet tested

**STOP. Read `references/PHASES.md` now. It is authoritative over everything below.**

## Out of Scope

- Editing or fixing existing tests — edit those directly
- Running the test suite without adding a new test
- Debugging non-test framework code

---

## Domain Map

| Item | Path |
|------|------|
| Tests | `src/tests/*.spec.ts` |
| Pages | `src/app/*.page.ts` |
| Components | `src/app/components/*.component.ts` |
| Pages container | `src/app/index.ts` (`AppPages` class) |
| Base fixture | `src/fixtures/index.ts` (`baseFixture`) |
| Per-feature fixtures | `src/fixtures/<name>Test.ts` |
| Step decorator | `src/misc/step.ts` |
| Abstract base classes | `src/app/abstractClasses.ts` |
| Run a single spec | `npx playwright test src/tests/<spec>.spec.ts 2>&1` |

`.env` already sets `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` — no prefix needed when running from the project directory.

---

## Project-Specific Patterns

Only what the agent would not know without this file:

- **Navigation clicks** — `networkidle` never resolves on ciklum.com (live analytics/chat scripts). Use `Promise.all([page.waitForURL("**/path/**"), element.click()])` for every click that triggers navigation.
- **Assertions** — always `expect.soft` inside `expectLoaded()` to accumulate all failures rather than abort on the first.
- **`@step` decorator** — required on every public page and component method. It wraps the call in `test.step({ box: true })`, which drives the Playwright HTML report.
- **Class hierarchy** — `AppPage` for full-screen pages, `AppComponent` for reusable widgets. Both receive `(page, context)` — never omit `context`.
- **Registration** — every new page must be added to `AppPages` in `src/app/index.ts`.
- **Imports** — use the `src/*` path alias (configured in tsconfig). No relative `../../` chains.
- **Curly apostrophes** — the live site uses `'` (U+2019). `getByRole` exact-name matching will miss it; use `getByText` with a unique substring instead.

---

## Gotchas

- `networkidle` never fires on ciklum.com — use `waitForURL` for all navigation waits
- Cookie consent banner appears on every fresh browser context — dismiss it before any nav click
- Curly apostrophe `'` in heading text breaks `getByRole` exact matching — use `getByText` with a distinctive substring
- `AppPages` constructor signature is `(this.page, this.context)` — never omit `this.context`
- `channel: "chrome"` in `playwright.config.ts` is conditional — never hardcode browser paths in test files

---

## Example Requests

| Intent | Action |
|--------|--------|
| "Test the Services page loads" | Fetch `/services`, extract heading, create `services.page.ts` extending `AppPage`, write spec |
| "Click About and verify the page" | `Promise.all([waitForURL("**/about/**"), click()])`, assert heading with `getByText` |
| "Fill the contact form and submit" | New page + `AppComponent` for the form, `waitForURL` after submit |
| "Verify the Industries dropdown shows items" | `AppComponent` for the widget, composed inside the parent page |

---

## Done?

- [ ] Naming conventions followed: `*.page.ts`, `*.component.ts`, `*.spec.ts`
- [ ] Every public page/component method has `@step` decorator
- [ ] Every `expectLoaded()` uses `expect.soft`
- [ ] Navigation clicks use `Promise.all([waitForURL, click()])`
- [ ] New page registered in `AppPages` (`src/app/index.ts`)
- [ ] No hardcoded `{ timeout: N }` in any new file
- [ ] Test passes: `npx playwright test src/tests/<spec>.spec.ts`
