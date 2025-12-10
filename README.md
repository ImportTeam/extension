
# PicSel — Chrome Extension for Optimized Payment Selection

PicSel analyzes product pages across major Korean e-commerce platforms and recommends the most cost-efficient payment method based on card benefits, discounts, and dynamic conditions.

---

## Features

* Automatic extraction of price, discounts, and card benefits from supported merchants
* Payment optimization engine with card-specific rules
* Real-time recalculation on DOM updates
* Persistent state with `chrome.storage.local` + Zustand
* Optional backend for multi-merchant price comparison
* OKLCH-based dark theme

---

## Supported Merchants

| Merchant | Parser               | Notes                                 |
| -------- | -------------------- | ------------------------------------- |
| Coupang  | `CoupangParser`      | Price, card benefits, Rocket Delivery |
| 11Street | `ElevenStreetParser` | Price, discounts, points, installment |
| Gmarket  | `GmarketParser`      | Price, SmileCash, partner card        |
| eBay     | `EbayParser`         | Price, shipping (EN)                  |
| Amazon   | `AmazonParser`       | Prime benefits, shipping (EN)         |

---

## Installation

```bash
git clone https://github.com/ImportTeam/extension.git
cd extension
pnpm install
pnpm dev
pnpm build
```

To load the extension:

1. Go to `chrome://extensions`
2. Enable **Developer Mode**
3. Select **Load unpacked**
4. Choose the `dist/` directory

---

## Project Structure

```
src/
  background/        // Service Worker (MV3)
  content/           // Content scripts + parsers + injected UI
  popup/             // Main extension popup
  subpopup/          // Advanced settings UI
  shared/            // Shared types, utils, hooks, store
tests/               // Vitest
docs/                // Architecture, parser guide, QA
manifest.json
```

---

## Tech Stack

* TypeScript 5.9 (strict)
* React 19
* Vite 7
* Zustand 5
* Zod 4
* Vitest 4
* ESLint + Prettier

---

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm test
pnpm test:coverage
pnpm lint
pnpm type-check
```

---

## Security

* Strict TypeScript (no `any`)
* Runtime validation with Zod
* Network timeouts on all API calls
* No dangerous HTML injection
* Manifest V3 CSP compliance

---

## Contributing

1. Fork the repository
2. Create a branch
3. Commit using Conventional Commits
4. Submit a PR

---

## License

MIT License. See `LICENSE` for details.
