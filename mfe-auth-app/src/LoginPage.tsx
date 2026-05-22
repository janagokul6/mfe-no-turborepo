import '@org/ui/dist/style.css';
import { useState } from 'react';
import { Button, Input, PageTitle } from '@org/ui';
import { loginWithCredentials } from '@org/api-client';
import { setToken, setStoredUser, getReturnUrl } from '@org/contracts';

export type ShellProps = {
  onLoginSuccess?: (user: any) => void;
  navigate?: (path: string) => void;
};

export default function LoginPage(props: ShellProps) {
  const [email, setEmail] = useState('john.doe@example.com');
  const [username, setUsername] = useState('johndoe');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    setErr('');
    try {
      const result = await loginWithCredentials(email, username);
      if (!result) {
        setErr('email and username dont match');
        setLoading(false);
        return;
      }
      setToken(result.token);
      setStoredUser(result.user);
      props.onLoginSuccess?.(result.user);
      const url = getReturnUrl();
      props.navigate?.(url);
    } catch (e: any) {
      setErr(e.message || 'login fail');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto mt-10 p-4">
      <PageTitle>Login</PageTitle>
      <div className="w-full mb-4">
        <label className="block text-sm mb-1">Email</label>
        <Input value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder="email" />
      </div>
      <div className="w-full mb-4">
        <label className="block text-sm mb-1">Username</label>
        <Input
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
          placeholder="username"
        />
      </div>
      {err && <p className="text-red-500 mb-2">{err}</p>}
      <Button onClick={submit} disabled={loading}>
        {loading ? '...' : 'Sign In'}
      </Button>
    </div>
  );
}
