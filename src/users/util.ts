import { createHash, encodeToString } from "../deps.ts";

export function hashWithSalt(password: string, salt: string) {
  const hash = createHash("sha512")
    .update(`${password}${salt}`)
    .toString();
  return hash;
}

export function generateSalt() {
  const arr = new Uint8Array(64);
  crypto.getRandomValues(arr);
  return encodeToString(arr);
}
