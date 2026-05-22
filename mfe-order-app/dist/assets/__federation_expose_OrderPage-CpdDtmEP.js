import { importShared } from './__federation_fn_import-C-mTqbop.js';
import { r as reactExports } from './index-Dm_EQZZA.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

// src/routes.ts

// src/keys.ts
var STORAGE_KEYS = {
  AUTH_TOKEN: "mfe_auth_token",
  ORDERS_DATA: "mfe_orders"
};

// src/storage.ts
function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
}

// src/products.ts
var API_BASE = "http://localhost:3000/api/orders";
function readOrdersAll() {
  const raw = localStorage.getItem(STORAGE_KEYS.ORDERS_DATA);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
function writeOrdersAll(all) {
  localStorage.setItem(STORAGE_KEYS.ORDERS_DATA, JSON.stringify(all));
}
function getOrdersLocal(userId) {
  const all = readOrdersAll();
  return all[userId] || [];
}
function saveOrdersLocal(userId, orders) {
  const all = readOrdersAll();
  all[userId] = orders;
  writeOrdersAll(all);
}
async function fetchOrders(userId) {
  try {
    const res = await fetch(`${API_BASE}?userId=${encodeURIComponent(userId)}`);
    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.orders || [];
      if (list.length) {
        saveOrdersLocal(userId, list);
        return list;
      }
    }
  } catch (e) {
    console.log("fetch orders api failed", e);
  }
  return getOrdersLocal(userId);
}

const __vite_import_meta_env__ = {};
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if ((__vite_import_meta_env__ ? "production" : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, getInitialState, subscribe, destroy };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;

const orderStore = createStore((set) => ({
  orders: [],
  loading: false,
  setOrders: (orders) => set({ orders }),
  setLoading: (loading) => set({ loading })
}));

const Oe = await importShared('react');

var H = { exports: {} }, $ = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Te;
function cr() {
  if (Te) return $;
  Te = 1;
  var s = Oe, m = Symbol.for("react.element"), g = Symbol.for("react.fragment"), y = Object.prototype.hasOwnProperty, x = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, E = { key: true, ref: true, __self: true, __source: true };
  function T(O, f, S) {
    var b, _ = {}, C = null, W = null;
    S !== void 0 && (C = "" + S), f.key !== void 0 && (C = "" + f.key), f.ref !== void 0 && (W = f.ref);
    for (b in f) y.call(f, b) && !E.hasOwnProperty(b) && (_[b] = f[b]);
    if (O && O.defaultProps) for (b in f = O.defaultProps, f) _[b] === void 0 && (_[b] = f[b]);
    return { $$typeof: m, type: O, key: C, ref: W, props: _, _owner: x.current };
  }
  return $.Fragment = g, $.jsx = T, $.jsxs = T, $;
}
H.exports = cr() ;
var R = H.exports;
function gr() {
  return /* @__PURE__ */ R.jsx(
    "div",
    {
      className: "animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600",
      style: { margin: "20px auto" }
    }
  );
}
function hr({ children: s }) {
  return /* @__PURE__ */ R.jsx("h1", { className: "text-2xl font-bold mb-4", children: s });
}

const {useEffect,useState} = await importShared('react');
function OrderPage(props) {
  const [orders, setOrdersLocal] = useState([]);
  const [loading, setLoadingLocal] = useState(false);
  useEffect(() => {
    const sync = () => {
      const s = orderStore.getState();
      setOrdersLocal(s.orders);
      setLoadingLocal(s.loading);
    };
    sync();
    return orderStore.subscribe(sync);
  }, []);
  useEffect(() => {
    const token = getToken() || "";
    const userId = token.replace("user-", "") || "guest";
    const { setOrders, setLoading } = orderStore.getState();
    setLoading(true);
    fetchOrders(userId).then((list) => setOrders(list)).finally(() => setLoading(false));
  }, []);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(gr, {}) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(hr, { children: "Orders" }),
    orders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 p-4", children: "no orders yet — checkout from cart" }),
    orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded mb-4 bg-white overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 bg-gray-100 font-bold p-2 border-b text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "#",
          o.id
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: new Date(o.createdAt).toLocaleDateString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "$",
          Number(o.total).toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-green-600", children: o.status })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-2", children: "items in this order:" }),
        (o.items || []).map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex justify-between py-2 border-b border-gray-100 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.title || item.productId }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "x",
                item.qty || 1,
                " — $",
                item.price || 0
              ] })
            ]
          },
          idx
        )),
        (!o.items || o.items.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "no line items" })
      ] })
    ] }, o.id))
  ] });
}

export { OrderPage as default, jsxRuntimeExports as j };
