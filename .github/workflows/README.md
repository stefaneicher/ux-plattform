# GitHub Actions Workflows

This directory contains all GitHub Actions workflows for the UX Platform project.

## Available Workflows

### 1. CI (ci.yml)

**Trigger:** Push to main/develop, Pull Requests, Manual dispatch

**Purpose:** Continuous Integration - Build, test, and validate code

**Jobs:**
- Build and test on Node.js 18.x and 20.x
- Run linter
- Run tests
- Build project
- Accessibility checks
- Code quality checks

**Badge:** [![CI](https://github.com/stefaneicher/ux-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/stefaneicher/ux-platform/actions/workflows/ci.yml)

---

### 2. Deploy Storybook (deploy.yml)

**Trigger:** Push to main, Manual dispatch

**Purpose:** Build and deploy Storybook/Design System to GitHub Pages

**Jobs:**
- Build Storybook
- Deploy to GitHub Pages

**Output:** https://stefaneicher.github.io/ux-platform/

**Badge:** [![Deploy Storybook](https://github.com/stefaneicher/ux-platform/actions/workflows/deploy.yml/badge.svg)](https://github.com/stefaneicher/ux-platform/actions/workflows/deploy.yml)

---

### 3. Build and Release (release.yml)

**Trigger:** GitHub Release published, Manual dispatch

**Purpose:** Build Docker images and publish to GitHub Container Registry

**Jobs:**
- Build Docker images for frontend and backend
- Push images to ghcr.io with version tags
- Trigger Render.com deployment (optional)

**Output Images:**
- `ghcr.io/stefaneicher/ux-plattform-frontend:latest`
- `ghcr.io/stefaneicher/ux-plattform-frontend:vX.Y.Z`
- `ghcr.io/stefaneicher/ux-plattform-backend:latest`
- `ghcr.io/stefaneicher/ux-plattform-backend:vX.Y.Z`

**Badge:** [![Build and Release](https://github.com/stefaneicher/ux-platform/actions/workflows/release.yml/badge.svg)](https://github.com/stefaneicher/ux-platform/actions/workflows/release.yml)

**Usage:**
```bash
# Create a release to trigger this workflow
gh release create v1.0.0 --title "Version 1.0.0" --notes "Release notes"

# Or manually trigger with a specific tag
gh workflow run release.yml -f tag=v1.0.0
```

---

### 4. CodeQL Analysis (codeql.yml)

**Trigger:** Push to main, Pull Requests, Weekly schedule

**Purpose:** Security analysis using CodeQL

**Jobs:**
- Analyze code for security vulnerabilities
- Check for common coding issues

---

### 5. Dependency Review (dependency-review.yml)

**Trigger:** Pull Requests

**Purpose:** Review dependencies for security issues

**Jobs:**
- Check for vulnerable dependencies
- Review license compliance

---

## Workflow Execution Order

### On Pull Request:
1. CI (ci.yml) - Validates code
2. Dependency Review (dependency-review.yml) - Checks dependencies
3. CodeQL (codeql.yml) - Security analysis

### On Merge to Main:
1. CI (ci.yml) - Final validation
2. Deploy Storybook (deploy.yml) - Updates documentation

### On Release:
1. Build and Release (release.yml) - Builds and publishes Docker images
2. Render.com automatically deploys new images

## Required Secrets

### For Release Workflow:
- `GITHUB_TOKEN` - Automatically provided (for ghcr.io push)
- `RENDER_DEPLOY_HOOK_URL` - Optional, for triggering Render deployment

### To Add Secrets:
```bash
# Via GitHub CLI
gh secret set RENDER_DEPLOY_HOOK_URL --body "https://api.render.com/deploy/..."

# Or via GitHub UI
# Settings → Secrets and variables → Actions → New repository secret
```

## Manual Workflow Triggers

### Trigger CI Manually:
```bash
gh workflow run ci.yml
```

### Trigger Deploy Manually:
```bash
gh workflow run deploy.yml
```

### Trigger Release Build Manually:
```bash
gh workflow run release.yml -f tag=v1.0.0
```

## Monitoring Workflows

### List Recent Runs:
```bash
gh run list

# For specific workflow
gh run list --workflow=release.yml
```

### View Run Details:
```bash
gh run view <run-id>

# View logs
gh run view <run-id> --log
```

### Watch a Running Workflow:
```bash
gh run watch
```

## Troubleshooting

### Build Fails:
1. Check the logs: `gh run view <run-id> --log`
2. Reproduce locally: `docker build -t test ./frontend`
3. Check for missing dependencies or environment issues

### Docker Push Fails:
1. Verify GITHUB_TOKEN has package write permissions
2. Check if Container Registry is enabled in repo settings
3. Ensure image names match repository structure

### Render Deployment Not Triggered:
1. Verify RENDER_DEPLOY_HOOK_URL is set correctly
2. Check Render dashboard for deployment logs
3. Try manual deployment: `curl -X POST $RENDER_DEPLOY_HOOK_URL`

---

For more information, see:
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Release Guide](../RELEASE_GUIDE.md)
- [Deployment Guide](../DEPLOYMENT_GUIDE.md)
