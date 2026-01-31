# GitHub Actions Workflows

This project uses GitHub Actions for continuous integration and deployment.

## 🔄 Workflows Overview

### 1. CI Workflow (`.github/workflows/ci.yml`)

**Triggers:**
- Push to `main`, `develop`, or `copilot/**` branches
- Pull requests to `main` or `develop`
- Manual trigger via `workflow_dispatch`

**Jobs:**
- **Build and Test** - Tests on Node.js 18.x and 20.x
  - Install dependencies
  - Run linter
  - Run tests
  - Build project
  - Upload build artifacts (Node 20.x only)

- **Accessibility Check** - Validates WCAG AA compliance
  - Runs after build-and-test
  - Performs accessibility tests

- **Code Quality** - Ensures code standards
  - Runs linter and quality checks

**Badge:** 
```markdown
[![CI](https://github.com/stefaneicher/ux-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/stefaneicher/ux-platform/actions/workflows/ci.yml)
```

### 2. Deploy Storybook (`.github/workflows/deploy.yml`)

**Triggers:**
- Push to `main` branch only
- Manual trigger via `workflow_dispatch`

**Jobs:**
- **Build** - Builds the Storybook static site
  - Install dependencies
  - Build Storybook with design tokens
  - Upload artifact to GitHub Pages

- **Deploy** - Deploys to GitHub Pages
  - Requires GitHub Pages to be enabled
  - Uses `github-pages` environment
  - Provides deployment URL in summary

**Setup Required:**
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The workflow will automatically deploy on push to main

**Badge:**
```markdown
[![Deploy Storybook](https://github.com/stefaneicher/ux-platform/actions/workflows/deploy.yml/badge.svg)](https://github.com/stefaneicher/ux-platform/actions/workflows/deploy.yml)
```

### 3. CodeQL Security Analysis (`.github/workflows/codeql.yml`)

**Triggers:**
- Push to `main` or `develop`
- Pull requests to `main` or `develop`
- Weekly schedule (Monday at midnight)
- Manual trigger via `workflow_dispatch`

**Features:**
- JavaScript/TypeScript code analysis
- Security vulnerability detection
- Code quality analysis
- Results visible in Security tab

**First Run:**
The first CodeQL run requires approval. Go to the Actions tab and approve the workflow.

### 4. Dependency Review (`.github/workflows/dependency-review.yml`)

**Triggers:**
- Pull requests to `main` or `develop`

**Features:**
- Reviews dependency changes
- Checks for vulnerabilities
- Validates licenses
- Denies GPL-2.0 and GPL-3.0 licenses
- Comments summary in PR
- Fails on moderate+ severity vulnerabilities

### 5. Dependabot (`.github/dependabot.yml`)

**Automated Dependency Updates:**
- **npm packages:** Weekly updates on Monday at 9:00 AM
- **GitHub Actions:** Monthly updates
- Ignores major version updates
- Auto-labels: `dependencies`, `automated`
- Assigns to: @stefaneicher

## 🚀 Local Testing

Test workflows locally before pushing:

```bash
# Install dependencies
npm install

# Run linter
npm run lint

# Run tests
npm test

# Build project
npm run build

# Verify artifacts
ls -la dist/
```

## 📊 Monitoring

**View Workflow Runs:**
- Go to: https://github.com/stefaneicher/ux-platform/actions
- Filter by workflow name, branch, or status

**Download Artifacts:**
- CI builds upload artifacts for 7 days
- Download from workflow run page

**Security Alerts:**
- View in Security tab
- CodeQL results
- Dependabot alerts

## 🔒 Permissions

Workflows use `GITHUB_TOKEN` with these permissions:

**CI Workflow:**
- `contents: read` - Read repository code
- `actions: read` - Read actions results

**Deploy Workflow:**
- `contents: read` - Read repository code
- `pages: write` - Write to GitHub Pages
- `id-token: write` - Generate deployment token

**CodeQL Workflow:**
- `security-events: write` - Upload security results
- `actions: read` - Read actions results
- `contents: read` - Read repository code

## 🛠️ Customization

### Add New Workflow

1. Create `.github/workflows/your-workflow.yml`
2. Define triggers and jobs
3. Commit and push
4. Workflow appears in Actions tab

### Modify Existing Workflow

1. Edit workflow file
2. Test locally if possible
3. Commit and push
4. Verify in Actions tab

### Add Secrets

1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add secret name and value
4. Reference in workflow: `${{ secrets.SECRET_NAME }}`

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [GitHub Pages Deployment](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [CodeQL](https://codeql.github.com/docs/)
- [Dependabot](https://docs.github.com/en/code-security/dependabot)
