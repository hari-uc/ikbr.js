interface Endpoints {
  INIT_SESSION: string;
  PING: string;
  AUTH_STATUS: string;
  VALIDATE_SSO: string;
  LOGOUT: string;
  ENABLE_REAUTH: string;
  ACCOUNTS: string;
  ACCOUNT_PnL: string;
  LIVE_ORDERS: string;
  ORDER_STATUS: string;
  TRADES: string;
  POSITIONS: string;
  SUMMARY: string;
  LEDGER: string;
  TRANSACTION_HISTORY: string;
  ORDER: string;
  ORDER_REPLY_CONFIRM: string;
  PREVIEW_ORDER: string;
  DISPATCHER: string;
}

export const BASE_URL = "https://localhost:5000/v1/api";
export const SOCKET_URL = "wss://localhost:5000/v1/api/ws";

export const ENDPOINTS: Endpoints = {
  INIT_SESSION: "/iserver/auth/ssodh/init?publish=true&compete=true",
  PING: "/tickle",
  AUTH_STATUS: "/iserver/auth/status",
  VALIDATE_SSO: "/sso/validate",
  LOGOUT: "/logout",
  ENABLE_REAUTH: "/iserver/reauthenticate",
  ACCOUNTS: "/iserver/accounts",
  ACCOUNT_PnL: "/iserver/account/pnl/partitioned",
  LIVE_ORDERS: "/iserver/account/orders",
  ORDER_STATUS: "/iserver/account/order/status/",
  TRADES: "/iserver/account/trades",
  POSITIONS: "/portfolio/",
  SUMMARY: "/portfolio/",
  LEDGER: "/portfolio/",
  TRANSACTION_HISTORY: "/pa/transactions",
  ORDER: "/iserver/account/",
  ORDER_REPLY_CONFIRM: "/iserver/reply/",
  PREVIEW_ORDER: "/iserver/account/",
  DISPATCHER: "https://localhost:5000/sso/Dispatcher",
};
