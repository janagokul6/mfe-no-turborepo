'use client';

import { RemoteComponent } from '@/components/RemoteComponent';
import { useShell } from '@/context/ShellSession';
import { ROUTES } from '@org/contracts';

export default function ProductsPage() {
  const shell = useShell();

  return (
    <RemoteComponent
      remoteName="productApp"
      moduleName="ProductPage"
      props={{
        isAuthenticated: shell.isAuthenticated,
        user: shell.user,
        navigate: shell.navigate,
        onLoginRequired: () => shell.navigate(`${ROUTES.LOGIN}?returnUrl=${ROUTES.PRODUCTS}`),
      }}
    />
  );
}
