#!/bin/bash
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"

bash "$ROOT/install.sh"

echo "=== build libs ==="
(cd "$ROOT/mfe-contracts" && npm run build)
(cd "$ROOT/mfe-api-client" && npm run build)
(cd "$ROOT/mfe-ui" && npm run build)

for port in 3000 3001 3002 3003 3004; do
  pid=$(lsof -ti :"$port" 2>/dev/null) && kill "$pid" 2>/dev/null || true
done
sleep 1

echo "=== starting apps (3000–3004) ==="
npx -y concurrently@8.2.2 -n auth,product,cart,order,shell -c blue,green,yellow,magenta,cyan \
  "cd $ROOT/mfe-auth-app && npm run dev" \
  "cd $ROOT/mfe-product-app && npm run dev" \
  "cd $ROOT/mfe-cart-app && npm run dev" \
  "cd $ROOT/mfe-order-app && npm run dev" \
  "sleep 20 && cd $ROOT/mfe-shell && npm run dev"
