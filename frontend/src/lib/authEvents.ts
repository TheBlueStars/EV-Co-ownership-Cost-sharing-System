export type AuthEventType = 'register' | 'login';
export type AuthEvent = { type: AuthEventType; at: string };

const KEY = 'authEvents';

export function addAuthEvent(type: AuthEventType) {
  try {
    const list: AuthEvent[] = JSON.parse(localStorage.getItem(KEY) || '[]');
    list.unshift({ type, at: new Date().toISOString() });
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50)));
  } catch {}
}

export function getAuthEvents(): AuthEvent[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}
