import { sign } from "./jwt/sign";
import { verify } from "./jwt/verify";

const secret = "#teste"

const token = sign({
  exp: Date.now() + (24 * 60 * 60 * 1000),
  data: {
    sub: 'Alessandro'
  },
  secret
});

console.log("🚀 ~ token:", token);

const payloadDecoded = verify({ token, secret });

console.log("🚀 ~ payloadDecoded:", payloadDecoded);
