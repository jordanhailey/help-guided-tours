import { JWTTokenGenPayload as Payload } from "../deps.ts";

export type Algorithm = "none" | "HS256" | "HS512" | "RS256";

export type Configuration = {
  key: string;
  alg: Algorithm;
  /**
   * Expiration time in seconds
   */
  exp: number | Date;
};

export interface JWTTokenGenPayload extends Payload {
  user: string;
}

export interface AuthRepository {
  /**
   * Passed a JWT token, returns the token if it is found in storage, otherwise rejects the promise.
   */
  getToken: (token: string) => Promise<string>;
  /**
   * Generates a JWT token and places token in storage, the key is the username, the value is the JWT token. Returns the token.
   */
  generateToken: (username: string) => Promise<string>;
}
