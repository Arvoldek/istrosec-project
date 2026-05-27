# istrosec-project

## Project Overview

This project implements a **comprehensive automated testing framework** covering frontend UI testing, API testing (CRUD operations and authentication), agent health check validation, and performance testing. The project ensures thorough test coverage across multiple Systems Under Test (SUTs).

**Objective:** Deliver 50+ automated test cases across 5 different testing domains with full reporting and documentation.

---

## Technology Stack

| Technology     | Version | Purpose                            | Documentation                                   |
| -------------- | ------- | ---------------------------------- | ----------------------------------------------- |
| **Playwright** | 1.60.0  | End-to-end testing, API testing    | [playwright.dev](https://playwright.dev/)       |
| **Node.js**    | v18+    | Test runner, dependency management | [nodejs.org](https://nodejs.org/)               |
| **JMeter**     | Latest  | Performance testing                | [jmeter.apache.org](https://jmeter.apache.org/) |
| **Chromium**   | Latest  | Browser for Playwright tests       | -                                               |

### Key Features

- Cross-browser testing (Chromium configured)
- API request testing with Playwright
- Authentication testing (Basic, Bearer, Digest, API Key, OAuth2)
- Performance testing with JMeter
- HTML and terminal reports
- Retry mechanism (1 retry per failed test)
- Screenshot and video recording on failure

---

## Project Structure

```
istrosec-project/
├── configs/                          # Configuration files
│   ├── environments.js              # Environment URLs and endpoints
│   ├── test-data.json                # Test data for all test suites
│   └── agent-schema.json             # Agent health check JSON schema
│
├── tests/                           # All test files
│   ├── frontend/                    # Frontend UI tests (SauceDemo)
│   │   └── saucedemo.spec.js         # 10 frontend test cases
│   │
│   ├── api/                         # API test suites
│   │   ├── basics/                  # Basic CRUD operations
│   │   │   └── jsonplaceholder.spec.js  # 10 API CRUD test cases
│   │   ├── auth/                    # Authentication testing
│   │   │   └── postman-echo.spec.js     # 10 auth test cases
│   │   └── agent/                   # Agent health check validation
│   │       └── healthcheck.spec.js       # 10 agent test cases
│   │
│   └── performance/                 # Performance test suites (JMeter)
│       ├── httpbin.jmx              # JMeter test plan
│       └── run-performance-tests.sh # Test execution script
│
├── reports/                         # Test reports (auto-generated)
│   └── html/                        # HTML test reports
│
├── test-results/                    # Playwright test results
│
├── node_modules/                    # npm dependencies
│
├── .github/                         # GitHub Actions workflows
│   └── workflows/
│       ├── playwright-tests.yml    # Playwright test automation
│       └── performance-tests.yml   # Performance test automation
│
├── playwright.config.js             # Playwright configuration
├── package.json                     # Node.js project configuration
├── package-lock.json                # Dependency lock file
├── .gitignore                       # Git ignore rules
├── instructions.md                  # Original task instructions
└── README.md                        # This file
```

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- **Node.js** v18 or higher
- **npm** v9 or higher
- **JMeter** (for performance testing)
- **Git** (for version control)

### Installation

```bash
# 1. Clone the repository (if not already done)
git clone <repository-url>
cd istrosec-project

# 2. Install Node.js dependencies
npm install

# 3. Install Playwright browsers (Chromium only)
npx playwright install --with-deps chromium

# 4. Install JMeter (macOS using Homebrew)
brew install jmeter

# 5. Verify installations
npx playwright --version
jmeter -v
```

### Configuration

The project uses the following configuration files:

- **`configs/environments.js`** - Contains all SUT URLs and API endpoints
- **`configs/test-data.json`** - Contains test credentials, tokens, and test data
- **`configs/agent-schema.json`** - Defines the expected structure of agent health check data
- **`playwright.config.js`** - Playwright test runner configuration

---

## GitHub Actions Workflows

### Playwright Tests Workflow

**Description:** Automated execution of Playwright tests on code changes with manual override capability.

**Triggers:**
- Automatically on every push or pull request to the `main` branch
- Manually via the GitHub Actions tab

**Manual Execution:**
1. Navigate to **Actions** tab in GitHub repository
2. Select **Playwright Tests** workflow
3. Click **Run workflow** dropdown
4. Select test suite: `all`, `frontend`, `api/basics`, `api/agent`, or `api/auth` (default: all)
5. Click **Run workflow**

**Artifact Access:**
- HTML test report is uploaded as `playwright-report` artifact
- Download available from the workflow run summary page
- Artifacts are retained for 3 days

### Performance Tests Workflow

**Description:** Manual execution of JMeter performance tests.

**Triggers:**
- Manually via the GitHub Actions tab only

**Manual Execution:**
1. Navigate to **Actions** tab in GitHub repository
2. Select **Performance Tests** workflow
3. Click **Run workflow**

**Artifact Access:**
- HTML performance report is uploaded as `performance-report` artifact
- Download available from the workflow run summary page
- Artifacts are retained for 3 days

---

## Running Tests

### All Tests

Run all Playwright tests (frontend, API basics, API auth, agent):

```bash
npx playwright test
```

**Expected Output:** 40 tests passed across 4 test suites

### Test Suites

#### Frontend Test Automation

**SUT:** [https://www.saucedemo.com/](https://www.saucedemo.com/)

**Description:** Tests for the SauceDemo e-commerce application, covering the complete user journey from login to checkout.

**Test Cases:**

| ID     | Description                          | Importance                    | Type     |
| ------ | ------------------------------------ | ----------------------------- | -------- |
| FE-001 | Login with valid credentials         | Core user authentication      | Positive |
| FE-002 | Login with invalid credentials       | Security validation           | Negative |
| FE-003 | Login with locked out user           | Account lockout handling      | Negative |
| FE-004 | View product catalog                 | Main user journey             | Positive |
| FE-005 | Add product to cart                  | Core e-commerce functionality | Positive |
| FE-006 | Remove product from cart             | Cart management               | Positive |
| FE-007 | Complete checkout process            | Revenue-generating path       | Positive |
| FE-008 | Sort products by price (low to high) | UX functionality              | Positive |
| FE-009 | Filter products by name              | Search functionality          | Positive |
| FE-010 | View product details                 | Product research              | Positive |

**Run frontend tests:**

```bash
npx playwright test tests/frontend/
npx playwright test tests/frontend/saucedemo.spec.js
```

**Debug with headed browser:**

```bash
npx playwright test --headed tests/frontend/saucedemo.spec.js
```

---

#### API Test Automation - Basics

**SUT:** [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/)

**Description:** Tests for REST API CRUD operations using a mock JSON API service.

**Test Cases:**

| ID        | Description              | Endpoint          | Importance                  | Type     |
| --------- | ------------------------ | ----------------- | --------------------------- | -------- |
| API-B-001 | GET all posts            | `/posts`          | Data retrieval verification | Positive |
| API-B-002 | GET single post          | `/posts/1`        | Single resource retrieval   | Positive |
| API-B-003 | GET non-existent post    | `/posts/999`      | Error handling              | Negative |
| API-B-004 | POST create new post     | `/posts`          | Data creation               | Positive |
| API-B-005 | POST with invalid data   | `/posts`          | Validation                  | Negative |
| API-B-006 | PUT update existing post | `/posts/1`        | Data update                 | Positive |
| API-B-007 | PUT non-existent post    | `/posts/999`      | Error handling              | Negative |
| API-B-008 | DELETE existing post     | `/posts/1`        | Data deletion               | Positive |
| API-B-009 | DELETE non-existent post | `/posts/999`      | Error handling              | Negative |
| API-B-010 | GET user posts           | `/posts?userId=1` | Query parameters            | Positive |

**Run API basics tests:**

```bash
npx playwright test tests/api/basics/
npx playwright test tests/api/basics/jsonplaceholder.spec.js
```

---

#### Agent Test Automation

**SUT:** Custom Agent Health Check JSON

**Description:** Validates the structure and data of agent health check responses, ensuring all required fields are present and correctly formatted.

**Test Cases:**

| ID     | Description                                    | Importance                 | Type     |
| ------ | ---------------------------------------------- | -------------------------- | -------- |
| AG-001 | Validate complete agent health check structure | All fields present         | Positive |
| AG-002 | Verify agent_id is valid UUID format           | Unique identification      | Positive |
| AG-003 | Verify OS name and version information         | Compatibility checking     | Positive |
| AG-004 | Verify os_version components are valid numbers | Version validation         | Positive |
| AG-005 | Validate adapter_info structure                | Network connectivity       | Positive |
| AG-006 | Validate session_info structure                | Session tracking           | Positive |
| AG-007 | Verify last_boot_time format is valid ISO 8601 | Timestamp validation       | Positive |
| AG-008 | Verify roles array                             | Agent classification       | Positive |
| AG-009 | Handle missing required fields                 | Data validation robustness | Negative |
| AG-010 | Handle invalid data types                      | Type safety                | Negative |

**Schema file:** `configs/agent-schema.json`

**Run agent tests:**

```bash
npx playwright test tests/api/agent/
npx playwright test tests/api/agent/healthcheck.spec.js
```

---

#### API Test Automation - Authentication

**SUT:** [https://postman-echo.com/](https://postman-echo.com/)

**Description:** Tests various authentication mechanisms including Basic Auth, Bearer Token, Digest Auth, API Key, and OAuth2.

**Test Cases:**

| ID        | Description                         | Endpoint        | Importance              | Type     |
| --------- | ----------------------------------- | --------------- | ----------------------- | -------- |
| API-A-001 | Basic Auth - Valid credentials      | `/basic-auth`   | Standard auth mechanism | Positive |
| API-A-002 | Basic Auth - Invalid credentials    | `/basic-auth`   | Auth rejection          | Negative |
| API-A-003 | Basic Auth - Missing credentials    | `/basic-auth`   | Auth required           | Negative |
| API-A-004 | Bearer Token Auth - Valid token     | `/bearer-token` | JWT/OAuth standard      | Positive |
| API-A-005 | Bearer Token Auth - Invalid token   | `/bearer-token` | Token validation        | Negative |
| API-A-006 | Bearer Token Auth - Missing token   | `/bearer-token` | Auth required           | Negative |
| API-A-007 | Digest Auth - Valid credentials     | `/digest-auth`  | Security mechanism      | Positive |
| API-A-008 | API Key Auth - Valid key in headers | `/headers`      | Common API auth         | Positive |
| API-A-009 | API Key Auth - Invalid key          | `/headers`      | Key validation          | Negative |
| API-A-010 | OAuth2 - Token in header            | `/headers`      | Industry standard       | Positive |

**Test data:** See `configs/test-data.json` for authentication credentials and tokens

**Run auth tests:**

```bash
npx playwright test tests/api/auth/
npx playwright test tests/api/auth/postman-echo.spec.js
```

---

#### Performance Tests

**SUT:** [https://httpbin.org](https://httpbin.org)

**Technology:** JMeter (not Playwright)

**Description:** Performance testing scenarios including load testing, stress testing, concurrency testing, and endurance testing.

**Test Cases:**

| ID       | Description                       | Importance             | Type        |
| -------- | --------------------------------- | ---------------------- | ----------- |
| PERF-001 | Load test GET endpoint            | Baseline performance   | Performance |
| PERF-002 | Stress test GET endpoint          | Find breaking point    | Performance |
| PERF-003 | Load test POST endpoint           | With payload           | Performance |
| PERF-004 | Concurrency test                  | Simultaneous users     | Performance |
| PERF-005 | Response time distribution        | Percentile analysis    | Performance |
| PERF-006 | Throughput test                   | Requests/second        | Performance |
| PERF-007 | Endurance test                    | Long-running stability | Performance |
| PERF-008 | Spike test                        | Sudden load spikes     | Performance |
| PERF-009 | Test with different payload sizes | Payload impact         | Performance |
| PERF-010 | Test with query parameters        | Query param impact     | Performance |

**JMeter Test Plan:** `tests/performance/httpbin.jmx`

**Test Plan Configuration:**

- **Load Test:** 13 threads, 2s ramp-up, 13 loops
- **Stress Test:** 11 threads, 1s ramp-up, 13s duration
- **Spike Test:** 20 threads, 0s ramp-up, 7 loops
- **Concurrency Test:** 7 threads, 1s ramp-up, 1 loop

**Run performance tests:**

```bash
# Make the script executable (one-time setup)
chmod +x tests/performance/run-performance-tests.sh

# Run performance tests
./tests/performance/run-performance-tests.sh
```

**Reports:** Generated at `reports/performance/report/index.html`

---

## Test Summary

| Domain             | Tests  | Status       | SUT             |
| ------------------ | ------ | ------------ | --------------- |
| Frontend UI        | 10     | Passing      | SauceDemo       |
| API CRUD           | 10     | Passing      | JSONPlaceholder |
| Agent Health Check | 10     | Passing      | Custom JSON     |
| API Authentication | 10     | Passing      | Postman Echo    |
| Performance        | 10     | Configured   | HTTPBin         |
| **Total**          | **50** | **Complete** | **Multiple**    |

**Current Test Status:** All 40 Playwright tests passing (100% pass rate)

---

## Report Generation

### Generate Reports

After running any Playwright tests, reports are generated in HTML and terminal formats:

```bash
# Run all tests (generates reports automatically)
npx playwright test
```

### Running Tests via GitHub Actions

Both Playwright and Performance tests can be executed through GitHub Actions:

- **Playwright Tests:** Run automatically on push/PR to main, or manually with test suite selection
- **Performance Tests:** Run manually only
- **Artifacts:** HTML reports are available for download for 3 days after each run

See [GitHub Actions Workflows](#github-actions-workflows) section above for detailed instructions.

### Report Locations

| Format   | Location                  | Description                              |
| -------- | ------------------------- | ---------------------------------------- |
| HTML     | `reports/html/index.html` | Interactive HTML report with screenshots |
| Terminal | Terminal output           | Real-time test progress and results      |

### View HTML Report

Open the HTML report in your browser:

```bash
# On macOS
open reports/html/index.html

# On Linux
xdg-open reports/html/index.html

# On Windows
start reports\html\index.html
```

### Performance Reports

JMeter generates HTML reports at:

```
reports/performance/report/index.html
```

---

## Configuration Files

### `configs/environments.js`

Defines all System Under Test (SUT) URLs and API endpoints:

```javascript
module.exports = {
  saucedemo: {
    url: "https://www.saucedemo.com/",
    inventoryUrl: "https://www.saucedemo.com/inventory.html",
  },
  jsonplaceholder: {
    baseUrl: "https://jsonplaceholder.typicode.com",
    postsEndpoint: "/posts",
    usersEndpoint: "/users",
  },
  postmanEcho: {
    baseUrl: "https://postman-echo.com",
    basicAuthEndpoint: "/basic-auth",
    bearerTokenEndpoint: "/bearer-token",
    headersEndpoint: "/headers",
    digestAuthEndpoint: "/digest-auth",
  },
  httpbin: {
    baseUrl: "https://httpbin.org",
    getEndpoint: "/get",
    postEndpoint: "/post",
  },
};
```

### `configs/test-data.json`

Contains all test credentials and test data:

```json
{
  "saucedemo": {
    "valid": { "username": "standard_user", "password": "secret_sauce" },
    "invalid": { "username": "invalid_user", "password": "wrong_password" },
    "locked": { "username": "locked_out_user", "password": "secret_sauce" }
  },
  "auth": {
    "validBearerToken": "valid-token-12345",
    "validApiKey": "PMAK-1234567890abcdefghijklmnopqrstuvwxyz",
    "basicAuth": { "valid": { "username": "postman", "password": "password" } }
  }
}
```

### `configs/agent-schema.json`

Defines the expected structure for agent health check data validation.

---

## Playwright Configuration

**File:** `playwright.config.js`

```javascript
module.exports = {
  testDir: "./tests",
  timeout: 30000,
  retries: 1,
  use: {
    headless: true, // Run tests in headless mode for visibility
    browserName: "chromium", // Use Chromium browser
    screenshot: "only-on-failure", // Capture screenshots on failure
    video: "retain-on-failure", // Record video on failure
    trace: "on-first-retry", // Generate trace on first retry
  },
  reporter: [["line"], ["html", { outputFolder: "reports/html" }]],
};
```

### Configuration Options

- **headless:** Set to `true` for CI/CD environments
- **retries:** Number of retry attempts for failed tests
- **timeout:** Test timeout in milliseconds (default: 30000)
- **screenshot:** `'only-on-failure'` or `'on'` or `'off'`
- **video:** `'retain-on-failure'` or `'on'` or `'off'`

---

## Debugging

1. **Use Playwright Inspector:**

   ```bash
   npx playwright codegen https://www.saucedemo.com/
   ```

2. **Run with debug mode:**

   ```bash
   npx playwright test --debug
   ```

3. **View traces:**
   ```bash
   npx playwright show-report test-results/
   ```
