# create-playwright-test — Phase Workflow

Authoritative execution plan. Follow every phase in order. Do not skip or reorder.

All user interactions must go through `AskUserQuestion`. Mark the safest/most common option first with `(Recommended)`.

---

## Phase 1 — Collect Requirement

**Input:** Skill invoked
**Output:** Clear test description (page/flow, actions, assertions)

1. Call `EnterPlanMode` immediately.
2. Ask the user via `AskUserQuestion`:
   > "What test do you want to create? Describe:
   > - The page or URL to test
   > - Actions to perform (clicks, fills, navigation)
   > - Assertions to verify (what proves the feature works)"
3. **Validate:** Is the description specific enough to know which page, what to click, and what to assert? If too vague, ask one focused follow-up (max 1 clarifying question).

---

## Phase 2 — Explore Project + Target Page

**Input:** User's test description
**Output:** Existing structure understood, real DOM locators identified

1. Read these files to avoid duplication:
   - `src/app/index.ts` — which pages are already in `AppPages`
   - `src/fixtures/index.ts` — `baseFixture` definition
   - Directory listing of `src/tests/` — existing specs

2. If the test targets a URL not already covered by an existing page:
   - Use `WebFetch` to fetch the URL
   - Extract: stable visible text, element roles, button/link text, URL path pattern
   - **Note carefully:** Is the heading a semantic `<h1>`/`<h2>` (`getByRole("heading")` works) or a styled `<div>`/`<p>` (`getByText` required)?
   - Identify the URL pattern for `waitForURL` (e.g. `"**/about/**"`)

3. **Validate:** Do you have at least one stable locator candidate for `expectLoaded()` and every planned interaction? If no — re-fetch a specific section or ask the user for the element text (max 1 question).

---

## Phase 3 — Plan

**Input:** Exploration findings
**Output:** Written plan, approved by user

Design the full implementation:

- **New page files** — filename, base class (`AppPage` or `BasePage`), locators list with selector type and rationale
- **New component files** — only if the widget is genuinely reused across 2+ pages
- **`AppPages` registration** — exact line to add to `src/app/index.ts`
- **Fixture** — reuse an existing `src/fixtures/<x>Test.ts` or create a new one
- **Spec structure** — `describe` block name, tag array (e.g. `["@smoke", "@regression"]`), test name, ordered step sequence

Write this plan to the plan file and call `ExitPlanMode`.

**Do not proceed to Phase 4 until the user approves.**

---

## Phase 4 — Implementation

**Input:** Approved plan
**Output:** All new/modified files written to disk

After plan approval, tell the user:
> "Plan approved. Run `/model sonnet` for cost-efficient implementation. Proceeding now."

Implement in this dependency order:

1. `src/app/<name>.page.ts` — extend `AppPage` (or `AppComponent` for widgets)
2. `src/app/components/<name>.component.ts` — only if the plan calls for it
3. `src/app/index.ts` — add the new page to `AppPages`
4. `src/fixtures/<name>Test.ts` — extend `baseFixture` if the plan requires a new fixture
5. `src/tests/<name>.spec.ts` — the spec itself

**Validate before moving to Phase 5:**
- All files exist on disk
- Every public method has `@step` decorator
- Every `expectLoaded()` uses `expect.soft`
- Navigation clicks use `Promise.all([page.waitForURL(...), element.click()])`
- All imports use the `src/*` alias
- No hardcoded `{ timeout: N }` anywhere

---

## Phase 5 — Test Execution Loop

**Input:** All files on disk
**Output:** Green test run, or escalation after 3 attempts

Run the specific spec:
```bash
cd ~/Desktop/dev/ciklum-playwright-demo && npx playwright test src/tests/<spec>.spec.ts 2>&1
```

### On PASS

Done. Report the step names that appeared in the output. Proceed to the Done? checklist in `SKILL.md`.

### On FAIL — attempt ≤ 3

1. Read the full error message.
2. Read the failure screenshot: `test-results/*/test-failed-1.png`
3. Diagnose and apply exactly one fix:

| Symptom | Fix |
|---------|-----|
| Element not found | Inspect screenshot; switch `getByRole` → `getByText` with a substring, or add `.first()` |
| Navigation timeout | Wrap click: `Promise.all([page.waitForURL("**/path/**"), element.click()])` |
| Heading text mismatch | Check for curly apostrophe `'`; use a substring that avoids the character |
| `networkidle` timeout | Replace with `waitForURL` or `waitForLoadState("load")` |
| Cookie banner blocking | Add `acceptCookies()` step before the interaction |

4. Apply the fix, increment the attempt counter, rerun.

### After attempt 3 — go to Phase 6

---

## Phase 6 — Escalate

**Input:** 3 consecutive failures
**Output:** Clear failure report + actionable options for the user

Report:
- What the test was trying to do
- What error persisted (paste the last error message)
- Path to the last screenshot

Then present options via `AskUserQuestion`:
1. **Watch it live (Recommended)** — `npx playwright test --headed src/tests/<spec>.spec.ts`
2. **Step through in UI mode** — `npx playwright test --ui`
3. **Re-fetch the target page** — the live site may have changed since planning; re-run Phase 2
4. **Discuss selector strategy** — describe what you see in the screenshot and propose an alternative
