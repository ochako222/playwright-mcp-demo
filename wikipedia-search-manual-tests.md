# Wikipedia Search - Manual Test Cases

## Test Suite: Search Execution

This document contains manual test cases for Wikipedia search functionality. These test cases can be executed manually or used as a reference for automation with LLM-based testing tools.

---

## Test Case 1: Search via Enter Key

**Test ID:** WS-001
**Priority:** High
**Test Type:** Functional

### Objective
Verify that users can successfully search for content on Wikipedia by typing a search query and pressing the Enter key.

### Preconditions
- Web browser is installed and functional
- Internet connection is available
- No specific user account required

### Test Steps

1. **Navigate to Wikipedia homepage**
   - Open your web browser
   - Navigate to: `https://en.wikipedia.org`
   - Wait for the page to fully load

2. **Locate and click the search input field**
   - Find the search box with accessible name "Search Wikipedia"
   - Click on the search input field to focus it
   - The search field should be active and ready for input

3. **Enter search query**
   - Type the following text into the search field: `Python`
   - Verify that the text appears in the search box as you type
   - You may see autocomplete suggestions appear below the search field

4. **Submit search using Enter key**
   - Press the `Enter` key on your keyboard
   - Wait for the page to navigate

### Expected Results

- **Navigation verification:**
  - The browser URL should change to include "Python" in the address
  - Expected URL pattern: `https://en.wikipedia.org/wiki/Python` or similar containing "Python"

- **Page content verification:**
  - The page should load successfully without any errors
  - The page title (shown in the browser tab) should contain the word "Python"
  - The page should display relevant content about Python (either the programming language, the snake, or a disambiguation page)

### Pass Criteria
- URL contains "Python"
- Page title contains "Python"
- Page loads without errors
- Content is relevant to the search query

### Fail Criteria
- URL does not change or doesn't contain "Python"
- Page shows a 404 error or "Page not found"
- Page title doesn't contain "Python"
- Search field doesn't accept input

---

## Test Case 2: Search via Search Button

**Test ID:** WS-002
**Priority:** High
**Test Type:** Functional

### Objective
Verify that users can successfully search for content on Wikipedia by typing a search query and clicking the Search button, and that this method produces the same result as using the Enter key.

### Preconditions
- Web browser is installed and functional
- Internet connection is available
- No specific user account required

### Test Steps

1. **Navigate to Wikipedia homepage**
   - Open your web browser
   - Navigate to: `https://en.wikipedia.org`
   - Wait for the page to fully load

2. **Locate and click the search input field**
   - Find the search box with accessible name "Search Wikipedia"
   - Click on the search input field to focus it
   - The search field should be active and ready for input

3. **Enter search query**
   - Type the following text into the search field: `Python`
   - Verify that the text appears in the search box as you type
   - You may see autocomplete suggestions appear below the search field

4. **Submit search using Search button**
   - Locate the "Search" button (typically located near or within the search field)
   - Click the "Search" button with your mouse
   - Wait for the page to navigate

### Expected Results

- **Navigation verification:**
  - The browser URL should change to include "Python" in the address
  - Expected URL pattern: `https://en.wikipedia.org/wiki/Python` or similar containing "Python"

- **Page content verification:**
  - The page should load successfully without any errors
  - The page title (shown in the browser tab) should contain the word "Python"
  - The page should display relevant content about Python

- **Consistency verification:**
  - The result should be identical to Test Case 1 (Search via Enter Key)
  - Same URL destination
  - Same page content
  - Same page title

### Pass Criteria
- URL contains "Python"
- Page title contains "Python"
- Page loads without errors
- Content is relevant to the search query
- Behavior matches the Enter key search method

### Fail Criteria
- URL does not change or doesn't contain "Python"
- Page shows a 404 error or "Page not found"
- Page title doesn't contain "Python"
- Search button is not clickable or doesn't work
- Results differ from the Enter key method

---

## Automation Notes for LLM Tools

### Key Elements to Identify

**Search Input Field:**
- Role: `searchbox` or `combobox`
- Accessible Name: "Search Wikipedia"
- Action: Click to focus, then type text

**Search Button:**
- Role: `button`
- Accessible Name: "Search"
- Action: Click to submit search

### Validation Points

1. **URL validation:** Check that the current URL matches the pattern `.*Python.*` (contains "Python" anywhere)
2. **Title validation:** Check that the page title matches the pattern `.*Python.*` (contains "Python" anywhere)

### Test Data

- **Search Query:** "Python"
- **Base URL:** https://en.wikipedia.org
- **Expected URL Pattern:** Contains "Python"
- **Expected Title Pattern:** Contains "Python"

### Additional Considerations

- **Wait conditions:** Ensure proper wait for page load after navigation
- **Element stability:** Wait for search field to be visible and enabled before interaction
- **Network conditions:** Tests assume stable internet connection
- **Browser compatibility:** Tests should work across modern browsers (Chrome, Firefox, Edge, Safari)

---

## Test Execution Checklist

- [ ] Test Case 1: Search via Enter Key - Executed
- [ ] Test Case 2: Search via Search Button - Executed
- [ ] Results comparison between both methods
- [ ] Cross-browser testing (if applicable)
- [ ] Screenshot evidence captured (if required)
- [ ] Defects logged (if any failures)

---

## Version History

- **v1.0** - Initial conversion from automated tests to manual test cases
- **Source:** `src/tests/wikipedia-search.spec.ts`
- **Generated with AI assistance**
