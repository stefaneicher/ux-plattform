# Render.com Build Configuration Fix

## Issue
Render.com was attempting to build the frontend using Node.js native runtime instead of the Docker images specified in `render.yaml`. This caused the build to fail with `ng: not found` error because the Angular CLI was in `devDependencies` and not available during production builds.

## Solution Applied
Moved Angular build tools from `devDependencies` to `dependencies` in `frontend/package.json`:
- `@angular/cli`
- `@angular-devkit/build-angular`
- `@angular/compiler-cli`
- `typescript`

## Why This Works
When Render runs `npm install` with `NODE_ENV=production`, it skips `devDependencies`. By moving build tools to `dependencies`, they are always installed and available for the build process.

## Trade-offs
- **Pro**: Build works reliably in any npm environment
- **Con**: Increases production bundle size by including build-time dependencies
- **Con**: Not following npm best practices (build tools should be in devDependencies)

## Recommended Long-term Solution
The repository is configured to use Docker-based deployment (see `render.yaml` and `frontend/Dockerfile`). The ideal setup is to:

1. **Use Docker images**: Configure Render to pull pre-built Docker images from GitHub Container Registry (`ghcr.io/stefaneicher/ux-plattform-frontend:latest`)
   - This is already configured in `render.yaml`
   - Docker multi-stage builds correctly separate build-time and runtime dependencies
   - Smaller production containers
   - Faster deployments

2. **If using native Node.js runtime**, ensure:
   - Build environment doesn't set `NODE_ENV=production` before running `npm install`
   - Or explicitly run `npm install` without `--production` flag
   - Or use `npm ci --include=dev` to install all dependencies

## How to Switch to Docker Deployment
1. Ensure GitHub Actions workflow has run and built the Docker images
2. In Render dashboard, update service to use "Docker" runtime
3. Point to image: `ghcr.io/stefaneicher/ux-plattform-frontend:latest`
4. Revert this change to move build tools back to devDependencies

## References
- Render Blueprint: `render.yaml`
- Frontend Dockerfile: `frontend/Dockerfile`
- Release Workflow: `.github/workflows/release.yml`
- Deployment Guide: `DEPLOYMENT_GUIDE.md`
