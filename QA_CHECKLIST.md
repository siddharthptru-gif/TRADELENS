# QA & Production Checklist

A comprehensive testing standard verifying stability, functionality, mobile responsiveness, and integrations for TradeLens AI prior to production delivery.

## Security & Safety
- [ ] Ensure AI key isn't exposed in any frontend network calls, requests, or `.env` exposing `VITE_` variables.
- [ ] Database Security Rules restrict RW privileges exactly down to verified `auth.uid` owners.
- [ ] Storage Rules enforce a maximum limit of 8MB on chart images.
- [ ] `forbidden phrases` dictionary within the `sanitizeReport` function accurately intercepts and remediates unguided "buy/sell" language.

## Authentication & Route Protection
- [ ] Navigate to `/dashboard` directly without logging in (Should redirect to `/login`).
- [ ] Perform Login / Registration using Google Auth.
- [ ] After successful login, accessing `/login` should redirect to `/dashboard`.
- [ ] No recursive, infinite page redirect loops occur midway auth state resolution.

## Dashboard & Chart Parsing
- [ ] Blank / Empty Account displays an empty state "No scans yet".
- [ ] Starting a new analysis uploads an image locally and generates a database `chartScans` log containing a 'queued' status.
- [ ] Canceling an ongoing scan fails the task softly without crashing the client state.

## AI & Server Logic
- [ ] Cloud Function triggers correctly on HTTP invocation from the app (via Firebase Call).
- [ ] Chart interpretation generates exactly formatted JSON conforming to our schema.
- [ ] Wait for completion updates the `scan` and loads into the Report Route (`/report/:reportId`).
- [ ] Cloud Function cleanly catches and manages unexpected image reading or unsupported formats, delivering a readable string error.

## Advanced Reports
- [ ] All structured variables (Trend, Supply/Demand) format correctly inside `<Report />` without UI tearing.
- [ ] Educational wording is confirmed present (e.g., 'Observe level' rather than 'Buy here').
- [ ] User can link report explicitly to the Trading Journal.
- [ ] User can add report's symbol to Watchlist.

## Trading Journal
- [ ] Successfully captures manual string input per completed trade.
- [ ] Successfully lists the linked reports (displaying thumbnails and timestamp).

## Settings & Privacy
- [ ] "Delete all my data" actively triggers and succeeds (handling Firebase auth and deleting nodes).
- [ ] Settings export works.
- [ ] Account plan is properly displayed.

## UI / Layout Mobile Integrity
- [ ] Mobile navigation triggers the bottom bar or an accessible hamburger.
- [ ] Landing page scales beautifully to phone dimensions (grid layouts collapsing to 1 column).
- [ ] Table/Matrix views (e.g., `Pricing`) render inside an `overflow-x-auto` without stretching viewport width.
- [ ] Forms input modals are tap friendly at `44px` sizes.
