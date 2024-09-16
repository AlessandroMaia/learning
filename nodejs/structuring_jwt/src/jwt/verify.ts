import { generateSignture } from "./generateSignture";

interface IVerifyProps {
  token: string;
  secret: string;
}

export function verify({ token, secret }: IVerifyProps) {
  const [header, payload, signature] = token.split('.');

  const signatureToComparer = generateSignture({ header, payload, secret });

  if (signature !== signatureToComparer)
    throw new Error('🚀 Invalid JWT token!');

  const decodedPaylaod = JSON.parse(
    Buffer
      .from(payload, 'base64url')
      .toString('utf-8')
  );

  if(decodedPaylaod.exp < Date.now())
    throw new Error('🚀 Expired JWT token!');

  return decodedPaylaod;
}
