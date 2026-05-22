'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShell } from '@/context/ShellSession';
import { ROUTES } from '@org/contracts';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useShell();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`${ROUTES.LOGIN}?returnUrl=${encodeURIComponent(window.location.pathname)}`);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div className="p-8">redirecting to login...</div>;
  }

  return <>{children}</>;
}
