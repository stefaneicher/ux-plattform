# GitHub Pages Deployment - Troubleshooting

## ⚠️ Problem: Deployment failing with 404 error

If you see this error in the workflow logs:

```
##[error]Creating Pages deployment failed
##[error]HttpError: Not Found
##[error]Error: Failed to create deployment (status: 404)
Ensure GitHub Pages has been enabled: https://github.com/stefaneicher/ux-plattform/settings/pages
```

**Root cause:** GitHub Pages is not enabled or not configured correctly in the repository settings.

## ✅ Solution: Enable GitHub Pages

Follow these steps **ONE TIME** to fix the deployment issue:

### Step 1: Navigate to Repository Settings

Go to: **https://github.com/stefaneicher/ux-plattform/settings/pages**

Or manually:
1. Click on **Settings** tab in your repository
2. Scroll down to **Pages** in the left sidebar
3. Click on **Pages**

### Step 2: Configure GitHub Pages Source

Under the **"Build and deployment"** section:

1. **Source:** Select **"GitHub Actions"** from the dropdown
   - ⚠️ Do NOT select "Deploy from a branch"
   - ✅ Must be "GitHub Actions"

2. Click **Save** if a save button appears

### Step 3: Verify Configuration

After configuring, you should see:
- Source: **GitHub Actions** (with a checkmark or confirmation)
- A note that your site will be published from GitHub Actions workflows

### Step 4: Test Deployment

Now trigger a deployment:

**Option A: Push to main branch**
```bash
git push origin main
```

**Option B: Manual workflow trigger**
1. Go to: https://github.com/stefaneicher/ux-plattform/actions/workflows/deploy.yml
2. Click **"Run workflow"** button
3. Select **main** branch
4. Click **"Run workflow"** button

### Step 5: Monitor Deployment

1. Go to Actions tab: https://github.com/stefaneicher/ux-plattform/actions
2. Click on the running "Deploy Storybook" workflow
3. Wait for it to complete (usually 1-2 minutes)
4. Check for green checkmarks on both jobs:
   - ✅ Build Storybook
   - ✅ Deploy to GitHub Pages

### Step 6: Access Your Site

Once deployment succeeds:

**Your site will be available at:**
- Main site: `https://stefaneicher.github.io/ux-plattform/`
- Demo page: `https://stefaneicher.github.io/ux-plattform/demo.html`

The exact URL will also be shown in the workflow run summary.

## 🔍 Verification

To verify everything is working:

1. **Check workflow status:**
   ```bash
   # Should return 200 OK after successful deployment
   curl -I https://stefaneicher.github.io/ux-plattform/
   ```

2. **View deployments:**
   - Go to: https://github.com/stefaneicher/ux-plattform/deployments
   - You should see successful "github-pages" deployments

3. **Test the site:**
   - Open https://stefaneicher.github.io/ux-plattform/ in your browser
   - Verify you see the Enterprise UX Platform documentation
   - Check that demo.html loads correctly

## 🎯 Why This Happens

The GitHub Actions workflow (`.github/workflows/deploy.yml`) requires:
1. GitHub Pages to be **enabled** in repository settings
2. GitHub Pages source set to **"GitHub Actions"** (not "Deploy from a branch")
3. Proper permissions for the workflow (already configured in the workflow file)

Without step 1 and 2, GitHub's API returns a 404 error when the workflow tries to create a deployment, causing the deployment to fail.

## 📚 Additional Resources

- [Complete GitHub Pages Setup Guide](docs/GITHUB_PAGES_SETUP.md)
- [Deployment Guide](docs/deployment.md)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## 💡 Common Questions

**Q: Do I need to do this every time I deploy?**
A: No! This is a **one-time setup**. Once GitHub Pages is enabled with GitHub Actions as the source, all future deployments will work automatically.

**Q: What if I don't have access to repository settings?**
A: You need admin access to the repository to enable GitHub Pages. Contact the repository owner (@stefaneicher) to grant you access or ask them to enable it.

**Q: Can I use a custom domain?**
A: Yes! After enabling GitHub Pages, you can configure a custom domain in the same Settings → Pages section.

**Q: The deployment succeeded but I get 404 when visiting the site**
A: Wait 1-2 minutes after deployment. GitHub Pages needs time to propagate the changes. Also try a hard refresh (Ctrl+Shift+R).

## 🆘 Still Having Issues?

If you've followed all steps and deployment still fails:

1. **Check workflow permissions:**
   - Go to: Settings → Actions → General
   - Under "Workflow permissions", ensure:
     - ✅ "Read and write permissions" is selected
     - ✅ "Allow GitHub Actions to create and approve pull requests" is checked

2. **Verify the workflow file:**
   - Check `.github/workflows/deploy.yml` has correct permissions:
     ```yaml
     permissions:
       contents: read
       pages: write
       id-token: write
     ```

3. **Check Actions are enabled:**
   - Settings → Actions → General
   - Ensure Actions are enabled for this repository

4. **Open an issue:**
   - Go to: https://github.com/stefaneicher/ux-plattform/issues
   - Include:
     - Workflow run URL
     - Screenshot of error
     - Screenshot of your Pages settings

---

**Last Updated:** February 2026  
**Status:** This is a known setup requirement for GitHub Pages with GitHub Actions
