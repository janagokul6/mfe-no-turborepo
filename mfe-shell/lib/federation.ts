import React from 'react';
import ReactDOM from 'react-dom';
import { REMOTES } from './remotes';

const remoteMap: Record<string, string> = {
  authApp: REMOTES.authApp,
  productApp: REMOTES.productApp,
  cartApp: REMOTES.cartApp,
  orderApp: REMOTES.orderApp,
};

function reactShareEntry() {
  return {
    get: () => Promise.resolve(() => React),
    loaded: 1,
    from: 'shell',
    eager: true,
  };
}

function reactDomShareEntry() {
  return {
    get: () => Promise.resolve(() => ReactDOM),
    loaded: 1,
    from: 'shell',
    eager: true,
  };
}

let shareScope: any = null;

function getShareScope() {
  if (shareScope) return shareScope;
  const reactEntry = reactShareEntry();
  const domEntry = reactDomShareEntry();
  shareScope = {
    react: {
      '18.2.0': reactEntry,
      '18.3.0': reactEntry,
      '18.3.1': reactEntry,
    },
    'react-dom': {
      '18.2.0': domEntry,
      '18.3.0': domEntry,
      '18.3.1': domEntry,
    },
  };
  return shareScope;
}

const inited = new Set<string>();

export async function loadRemoteModule(remoteName: string, moduleName: string) {
  const entry = remoteMap[remoteName];
  if (!entry) throw new Error('unknown remote ' + remoteName);

  // @ts-ignore
  const container = await import(/* webpackIgnore: true */ entry);

  if (!inited.has(remoteName)) {
    await container.init(getShareScope());
    inited.add(remoteName);
  }

  const factory = await container.get(`./${moduleName}`);
  let mod = factory();
  if (mod && typeof mod.then === 'function') mod = await mod;
  const Component = mod?.default ?? mod;
  return Component;
}
