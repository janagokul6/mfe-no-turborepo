#!/bin/bash
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "=== shared libs ==="
(cd "$ROOT/mfe-contracts" && npm install && npm run build)
(cd "$ROOT/mfe-api-client" && npm install && npm install "$ROOT/mfe-contracts" --no-save && npm run build)
(cd "$ROOT/mfe-ui" && npm install && npm run build)

echo "=== apps ==="
for app in mfe-shell mfe-auth-app mfe-product-app mfe-cart-app mfe-order-app; do
  echo "--- $app ---"
  cd "$ROOT/$app"
  npm install
  if [ "$app" = mfe-shell ]; then
    npm install "$ROOT/mfe-contracts" "$ROOT/mfe-ui" --no-save
  else
    npm install "$ROOT/mfe-contracts" "$ROOT/mfe-api-client" "$ROOT/mfe-ui" --no-save
  fi
done

echo "=== done ==="
