# TradeLens AI: Deployment Guide

This document covers all the steps required to take TradeLens AI from local development to a live, production-ready application.

## 1. Requirements
- **Node Environment**: Node.js 18 or 20 is recommended.
- **Firebase CLI**: `npm install -g firebase-tools`
- **Firebase Project**: An active Firebase project with the Blaze (Pay-as-you-go) plan enabled (required for Cloud Functions).

## 2. Frontend Environment Setup
Create a `.env.local` file in the root directory and populate it with your Firebase configuration. Ensure these values match your production Firebase constraints:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 3. Cloud Functions Environment Setup
The Cloud Functions require access to the Gemini API key. Navigate to `functions/` and create a `.env` file (based on `.env.example`).
*Note: Firebase v2 functions automatically load `.env` files located inside the `functions` directory upon deployment.*

```env
GEMINI_API_KEY=your_production_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-pro
```

## 4. Firebase Setup & Initialization
Within your Firebase Console, ensure the following services are enabled:
1. **Authentication**: Enable Google authentication.
2. **Realtime Database**: Activate the Realtime Database.
3. **Storage**: Activate Cloud Storage.
4. **Cloud Functions**: Ensure billing is enabled in Google Cloud Console.

## 5. Local Running & Testing
1. **Install Frontend Dependencies:**
   ```bash
   npm install
   ```
2. **Install Functions Dependencies:**
   ```bash
   cd functions && npm install
   ```
3. **Run the local development server:**
   ```bash
   npm run dev
   ```

*You can also run Firebase Emulators to mock the database, storage, and functions locally using `firebase emulators:start`.*

## 6. Deployment Procedure

Once ready, use the Firebase CLI to deploy all app aspects:

**1. Build Frontend:**
```bash
npm run build
```

**2. Deploy All:**
```bash
firebase deploy
```

Alternatively, to deploy specific segments:
```bash
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only database
firebase deploy --only storage
```

## 7. Post-Deployment Testing Checklist
- [ ] Try logging in with Google.
- [ ] Successfully access the dashboard without redirects loop.
- [ ] Upload a chart (verifying Storage functions).
- [ ] Monitor analysis loading screen (verifying Cloud Function triggering).
- [ ] Analysis concludes successfully, presenting a completed report (verifying Gemini AI pipeline).
- [ ] Save the report and test Watchlist / Journal linkages (verifying RTDB).
- [ ] Export data from the settings page.
