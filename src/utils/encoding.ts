export function toB64(str:string) {
  return window.btoa(encodeURIComponent(str));
}

export function fromB64(str:string) {
  return decodeURIComponent(window.atob(str));
}
