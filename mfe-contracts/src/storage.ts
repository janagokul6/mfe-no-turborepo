import { STORAGE_KEYS } from './keys';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
}

export function getStoredUser(): any | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStoredUser(user: any) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
}

export function clearStoredUser() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
}

export function setToken(token: string) {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  window.dispatchEvent(new CustomEvent('mfe:auth-changed'));
}

export function clearToken() {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  clearStoredUser();
  window.dispatchEvent(new CustomEvent('mfe:auth-changed'));
}

export function isAuthenticated(): boolean {
  const t = getToken();
  return !!t && t.length > 0;
}

export function getReturnUrl(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get('returnUrl') || '/products';
}
