'use client';

import { useEffect, useState } from 'react';
import { loadRemoteModule } from '@/lib/federation';

type Props = {
  remoteName: string;
  moduleName: string;
  props?: Record<string, any>;
};

export function RemoteComponent({ remoteName, moduleName, props = {} }: Props) {
  const [Comp, setComp] = useState<any>(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const C: any = await loadRemoteModule(remoteName, moduleName);
        if (!cancelled) setComp(() => C);
      } catch (e: any) {
        console.log('remote load fail', e);
        if (!cancelled) setErr(e?.message || 'failed to load remote - is dev server running?');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [remoteName, moduleName]);

  if (err) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded m-4">
        <p className="text-red-600">{err}</p>
        <p className="text-sm mt-2">remote: {remoteName}/{moduleName}</p>
      </div>
    );
  }

  if (!Comp) return <div className="p-6 text-gray-500">loading {remoteName}...</div>;

  return <Comp {...props} />;
}
