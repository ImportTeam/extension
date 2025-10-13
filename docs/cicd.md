# CI/CD 파이프라인

> GitHub Actions 기반 자동화 빌드 및 배포

## 워크플로우 구조

```
Push/PR → Build → Test → Pack → Deploy
           ↓       ↓      ↓       ↓
         Lint   Unit    Zip    Store
                E2E           Upload
```

## Build Workflow

**파일**: `.github/workflows/build.yml`

```yaml
name: Build

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Lint
        run: pnpm lint
      
      - name: Type check
        run: pnpm type-check
      
      - name: Build
        run: pnpm build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
```

## Test Workflow

**파일**: `.github/workflows/test.yml`

```yaml
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  unit:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm test:unit
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  e2e:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm build
      
      - name: Install Playwright
        run: pnpm exec playwright install --with-deps chromium
      
      - name: Run E2E tests
        run: pnpm test:e2e
      
      - name: Upload test results
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

## Release Workflow

**파일**: `.github/workflows/release.yml`

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm build
      
      - name: Pack extension
        run: |
          cd dist
          zip -r ../extension.zip .
          cd ..
      
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          files: extension.zip
          generate_release_notes: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Upload to Chrome Web Store
        uses: mnao305/chrome-extension-upload@v4.0.1
        with:
          file-path: extension.zip
          extension-id: ${{ secrets.EXTENSION_ID }}
          client-id: ${{ secrets.CLIENT_ID }}
          client-secret: ${{ secrets.CLIENT_SECRET }}
          refresh-token: ${{ secrets.REFRESH_TOKEN }}
```

## Secrets 설정

GitHub Repository Settings → Secrets and variables → Actions:

```
EXTENSION_ID=your-extension-id
CLIENT_ID=your-oauth-client-id
CLIENT_SECRET=your-oauth-client-secret
REFRESH_TOKEN=your-refresh-token
```

### Chrome Web Store API 설정

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 프로젝트 생성
3. Chrome Web Store API 활성화
4. OAuth 2.0 클라이언트 ID 생성
5. Refresh token 발급

## 배포 스크립트

**파일**: `scripts/deploy.sh`

```bash
#!/bin/bash
set -e

VERSION=$1

if [ -z "$VERSION" ]; then
  echo "Usage: ./scripts/deploy.sh <version>"
  exit 1
fi

# Update version
npm version $VERSION --no-git-tag-version

# Commit
git add package.json src/manifest.json
git commit -m "chore: bump version to $VERSION"

# Tag
git tag "v$VERSION"

# Push
git push origin main
git push origin "v$VERSION"

echo "✅ Deployed v$VERSION"
```

## 사용법

```bash
# 개발 빌드
pnpm dev

# 프로덕션 빌드
pnpm build

# 테스트
pnpm test

# 릴리즈
./scripts/deploy.sh 1.0.1
```

## 다음 단계

- [모니터링 & 로깅](./monitoring.md)
- [QA 체크리스트](./qa-checklist.md)
