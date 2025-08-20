// src/services/fetchLogs.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const fetchActivityLogs = async (appId) => {
  const colRef = collection(db, `devApps/${appId}/activityLogs`);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchBlockedIPs = async (appId) => {
  const colRef = collection(db, `devApps/${appId}/blockedIPs`);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchLoginAttempts = async (appId) => {
  const colRef = collection(db, `devApps/${appId}/loginAttempts`);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchSuspiciousRequests = async (appId) => {
  const colRef = collection(db, `devApps/${appId}/suspiciousRequests`);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
