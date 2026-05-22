export const REMOTES = {
  authApp: process.env.NEXT_PUBLIC_REMOTE_AUTH || 'http://localhost:3001/assets/remoteEntry.js',
  productApp: process.env.NEXT_PUBLIC_REMOTE_PRODUCT || 'http://localhost:3002/assets/remoteEntry.js',
  cartApp: process.env.NEXT_PUBLIC_REMOTE_CART || 'http://localhost:3003/assets/remoteEntry.js',
  orderApp: process.env.NEXT_PUBLIC_REMOTE_ORDER || 'http://localhost:3004/assets/remoteEntry.js',
};
