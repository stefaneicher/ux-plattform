# Contributing to Enterprise UX Platform

Thank you for your interest in contributing to the Enterprise UX Platform!

## 🚀 Getting Started

1. **Fork the repository** and clone it locally
2. **Install dependencies**: `npm install`
3. **Create a branch** for your feature: `git checkout -b feature/your-feature-name`

## 🛠️ Development Workflow

### Running Tests
```bash
npm test
```

### Running Linter
```bash
npm run lint
```

### Building the Project
```bash
npm run build
```

### Building Storybook
```bash
npm run build:storybook
```

## 📋 Pull Request Process

1. **Update tests** - Ensure all tests pass
2. **Update documentation** - Keep README and docs up to date
3. **Follow code style** - Run linter before committing
4. **Write clear commit messages** - Use conventional commits format
5. **Request review** - Tag relevant maintainers

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(tokens): add new color tokens for dark mode
fix(button): resolve accessibility issue with focus state
docs(readme): update installation instructions
```

## ♿ Accessibility Requirements

All UI components must meet **WCAG AA** standards:

- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Sufficient color contrast (4.5:1 for text)
- ✅ Focus indicators
- ✅ Motion reduction support

## 🧪 Testing Guidelines

- Write unit tests for all new components
- Include accessibility tests
- Test keyboard navigation
- Test screen reader compatibility
- Verify responsive behavior

## 📐 Code Style

- Use TypeScript for type safety
- Follow the existing code structure
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

## 🔒 Security

- Never commit secrets or credentials
- Report security vulnerabilities privately
- Follow secure coding practices
- Keep dependencies up to date

## 📚 Documentation

When adding new features, please update:

- README.md
- Component documentation
- Storybook stories
- JSDoc/TSDoc comments
- Architecture diagrams (if applicable)

## 🤝 Code Review

All submissions require code review. We look for:

- Code quality and maintainability
- Test coverage
- Accessibility compliance
- Documentation completeness
- Performance impact

## 📬 Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Documentation improvements
- General questions

Thank you for contributing! 🎉
