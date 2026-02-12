# GitHub Pages Setup Guide

This guide explains how to configure GitHub Pages for the UX Platform documentation site.

## ✅ Quick Setup (Required Once)

> ⚠️ **Deployment failing with 404 error?** See the [Troubleshooting Guide](../GITHUB_PAGES_TROUBLESHOOTING.md) for detailed help.

### Step 1: Enable GitHub Actions as Source

1. Go to your repository settings:
   ```
   https://github.com/stefaneicher/ux-plattform/settings/pages
   ```

2. Under **"Build and deployment"** section:
   - **Source:** Select **"GitHub Actions"**
   - Click **Save** (if button is present)

3. That's it! The deployment workflow is already configured.

### Step 2: Trigger Deployment

The site will automatically deploy when you:
- Push commits to the `main` branch
- Manually trigger the workflow from Actions tab

**Manual Trigger:**
1. Go to: https://github.com/stefaneicher/ux-platform/actions/workflows/deploy.yml
2. Click **"Run workflow"** button
3. Select **main** branch
4. Click **"Run workflow"**

### Step 3: Access Your Site

After deployment completes (usually 1-2 minutes):

**Primary URLs:**
- Documentation: `https://stefaneicher.github.io/ux-platform/`
- Demo Page: `https://stefaneicher.github.io/ux-platform/demo.html`

**Find deployment URL:**
1. Go to: https://github.com/stefaneicher/ux-platform/actions
2. Click on the latest "Deploy Storybook" workflow run
3. The deployment URL is shown in the summary

## 🔍 Verification

### Check Deployment Status

1. **Actions Tab:**
   - https://github.com/stefaneicher/ux-platform/actions
   - Look for green checkmark on "Deploy Storybook" workflow

2. **Deployments:**
   - https://github.com/stefaneicher/ux-platform/deployments
   - Shows deployment history and status

3. **Test URLs:**
   ```bash
   # Check if site is accessible
   curl -I https://stefaneicher.github.io/ux-platform/
   
   # Check if demo.html exists
   curl -I https://stefaneicher.github.io/ux-platform/demo.html
   ```

### Expected Files on GitHub Pages

```
https://stefaneicher.github.io/ux-platform/
├── index.html          # Main documentation site
├── demo.html           # Interactive demo page
└── (other assets)      # CSS, images, etc.
```

## 🛠️ How It Works

### Automated Workflow

The `.github/workflows/deploy.yml` workflow:

1. **Triggers on:**
   - Push to `main` branch
   - Manual workflow dispatch

2. **Build Job:**
   - Checks out code
   - Installs dependencies (`npm ci`)
   - Builds project (`npm run build`)
     - Builds design tokens
     - Builds documentation site
     - Copies demo.html to output
   - Uploads `dist/storybook/` to GitHub Pages

3. **Deploy Job:**
   - Deploys uploaded artifact to GitHub Pages
   - Provides deployment URL in summary

### Build Process

```bash
npm run build
  ├── npm run build:tokens      # Generate design tokens
  │   └── Output: dist/tokens.css, dist/tokens.ts
  │
  └── npm run build:storybook   # Generate documentation
      └── Output: dist/storybook/index.html, dist/storybook/demo.html
```

## 🚨 Troubleshooting

### Issue: "404 Page Not Found"

**Possible causes:**

1. **GitHub Pages not enabled:**
   - Solution: Go to Settings → Pages → Set Source to "GitHub Actions"

2. **Deployment failed:**
   - Check Actions tab for errors
   - Review workflow logs
   - Re-run failed workflow

3. **Files not in correct directory:**
   - Verify `dist/storybook/` contains index.html and demo.html
   - Check workflow uploads correct path: `./dist/storybook`

### Issue: "Demo.html not found"

**Possible causes:**

1. **Source file missing:**
   - Verify `docs/demo.html` exists in repository
   - Check build logs show "✅ Copied demo.html"

2. **Build step failed:**
   - Check workflow logs for build errors
   - Test build locally: `npm run build`

3. **Wrong URL:**
   - Ensure using: `https://stefaneicher.github.io/ux-platform/demo.html`
   - Not: `https://stefaneicher.github.io/ux-platform/docs/demo.html`

### Issue: "Changes not showing"

**Solutions:**

1. **Clear browser cache:**
   - Hard refresh: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
   - Clear cache and cookies

2. **Wait for deployment:**
   - GitHub Pages may take 1-2 minutes to update
   - Check Actions tab to ensure deployment completed

3. **Verify workflow ran:**
   - Check that push to `main` triggered workflow
   - Look for recent "Deploy Storybook" run in Actions

### Issue: "Workflow permission denied"

**Solution:**

1. Go to Settings → Actions → General
2. Under "Workflow permissions":
   - Select **"Read and write permissions"**
   - Check **"Allow GitHub Actions to create and approve pull requests"**
3. Click **Save**

## 📝 Configuration Details

### Workflow Permissions

The deploy workflow requires these permissions:

```yaml
permissions:
  contents: read    # Read repository code
  pages: write      # Write to GitHub Pages
  id-token: write   # Generate deployment token
```

### GitHub Pages Settings

**Required configuration:**
- **Source:** GitHub Actions (not "Deploy from a branch")
- **Branch:** Not applicable (using GitHub Actions)
- **Custom domain:** Optional

**Environment:**
- Name: `github-pages`
- URL: Auto-generated by GitHub

### Build Configuration

**Node.js version:** 20.x

**Dependencies:**
- Installed via `npm ci` for reproducible builds
- Uses `package-lock.json` for version pinning

**Build command:** `npm run build`
- Builds design tokens first
- Then builds documentation site
- Outputs to `dist/storybook/`

## 🔗 Related Documentation

- [Deployment Guide](./deployment.md) - Full deployment documentation
- [GitHub Actions](./github-actions.md) - All workflow details
- [Contributing](../CONTRIBUTING.md) - Development guidelines
- [README](../README.md) - Project overview

## 💡 Tips

1. **Test locally first:**
   ```bash
   npm run build
   cd dist/storybook
   python3 -m http.server 8000
   # Open http://localhost:8000
   ```

2. **Monitor deployments:**
   - Watch Actions tab after pushing to main
   - Set up notifications for failed workflows

3. **Custom domain:**
   - Add CNAME file to `dist/storybook/` if needed
   - Configure in repository settings

4. **Branch protection:**
   - Protect `main` branch to prevent accidental deployments
   - Require PR reviews before merge

---

**Need Help?**

- Check [deployment troubleshooting](./deployment.md#-troubleshooting)
- Review [workflow logs](https://github.com/stefaneicher/ux-platform/actions)
- Open an [issue](https://github.com/stefaneicher/ux-platform/issues)
