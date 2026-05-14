# TradeLens AI: Security Integrity Architecture

## Principles Sustained:

### 1. Zero Firestore
We established a deliberate constraint: **Firestore is strictly excluded**. 
- To preserve pure lightweight streaming and absolute cost predictability, **Realtime Database** handles structured JSON logs exclusively.

### 2. Admin Interface Exile
- The project possesses **zero** standard user-directed `/admin` dashboards.
- Administrative capabilities are solely granted backend using the **Firebase Admin SDK** enclosed within authenticated Cloud Functions environments.
- Escalation via custom claim toggling from the UI has been actively prevented.

### 3. Deep Asset Path Isolation (Realtime Database & Storage Rules)
Every mutable user asset is securely isolated behind their explicit `auth.uid`.

```json
"chartScans": {
  "$uid": {
     ".read": "auth != null && auth.uid == $uid"
  }
}
```

**Known MVP Security Limitations:**
- For MVP speed, standard client applications securely write updates direct to RTDB (creating Watchlists and Trading Journal items). 
- *Next Iteration Strategy:* Highly guarded paths like `subscriptions`, `usageLimits`, and specific `analysisReports` generations should be exclusively locked down to backend-driven modifications (using `.write": false` for the client, allowing only the Cloud Function to transact).

### 4. Image Security Sandbox
Storage restricts chart uploads securely:
- Only verified logged-in users.
- Mime-types purely enforced to `image/*`.
- Bounded file magnitude of max `<8MB` blocks Denial of Service via buffer explosion.

### 5. Automated Systemic NLP Sanitization (AI Safety Guard)
To prohibit the Gemini model from inadvertently spilling directly restricted SEC phrases (`"take this trade," "fixed target," "sure shot"`), we strictly enact an intersectional Regex dictionary `FORBIDDEN_PATTERNS`.
- The analyzer functions securely evaluate returning responses within memory and forcibly mutate explicit buy/sell language into soft educational interpretations.
- Every chart automatically enforces an absolute, standardized risk disclaimer before dispatching to the client.
