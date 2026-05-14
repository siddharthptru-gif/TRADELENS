# TradeLens AI — God-Level Production PRD & Technical Blueprint

**Document Version:** 1.0 FINAL
**Product:** TradeLens AI
**Tagline:** *Upload any chart. Get structured market analysis in seconds.*
**Stack:** Vite + React + TypeScript + TailwindCSS + Framer Motion + GSAP + react-three-fiber + Firebase Auth + Firebase **Realtime Database** + Firebase Storage + Cloud Functions (Node 20) + Vision-capable LLM
**Database Rule:** Firebase Realtime Database ONLY. No Firestore. No admin panel.
**Audience:** Coding agents (Google AI Studio, Claude Code, Cursor), full-stack engineers, prompt engineers.

## Executive Summary
TradeLens AI is a premium AI-powered chart-analysis SaaS where users upload trading chart screenshots to receive structured, non-advisory educational reports.

## Core Mandates
1. Realtime Database only. No Firestore. No admin panel.
2. Premium dark-cinematic UI with #10E0A0 green glow, glassmorphism.
3. Strict educational tone - no buy/sell predictions. "Trade Quality Score" rather than probability.

## Pages & Structure
1. Landing (`/`) - GSAP animations, 3D Hero, AI Showcase.
2. Auth (`/login`, `/signup`) - Email, Google, Guest.
3. Dashboard (`/dashboard`)
4. Upload (`/upload`) - Drag/drop compressed analysis.
5. Report (`/report/{id}`) - 23 section layout with JSON AI data.
6. Saved, Journal, Watchlist.

## Architecture
- Firebase Realtime Database for all records: `users`, `userProfiles`, `chartScans`, `analysisReports`, `savedReports`, `tradingJournal`, `watchlists`, `usageLimits`.
- Cloud Functions Node 20 wrapping LLM pipeline with prompt sanitization.
- Image WebP compression.
- Usage limits evaluated centrally.

## Implementation Phases
**Phase 1** - Project Setup (Vite, FB init, React Router).
**Phase 2** - Landing Page (GSAP, 3D).
**Phase 3** - Authentication & User profiles.
**Phase 4** - Dashboard with RTDB listeners.
**Phase 5** - Chart Upload UI & Status tracking.
**Phase 6** - Cloud Function Pipeline & Vision LLM validation.
**Phase 7** - Analysis Report UI.
**Phase 8-10** - Saved Reports, Journal, Watchlist.
**Phase 11-12** - Usage Logic, Testing, Deploy.

*Note: The complete PRD structure has been compressed to this builder reference for context preservation during subsequent prompt generation.*
