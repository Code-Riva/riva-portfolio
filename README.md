# Qamra Ariva (Riva) — Web3 Developer Portfolio

A futuristic personal portfolio website for Qamra Ariva (Riva), presenting eight Web3 projects, specialized service offerings, and technical capabilities. Built with Next.js 16 App Router, Tailwind CSS v4, dynamic atmospheric gradients, dedicated project detail pages, and dual-theme (dark & light) support.

> **Independent Portfolio Demo — by Qamra Ariva.**

---

## 1. Professional Identity & Hero

- **Name**: Qamra Ariva (familiar name: Riva)
- **Role**: Web3 Developer
- **Headline**: *“Turning Web3 ideas into usable products.”*
- **Positioning**: *“I build websites, wallet-connected apps, and smart-contract interfaces that make blockchain easier to use.”*
- **Availability**: Available for paid Web3 projects, frontend engineering, and AI/coding freelance inquiries.
- **Hero Visual**: Abstract orbital composition with an “RA” monogram core, fine concentric elliptical paths, and luminous domain labels: *Interfaces*, *Wallets*, and *Contracts*.

---

## 2. Selected Work (Showcase & Detail Pages)

The portfolio presents three featured flagship implementations followed by a quieter grid of five additional explorations. Four projects have been published to GitHub and deployed live on Vercel, while four remain works in progress:

### Flagship Implementations
1. **Dragoon’s Relics** *(Wide Lead)*:
   - *Status*: Work in progress (local implementation & test suites verified)
   - *Category*: NFT application & asset pipeline
   - *Outcome*: Explore fantasy draconic relics and mint directly through an ERC-721 contract across four elemental realms.
   - *Detail Route*: `/projects/dragoons-relics`
2. **Dragoon’s Dispatch** *(Featured Pair)*:
   - *Status*: Work in progress (local contract & UI verified)
   - *Category*: Batch token distribution
   - *Outcome*: Transfer ERC-20 tokens directly to up to twenty recipients in a single atomic transaction.
   - *Detail Route*: `/projects/dragoons-dispatch`
3. **Dragoon’s Vault** *(Featured Pair)*:
   - *Status*: Work in progress (local contract & UI verified)
   - *Category*: Token vesting vault
   - *Outcome*: Track second-by-second linear token unlocking with cliff protection and zero admin privileges.
   - *Detail Route*: `/projects/dragoons-vault`

### Additional Explorations
4. **Dragoon’s Blacksmith**:
   - *Status*: Deployed & Published
   - *Category*: Token forge & deployment
   - *Detail Route*: `/projects/dragoons-blacksmith`
   - *Live Demo*: [dragoon-blacksmith.vercel.app](https://dragoon-blacksmith.vercel.app)
   - *Repository*: [Code-Riva/dragoon-blacksmith](https://github.com/Code-Riva/dragoon-blacksmith)
5. **Dragoon’s Gate**:
   - *Status*: Work in progress (local auth verified, Redis deployment pending)
   - *Category*: Authentication & SIWE
   - *Detail Route*: `/projects/dragoons-gate`
6. **Dragoon’s Wallet**:
   - *Status*: Deployed & Published
   - *Category*: Wallet dashboard
   - *Detail Route*: `/projects/violet-wallet`
   - *Live Demo*: [dragoon-wallet-dashboard.vercel.app](https://dragoon-wallet-dashboard.vercel.app)
   - *Repository*: [Code-Riva/dragoon-wallet-dashboard](https://github.com/Code-Riva/dragoon-wallet-dashboard)
7. **Dragoon Market**:
   - *Status*: Deployed & Published
   - *Category*: Market analytics
   - *Detail Route*: `/projects/market-dashboard`
   - *Live Demo*: [dragoon-market.vercel.app](https://dragoon-market.vercel.app)
   - *Repository*: [Code-Riva/dragoon-market](https://github.com/Code-Riva/dragoon-market)
8. **DRAGOON Token Landing**:
   - *Status*: Deployed & Published
   - *Category*: Token landing page
   - *Detail Route*: `/projects/token-landing`
   - *Live Demo*: [dragoon-token-landing.vercel.app](https://dragoon-token-landing.vercel.app)
   - *Repository*: [Code-Riva/dragoon-token-landing](https://github.com/Code-Riva/dragoon-token-landing)

Each project has a dedicated internal detail page (`/projects/[slug]`) with an overview, key capabilities, technology highlights, status verification, direct links to live demonstrations and GitHub repositories (when published), return navigation, and contact actions.

---

## 3. Services & Capabilities

### What I Can Build For You
1. **Websites & dashboards**: Responsive interfaces that make your product clear and easy to use.
2. **Wallets & authentication**: Wallet connections and sign-in experiences built around real user flows.
3. **Token & NFT applications**: Minting, distribution, and vesting interfaces connected to tested contracts.

### The Tools Behind the Experience
- **Frontend Framework**: Next.js 16 (App Router), React 19, Tailwind CSS v4
- **Interactive Visuals**: Three.js
- **Web3 Ecosystem**: Solidity, viem, wagmi, Ethereum
- **Testing & Tooling**: Hardhat, OpenZeppelin, Playwright, ESLint 9, Git

---

## 4. Local Setup & Development

### Prerequisites
- Node.js 18.17+ or 20+
- npm (or compatible package manager)

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/Code-Riva/riva-portfolio.git
cd riva-portfolio

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:3000
```

### Build & Verification Commands

```powershell
# Run ESLint static analysis
npm run lint

# Build optimized production bundle with SSG prerendering
npm run build

# Start production server locally
npm run start
```

---

## 5. Personal Information, CV & Contact

- **Education**: Computer Science undergraduate at Universitas Padjadjaran (2021–present).
- **Curriculum Vitae**: Configurable "View CV" action with polite unavailable state (*“Updated CV coming soon”*) and fallback email inquiry.
- **Inquiries**: `qamrariva@gmail.com` with one-click copy email action and real-time copied feedback.
- **Profiles**:
  - [GitHub (Code-Riva)](https://github.com/Code-Riva)
  - [LinkedIn (qamrariva)](https://www.linkedin.com/in/qamrariva)
  - [Instagram (@qamrariva)](https://www.instagram.com/qamrariva)
  - [X (@qamrariva)](https://x.com/qamrariva)

---

## 6. Build, Lint & Audit Verification

```powershell
# Run ESLint static analysis
npm run lint

# Build optimized production bundle with SSG prerendering
npm run build

# Check dependencies
npm ls next eslint-config-next

# Audit production dependencies
npm audit --omit=dev
```

---

Independent Portfolio Demo — by Qamra Ariva.
<!-- vercel-preview-verification -->
