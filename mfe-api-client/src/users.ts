const USERS_URL = 'https://api.jsoning.com/mock/public/users';

export async function fetchUsers(): Promise<any[]> {
  const res = await fetch(USERS_URL);
  const data = await res.json();
  if (Array.isArray(data)) return data;
  return data.users || data.data || [];
}

function norm(s: string) {
  return (s || '').trim().toLowerCase();
}

export function validateUserCredentials(users: any[], email: string, username: string) {
  const e = norm(email);
  const u = norm(username);
  return users.find(
    (user: any) => norm(user.email) === e && norm(user.username) === u
  );
}

export async function loginWithCredentials(
  email: string,
  username: string
): Promise<{ token: string; user: any } | null> {
  const users = await fetchUsers();
  const found = validateUserCredentials(users, email, username);
  if (!found) return null;
  const id = found.id ?? found._id ?? '1';
  return {
    token: `user-${id}`,
    user: found,
  };
}

// old name keep for backwards compat if something still imports
export async function loginWithEmail(email: string) {
  return loginWithCredentials(email, '');
}
