'use client';

import { RemoteComponent } from '@/components/RemoteComponent';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useShell } from '@/context/ShellSession';

export default function CartPage() {
  const shell = useShell();

  return (
    <ProtectedRoute>
      <RemoteComponent
        remoteName="cartApp"
        moduleName="CartPage"
        props={{
          isAuthenticated: shell.isAuthenticated,
          user: shell.user,
          navigate: shell.navigate,
        }}
      />
    </ProtectedRoute>
  );
}
