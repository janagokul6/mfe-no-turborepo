'use client';

import { RemoteComponent } from '@/components/RemoteComponent';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useShell } from '@/context/ShellSession';

export default function OrdersPage() {
  const shell = useShell();

  return (
    <ProtectedRoute>
      <RemoteComponent
        remoteName="orderApp"
        moduleName="OrderPage"
        props={{ user: shell.user }}
      />
    </ProtectedRoute>
  );
}
