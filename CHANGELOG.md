# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- GitHub Actions workflow for automated release builds
- Docker-based deployment for Render.com
- Automatic Docker image building on release
- GitHub Container Registry integration
- Release documentation and guide

### Changed
- render.yaml now uses Docker images instead of native builds
- render-deploy.json updated to use Docker runtime
- Deployment process now uses GitHub releases

### Infrastructure
- Docker images published to ghcr.io
- Frontend image: `ghcr.io/stefaneicher/ux-plattform-frontend`
- Backend image: `ghcr.io/stefaneicher/ux-plattform-backend`

## [1.0.0] - TBD

### Added
- Initial release setup
- Full-stack application with Angular and NestJS
- MongoDB and Redis integration
- Docker support
- Render.com deployment configuration

---

## Release Types

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes
