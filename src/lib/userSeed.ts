import { ref, get, set, update } from 'firebase/database';
import { db } from './rtdb';
import { User } from 'firebase/auth';

export async function ensureUserSeed(user: User) {
  if (!user) return;

  const uid = user.uid;
  const now = Date.now();

  // 1. /users/{uid}
  const userRef = ref(db, `users/${uid}`);
  const userSnapshot = await get(userRef);

  if (!userSnapshot.exists()) {
    await set(userRef, {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "Trader",
      photoURL: user.photoURL || "",
      plan: "free",
      isGuest: false,
      createdAt: now,
      lastLoginAt: now,
      termsAcceptedAt: now,
      disclaimerAcceptedAt: now
    });
  } else {
    await update(userRef, {
      lastLoginAt: now,
      displayName: user.displayName || userSnapshot.val().displayName,
      photoURL: user.photoURL || userSnapshot.val().photoURL,
      email: user.email || userSnapshot.val().email
    });
  }

  // 2. /userProfiles/{uid}
  const profileRef = ref(db, `userProfiles/${uid}`);
  const profileSnapshot = await get(profileRef);
  if (!profileSnapshot.exists()) {
    await set(profileRef, {
      experienceLevel: "beginner",
      preferredMarkets: ["crypto"],
      tradingStyle: "swing",
      riskProfile: "medium",
      defaultTimeframe: "1D",
      defaultMarketType: "crypto",
      onboardingCompleted: false,
      preferences: {
        theme: "dark",
        language: "en",
        showPositionSizing: true,
        showSmcConcepts: true
      },
      updatedAt: now
    });
  }

  // 3. /subscriptions/{uid}
  const subRef = ref(db, `subscriptions/${uid}`);
  const subSnapshot = await get(subRef);
  if (!subSnapshot.exists()) {
    await set(subRef, {
      plan: "free",
      status: "active",
      startedAt: now,
      renewsAt: 0,
      provider: "none",
      providerCustomerId: "",
      providerSubscriptionId: "",
      updatedAt: now
    });
  }

  // 4. /usageLimits/{uid}
  const usageRef = ref(db, `usageLimits/${uid}`);
  const usageSnapshot = await get(usageRef);
  if (!usageSnapshot.exists()) {
    await set(usageRef, {
      plan: "free",
      dailyLimit: 3,
      monthlyLimit: 90,
      dailyUsed: 0,
      monthlyUsed: 0,
      dailyResetAt: now + 24 * 60 * 60 * 1000,
      monthlyResetAt: now + 30 * 24 * 60 * 60 * 1000,
      lastScanAt: 0
    });
  }
}
