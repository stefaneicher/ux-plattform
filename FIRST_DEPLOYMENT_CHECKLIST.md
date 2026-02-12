# First Deployment Checklist

Use this checklist when setting up the deployment for the first time.

## ☐ Prerequisites

- [ ] Docker installed locally
- [ ] GitHub CLI (`gh`) installed
- [ ] Authenticated with GitHub (`gh auth login`)
- [ ] Render.com account created
- [ ] Repository access configured

## ☐ Local Testing

- [ ] Frontend builds locally: `cd frontend && npm install && npm run build`
- [ ] Backend builds locally: `cd backend && npm install && npm run build`
- [ ] Docker images build: `docker build -t test ./frontend` and `docker build -t test ./backend`
- [ ] Docker Compose works: `docker-compose up -d`
- [ ] Health checks pass: `curl http://localhost:4200/health` and `curl http://localhost:3000/health`

## ☐ GitHub Setup

- [ ] Make container registry packages public:
  - Go to: https://github.com/users/stefaneicher/packages
  - Click on `ux-plattform-frontend` (after first build)
  - Package settings → Change visibility to "Public"
  - Repeat for `ux-plattform-backend`

- [ ] Optional: Set up Render deploy hook:
  - Get hook URL from Render Dashboard
  - Add as repository secret: `gh secret set RENDER_DEPLOY_HOOK_URL`

## ☐ Render.com Setup

### Option 1: Blueprint (Recommended)

- [ ] Go to https://dashboard.render.com/blueprints
- [ ] Click "New Blueprint Instance"
- [ ] Connect to repository: `stefaneicher/ux-plattform`
- [ ] Select branch: `main`
- [ ] Render will automatically detect `render.yaml`
- [ ] Click "Apply" to create services

### Option 2: Manual Setup

**Frontend Service:**
- [ ] Click "New" → "Web Service"
- [ ] Select "Deploy an existing image from a registry"
- [ ] Image URL: `ghcr.io/stefaneicher/ux-plattform-frontend:latest`
- [ ] Name: `ux-platform-frontend`
- [ ] Region: Frankfurt (or preferred)
- [ ] Plan: Free or Starter
- [ ] Click "Create Web Service"

**Backend Service:**
- [ ] Click "New" → "Web Service"
- [ ] Select "Deploy an existing image from a registry"
- [ ] Image URL: `ghcr.io/stefaneicher/ux-plattform-backend:latest`
- [ ] Name: `ux-platform-backend`
- [ ] Region: Frankfurt (or preferred)
- [ ] Plan: Free or Starter
- [ ] Environment Variables:
  - `PORT`: 3000
  - `NODE_ENV`: production
  - `MONGODB_URI`: (from database)
  - `REDIS_HOST`: (from Redis service)
  - `REDIS_PORT`: (from Redis service)
  - `CORS_ORIGIN`: (frontend URL)
- [ ] Click "Create Web Service"

**MongoDB Database:**
- [ ] Click "New" → "MongoDB"
- [ ] Name: `mongodb`
- [ ] Plan: Free or Starter
- [ ] Click "Create Database"

**Redis Service:**
- [ ] Click "New" → "Redis"
- [ ] Name: `redis`
- [ ] Plan: Free
- [ ] Click "Create Redis"

## ☐ First Release

- [ ] Update `CHANGELOG.md` with initial release notes
- [ ] Create first release using helper script:
  ```bash
  ./scripts/create-release.sh v1.0.0 "Version 1.0.0 - Initial Release" "First production release"
  ```

- [ ] Or create manually:
  ```bash
  gh release create v1.0.0 \
    --title "Version 1.0.0 - Initial Release" \
    --notes "First production deployment"
  ```

## ☐ Verify Deployment

### GitHub Actions

- [ ] Check workflow started: `gh run list --workflow=release.yml`
- [ ] Monitor progress: `gh run watch`
- [ ] Verify success: Workflow should show green checkmark
- [ ] Check Docker images published:
  - https://github.com/stefaneicher/packages

### Render.com

- [ ] Check services are deploying:
  - Go to https://dashboard.render.com
  - All services should show "Deploy in progress" or "Live"
- [ ] Wait for deployment to complete (~5-10 minutes)
- [ ] Check logs for any errors

### Health Checks

- [ ] Frontend health: `curl https://your-frontend.onrender.com/health`
  - Expected: `healthy`
- [ ] Backend health: `curl https://your-backend.onrender.com/health`
  - Expected: JSON with status
- [ ] Frontend loads in browser: Open frontend URL
- [ ] Backend API responds: `curl https://your-backend.onrender.com/`

## ☐ Post-Deployment

- [ ] Update `README.md` with production URLs
- [ ] Set up monitoring/alerts in Render Dashboard
- [ ] Configure custom domain (optional)
- [ ] Set up SSL certificate (automatic with Render)
- [ ] Test all major features work
- [ ] Document any environment-specific configurations
- [ ] Share production URLs with team

## ☐ Ongoing Maintenance

- [ ] Monitor application logs regularly
- [ ] Check for security updates: `npm audit`
- [ ] Update dependencies: Dependabot PRs
- [ ] Create releases for new versions
- [ ] Back up database regularly
- [ ] Review Render metrics

## 🚨 Troubleshooting

If something goes wrong, check:

1. **GitHub Actions Logs**
   ```bash
   gh run view --log
   ```

2. **Docker Images**
   ```bash
   # Pull and test locally
   docker pull ghcr.io/stefaneicher/ux-plattform-frontend:latest
   docker run -p 8080:80 ghcr.io/stefaneicher/ux-plattform-frontend:latest
   ```

3. **Render Logs**
   - Dashboard → Service → Logs tab
   - Look for deployment errors

4. **Common Issues**
   - Images not public → Make packages public in GitHub
   - Build fails → Check Dockerfile syntax
   - Deploy fails → Check render.yaml configuration
   - Connection fails → Check environment variables

## 📚 Documentation Reference

- [QUICKSTART_RELEASES.md](./QUICKSTART_RELEASES.md) - How to create releases
- [RELEASE_GUIDE.md](./RELEASE_GUIDE.md) - Detailed release documentation
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deployment options
- [DOCKER_RELEASE_SUMMARY.md](./DOCKER_RELEASE_SUMMARY.md) - System overview

## ✅ Success Criteria

Deployment is successful when:

- ✅ GitHub Actions workflow completes successfully
- ✅ Docker images are published to ghcr.io
- ✅ Render services show "Live" status
- ✅ Health endpoints respond correctly
- ✅ Frontend loads in browser
- ✅ Backend API is accessible
- ✅ All application features work

---

**Keep this checklist for reference during initial setup!**

After successful first deployment, you can use the streamlined release process for future deployments.
