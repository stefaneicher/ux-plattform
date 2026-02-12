# Quick Start: Releases and Deployment

This is a quick reference guide for creating releases and deploying to Render.com.

## 🚀 Create a Release (Production Deployment)

### Option 1: GitHub UI (Easiest)

1. Go to https://github.com/stefaneicher/ux-plattform/releases
2. Click **"Draft a new release"**
3. Click **"Choose a tag"** and enter a new version (e.g., `v1.0.0`)
4. Add a title: `Version 1.0.0`
5. Add release notes describing changes
6. Click **"Publish release"**

✅ Done! GitHub Actions will automatically:
- Build Docker images
- Push to GitHub Container Registry
- Trigger Render.com deployment

### Option 2: GitHub CLI (Fastest)

```bash
# Create and publish a release
gh release create v1.0.0 \
  --title "Version 1.0.0 - Initial Release" \
  --notes "Production release with new features"

# Or with a file for notes
gh release create v1.0.0 \
  --title "Version 1.0.0" \
  --notes-file RELEASE_NOTES.md
```

### Option 3: Git Tag + GitHub UI

```bash
# Create a tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Then go to GitHub and create release from tag
```

## 📦 What Happens Automatically

When you create a release:

1. **GitHub Actions** (`release.yml` workflow) triggers
2. **Docker images** are built:
   - `ghcr.io/stefaneicher/ux-plattform-frontend:v1.0.0`
   - `ghcr.io/stefaneicher/ux-plattform-frontend:latest`
   - `ghcr.io/stefaneicher/ux-plattform-backend:v1.0.0`
   - `ghcr.io/stefaneicher/ux-plattform-backend:latest`
3. **Images pushed** to GitHub Container Registry
4. **Render.com** pulls the latest images and deploys (if configured)

## ✅ Verify Deployment

### Check GitHub Actions

```bash
# List recent workflow runs
gh run list --workflow=release.yml

# View specific run
gh run view <run-id>

# Watch live
gh run watch
```

### Check Docker Images

```bash
# View package versions
gh api /users/stefaneicher/packages/container/ux-plattform-frontend/versions

# Pull and test locally
docker pull ghcr.io/stefaneicher/ux-plattform-frontend:latest
docker run -p 8080:80 ghcr.io/stefaneicher/ux-plattform-frontend:latest
```

### Check Render.com

1. Go to https://dashboard.render.com
2. Check service status
3. View deployment logs
4. Test application URL

## 📝 Version Numbering

Follow [Semantic Versioning](https://semver.org/):

- **v1.0.0** - Major release (breaking changes)
- **v1.1.0** - Minor release (new features)
- **v1.1.1** - Patch release (bug fixes)
- **v1.0.0-beta** - Pre-release

## 🐛 Troubleshooting

### Build Failed

```bash
# Check logs
gh run view --log

# Rebuild manually
gh workflow run release.yml -f tag=v1.0.0
```

### Render Not Deploying

1. Check if images are public in GitHub Packages
2. Check Render dashboard for errors
3. Manually trigger deployment in Render dashboard
4. Verify render.yaml configuration

### Image Not Found

```bash
# Make package public
# Go to: https://github.com/users/stefaneicher/packages/container/ux-plattform-frontend/settings
# Change visibility to "Public"
```

## 🔗 Related Documentation

- [Complete Release Guide](./RELEASE_GUIDE.md) - Detailed documentation
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - All deployment options
- [Changelog](./CHANGELOG.md) - Version history

## 💡 Tips

- Always test locally before releasing: `docker-compose up`
- Update CHANGELOG.md before releasing
- Tag releases with semantic version numbers
- Add meaningful release notes
- Test the deployment after release

---

**Quick Commands Reference:**

```bash
# Create release
gh release create v1.0.0 --title "Version 1.0.0" --notes "Release notes"

# Check release workflow status
gh run list --workflow=release.yml

# View logs
gh run view --log

# Test locally
docker-compose up -d
curl http://localhost:4200/health
curl http://localhost:3000/health
```
