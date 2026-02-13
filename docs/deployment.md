# Deployment Guide

This guide explains how to deploy the Enterprise UX Platform.

## 🌐 GitHub Pages Deployment

The Storybook documentation site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Setup GitHub Pages (One-Time)

1. **Enable GitHub Pages:**
   - Go to: https://github.com/stefaneicher/ux-platform/settings/pages
   - Under "Source", select **GitHub Actions**
   - Click Save

2. **Verify Workflow:**
   - Push a commit to `main` branch
   - Check Actions tab: https://github.com/stefaneicher/ux-platform/actions
   - Wait for "Deploy Storybook" workflow to complete

3. **Access Site:**
   - URL will be: `https://stefaneicher.github.io/ux-platform/`
   - Find exact URL in workflow run summary

### Manual Deployment

To manually deploy to GitHub Pages:

```bash
# 1. Build the project locally
npm run build

# 2. Verify build output
ls -la dist/storybook/

# 3. Trigger manual deployment
# Go to: https://github.com/stefaneicher/ux-platform/actions/workflows/deploy.yml
# Click "Run workflow" → Select branch → "Run workflow"
```

## 🏢 Enterprise Deployment Options

For production enterprise deployment, consider these options:

### Option 1: Static Site Hosting

Deploy the static Storybook build to any static hosting provider:

**Build locally:**
```bash
npm run build
cd dist/storybook
# Upload contents to hosting provider
```

**Hosting providers:**
- AWS S3 + CloudFront
- Azure Static Web Apps
- Netlify
- Vercel
- Cloudflare Pages

### Option 2: Container Deployment

**Create Dockerfile:**
```dockerfile
FROM nginx:alpine

# Copy built files
COPY dist/storybook /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Build and run:**
```bash
# Build the project
npm run build

# Build Docker image
docker build -t ux-platform:latest .

# Run container
docker run -p 8080:80 ux-platform:latest
```

**Deploy to:**
- Kubernetes
- AWS ECS/Fargate
- Azure Container Apps
- Google Cloud Run

### Option 3: CDN Distribution

For enterprise-scale distribution:

1. **Build assets:**
   ```bash
   npm run build
   ```

2. **Upload to CDN:**
   - Upload `dist/tokens.css` and `dist/tokens.ts` to CDN
   - Make available at predictable URLs

3. **Consumers reference:**
   ```html
   <link rel="stylesheet" href="https://cdn.example.com/ux-platform/tokens.css">
   ```

## 🔄 CI/CD Integration

### GitHub Actions (Current Setup)

The project includes automated deployment:

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [ main ]
```

**Flow:**
1. Developer pushes to `main`
2. CI workflow runs (build, test, lint)
3. Deploy workflow triggers
4. Storybook builds with latest tokens
5. Deploys to GitHub Pages
6. Site available at production URL

### Add Environment Variables

For advanced deployments, add secrets:

1. Go to Settings → Secrets and variables → Actions
2. Add deployment secrets:
   - `DEPLOY_TOKEN` - Authentication token
   - `DEPLOY_URL` - Target deployment URL
   - `CDN_KEY` - CDN upload credentials

3. Reference in workflow:
   ```yaml
   - name: Deploy
     env:
       TOKEN: ${{ secrets.DEPLOY_TOKEN }}
     run: npm run deploy
   ```

## 🏷️ Versioning Strategy

### Semantic Versioning

The platform follows semver (MAJOR.MINOR.PATCH):

- **MAJOR:** Breaking changes to design tokens or APIs
- **MINOR:** New components, tokens, or features (backward compatible)
- **PATCH:** Bug fixes, documentation updates

### Release Process

1. **Update Version:**
   ```bash
   npm version patch  # or minor/major
   ```

2. **Create Tag:**
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

3. **Create GitHub Release:**
   - Go to: https://github.com/stefaneicher/ux-platform/releases/new
   - Select tag
   - Add release notes
   - Attach build artifacts if needed

4. **Publish to npm (Optional):**
   ```bash
   npm publish --access public
   ```

## 📦 Distribution Formats

The platform can be distributed in multiple formats:

### 1. npm Package

**Publish to npm:**
```bash
# Login to npm
npm login

# Publish package
npm publish --access public
```

**Consumers install:**
```bash
npm install @enterprise-ux/platform
```

**Usage:**
```javascript
// Import tokens
import { designTokens } from '@enterprise-ux/platform/dist/tokens';

// Or import CSS
import '@enterprise-ux/platform/dist/tokens.css';
```

### 2. Git Submodule

**Add as submodule:**
```bash
git submodule add https://github.com/stefaneicher/ux-platform.git libs/ux-platform
```

### 3. Direct Download

Download specific versions:
- Release: https://github.com/stefaneicher/ux-platform/releases
- Archive: https://github.com/stefaneicher/ux-platform/archive/refs/heads/main.zip

## 🔒 Security Considerations

### Production Checklist

- [ ] Enable branch protection on `main`
- [ ] Require PR reviews before merge
- [ ] Enable CodeQL security scanning
- [ ] Monitor Dependabot alerts
- [ ] Use secrets for sensitive data
- [ ] Enable 2FA for maintainers
- [ ] Regular security audits
- [ ] Keep dependencies updated

### Access Control

**GitHub Environments:**
1. Go to Settings → Environments
2. Create `production` environment
3. Add required reviewers
4. Add deployment branch rules

**Update workflow:**
```yaml
jobs:
  deploy:
    environment:
      name: production
      url: https://stefaneicher.github.io/ux-platform/
```

## 📊 Monitoring

### Deployment Monitoring

**Track deployments:**
- GitHub Actions: https://github.com/stefaneicher/ux-platform/actions
- GitHub Pages: https://github.com/stefaneicher/ux-platform/deployments

**Set up alerts:**
- Watch repository for notifications
- Enable email notifications for failed workflows
- Use GitHub Status API for custom monitoring

### Usage Analytics

For production sites, add analytics:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>

<!-- Or custom analytics -->
<script src="https://analytics.example.com/tracker.js"></script>
```

## 🆘 Troubleshooting

### Deployment Fails

1. **Check workflow logs:**
   - Go to Actions tab
   - Click failed workflow run
   - Review job logs

2. **Common issues:**
   - Build errors: Fix build locally first
   - Permission errors: Check repository settings
   - GitHub Pages not enabled: Enable in Settings

3. **Retry deployment:**
   - Re-run workflow from Actions tab
   - Or push new commit to main

### Site Not Updating

1. **Clear cache:**
   - Hard refresh browser (Ctrl+Shift+R)
   - Clear CDN cache if using one

2. **Verify deployment:**
   - Check latest workflow run succeeded
   - Verify files in gh-pages branch (if applicable)

3. **Check DNS/CNAME:**
   - Verify custom domain configuration
   - Check DNS propagation

## 📞 Support

For deployment issues:

1. **Check documentation:** [docs/github-actions.md](./github-actions.md)
2. **Review logs:** Actions tab → Failed workflow → Job logs
3. **Open issue:** https://github.com/stefaneicher/ux-platform/issues
4. **Contact maintainers:** @stefaneicher

---

**Next Steps:**
- [GitHub Actions Setup](./github-actions.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [README](../README.md)
