import { localDB } from "../lib/store/db";
import { USER_ROLE } from "../lib/config/constant";

export interface UserDBO {
  role: string;
}

export interface LocalUser {
  uid: string;
  email: string;
}

let currentUser: LocalUser | null = null;
const listeners: ((user: LocalUser | null) => void)[] = [];

function notify() {
  listeners.forEach((cb) => cb(currentUser));
}

try {
  const stored = localStorage.getItem("auth_user");
  if (stored) currentUser = JSON.parse(stored);
} catch {}

export function onAuthStateChanged(callback: (user: LocalUser | null) => void): () => void {
  listeners.push(callback);
  callback(currentUser);
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx > -1) listeners.splice(idx, 1);
  };
}

export async function GetUserRole(uid: string): Promise<UserDBO> {
  const user = localDB.users.find((u) => u.uid === uid);
  return { role: user?.role ?? "" };
}

export async function AuthLogin(email: string, password: string): Promise<LocalUser | null> {
  const user = localDB.users.find((u) => u.email === email && u.password === password);
  if (!user) return null;
  currentUser = { uid: user.uid, email: user.email };
  localStorage.setItem("auth_user", JSON.stringify(currentUser));
  notify();
  return currentUser;
}

export async function AuthRegister(email: string, password: string): Promise<LocalUser | null> {
  if (localDB.users.find((u) => u.email === email)) return null;
  const newUser = { uid: localDB.generateId(), email, password, role: USER_ROLE };
  localDB.users.push(newUser);
  localDB.saveUsers();
  return { uid: newUser.uid, email: newUser.email };
}

export async function AuthSignOut(): Promise<void> {
  currentUser = null;
  localStorage.removeItem("auth_user");
  notify();
}
