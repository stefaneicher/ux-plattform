#!/bin/bash
# Release creation helper script
# Usage: ./scripts/create-release.sh v1.0.0 "Release title" "Release notes"

set -e

VERSION=$1
TITLE=$2
NOTES=$3

if [ -z "$VERSION" ]; then
    echo "❌ Error: Version is required"
    echo "Usage: $0 <version> [title] [notes]"
    echo "Example: $0 v1.0.0 'Version 1.0.0' 'Initial release'"
    exit 1
fi

# Validate version format
if ! [[ "$VERSION" =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9.]+)?$ ]]; then
    echo "❌ Error: Invalid version format"
    echo "Version must follow semantic versioning: v1.0.0, v1.0.0-beta, etc."
    exit 1
fi

# Set default title if not provided
if [ -z "$TITLE" ]; then
    TITLE="Version ${VERSION#v}"
fi

# Set default notes if not provided
if [ -z "$NOTES" ]; then
    NOTES="Release $VERSION"
fi

echo "🚀 Creating release..."
echo "   Version: $VERSION"
echo "   Title: $TITLE"
echo "   Notes: $NOTES"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ Error: GitHub CLI (gh) is not installed"
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Error: Not authenticated with GitHub"
    echo "Run: gh auth login"
    exit 1
fi

# Confirm with user
read -p "Create release $VERSION? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelled"
    exit 1
fi

# Create the release
echo "📦 Creating GitHub release..."
gh release create "$VERSION" \
    --title "$TITLE" \
    --notes "$NOTES" \
    --verify-tag

echo ""
echo "✅ Release created successfully!"
echo ""
echo "📋 Next steps:"
echo "  1. Check workflow: gh run list --workflow=release.yml"
echo "  2. Watch progress: gh run watch"
echo "  3. View release: https://github.com/stefaneicher/ux-plattform/releases/tag/$VERSION"
echo ""
echo "🐳 Docker images will be available at:"
echo "  - ghcr.io/stefaneicher/ux-plattform-frontend:$VERSION"
echo "  - ghcr.io/stefaneicher/ux-plattform-backend:$VERSION"
