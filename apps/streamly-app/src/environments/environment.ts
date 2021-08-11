// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  apiSignalingUrl: 'http://localhost:3333',
  iceServers: [{ urls: 'stun:74.125.142.127:19302' }],
};
