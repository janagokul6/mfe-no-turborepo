'use client';

import { RemoteComponent } from '@/components/RemoteComponent';
import { useShell } from '@/context/ShellSession';

export default function LoginPage() {
  const shell = useShell();

  return (
    <RemoteComponent
      remoteName="authApp"
      moduleName="LoginPage"
      props={{
        navigate: shell.navigate,
        onLoginSuccess: (user: any) => {
          shell.login(user);
        },
      }}
    />
  );
}
