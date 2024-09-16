import { createHmac } from "node:crypto";

interface IGenerateSignture {
  secret: string;
  header: string;
  payload: string;
}

export function generateSignture({ header, payload, secret}: IGenerateSignture) {
  const hmac = createHmac('sha256', secret);

  const signature = hmac
    .update(`${header}.${payload}`)
    .digest('base64url');

  return signature;
}
