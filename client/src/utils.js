'use strict';

export function getServerBaseUrl() {
  console.log("Env", process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'production') {
    return 'http://SERVER_IP';
  }
  return 'http://127.0.0.1:3000';
}
