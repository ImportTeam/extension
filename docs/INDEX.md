# 📚 PicSel Documentation Index

## 🎯 Quick Links

### For Frontend Team
- **[API Specification](./API_SPEC_PRICE_COMPARISON.md)** - Complete API contract and data format
- **[UI Implementation Guide](./guide/UI_IMPLEMENTATION.md)** - Component development guide
- **[Content Script Guide](./guide/content-script.md)** - How to extract product info from pages

### For Backend Team
- **[🐛 Bug Report: price_trend AttributeError](./BACKEND_BUG_REPORT_PRICE_TREND.md)** - Critical bug with fix (START HERE!)
- **[Production Architecture](./ARCHITECTURE/PRODUCTION_PARSER_ARCHITECTURE.md)** - System design overview
- **[Parser Strategy](./ARCHITECTURE/parser-strategy.md)** - How product parsing works

### For QA/Testing Team
- **[QA Checklist](./QA/qa-checklist.md)** - Manual testing checklist
- **[Testing Guide](./QA/testing.md)** - Automated testing setup
- **[IFRAME Guard Final](./QA/IFRAME_GUARD_FINAL.md)** - Security testing

### For DevOps/CI-CD
- **[CI/CD Setup](./CI/cicd.md)** - GitHub Actions configuration
- **[Development Workflow](./CI/development-workflow.md)** - Branching strategy
- **[Task Queue](./CI/task-queue.md)** - Background job processing

---

## 📋 Directory Structure

```
docs/
├── README.md (this file)
│
├── BACKEND_BUG_REPORT_PRICE_TREND.md ⭐ CRITICAL
│   └── Price trend attribute error fix
│
├── API_SPEC_PRICE_COMPARISON.md ⭐ IMPORTANT
│   └── Frontend ↔ Backend API contract
│
├── ARCHITECTURE/
│   ├── PRODUCTION_PARSER_ARCHITECTURE.md
│   ├── ARCHITECTURE_OPTIMIZED.md
│   └── parser-strategy.md
│
├── guide/
│   ├── UI_IMPLEMENTATION.md
│   ├── PARSER_IMPLEMENTATION_FINAL.md
│   ├── content-script.md
│   ├── code-templates.md
│   └── [... other guides ...]
│
├── QA/
│   ├── qa-checklist.md
│   ├── testing.md
│   ├── IFRAME_GUARD_FINAL.md
│   └── [... QA docs ...]
│
├── CI/
│   ├── cicd.md
│   ├── development-workflow.md
│   └── task-queue.md
│
├── security/
│   └── security.md
│
└── services/
    ├── background-worker.md
    ├── monitoring.md
    └── offscreen-manager.md
```

---

## 🚀 Getting Started

### If You're...

**New Backend Developer**
1. Read [API Spec](./API_SPEC_PRICE_COMPARISON.md) first
2. Check [Bug Report](./BACKEND_BUG_REPORT_PRICE_TREND.md) for current issues
3. Review [Production Architecture](./ARCHITECTURE/PRODUCTION_PARSER_ARCHITECTURE.md)

**New Frontend Developer**
1. Read [API Spec](./API_SPEC_PRICE_COMPARISON.md)
2. Check [UI Implementation](./guide/UI_IMPLEMENTATION.md)
3. Review [Content Script](./guide/content-script.md)

**QA/Testing**
1. Start with [QA Checklist](./QA/qa-checklist.md)
2. Review [Testing Guide](./QA/testing.md)

**DevOps/Infrastructure**
1. Read [CI/CD Setup](./CI/cicd.md)
2. Check [Development Workflow](./CI/development-workflow.md)

---

## 🔴 Current Issues & Status

| Issue | Status | Assigned To | Link |
|-------|--------|-------------|------|
| `price_trend` AttributeError | 🔴 CRITICAL | Backend | [🐛 Bug Report](./BACKEND_BUG_REPORT_PRICE_TREND.md) |
| Search engine price accuracy | ✅ RESOLVED | Search Team | [API Spec](./API_SPEC_PRICE_COMPARISON.md) |
| Loading indicator UI | ✅ RESOLVED | Frontend | [UI Guide](./guide/UI_IMPLEMENTATION.md) |

---

## 📞 Communication

### Issue Reporting
- Create detailed bug reports with logs and steps to reproduce
- Link to relevant documentation files
- Include expected vs actual behavior

### Cross-team Collaboration
- All major changes require documentation update
- API changes → update [API Spec](./API_SPEC_PRICE_COMPARISON.md)
- New backend logic → create new doc or update [Architecture](./ARCHITECTURE/)
- New UI components → update [UI Guide](./guide/UI_IMPLEMENTATION.md)

---

## 📅 Last Updated
- **2025-12-22**: Added BACKEND_BUG_REPORT_PRICE_TREND.md with price_trend fix
- **2025-12-22**: Created API specification with selected_options support
- **2025-12-20**: Loading indicator logic refactoring completed

