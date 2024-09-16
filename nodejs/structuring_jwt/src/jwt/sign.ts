
import { generateSignture } from './generateSignture';

interface ISignProps {
  data: Record<string, any>;
  exp: number;
  secret: string;
}

export function sign(options: ISignProps) {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const payload = {
    ...options.data,
    iat: Date.now(),
    exp: options.exp
  };

  const base64EncodedHeader = Buffer
    .from(JSON.stringify(header))
    .toString('base64url');

  const base64EncodedPayload = Buffer
    .from(JSON.stringify(payload))
    .toString('base64url');

    const signature = generateSignture({
      header: base64EncodedHeader,
      payload: base64EncodedPayload,
      secret: options.secret
    });

  return `${base64EncodedHeader}.${base64EncodedPayload}.${signature}`
}