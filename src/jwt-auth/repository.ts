import {
  createJWTToken,
  decodeJWTToken,
  getNumericDate as setExpiration,
} from "../deps.ts";
import {
  Algorithm,
  AuthRepository,
  Configuration,
  JWTTokenGenPayload as Payload,
} from "./index.ts";

export type RepositoryDependencies = { configuration: Configuration };

const defaultConfiguration: Configuration = {
  alg: "HS512" as Algorithm,
  key: "SET-YOUR-KEY",
  exp: 120,
};

/**
 * Generates, gets and stores (in-memory) jwt tokens for a userId
 */
export class Repository implements AuthRepository {
  private storage = new Map<string, string>();
  private configuration: Configuration;

  /**
   * @param dependencies object with Repository dependencies
   */
  constructor(
    dependencies: RepositoryDependencies = {
      configuration: defaultConfiguration,
    },
  ) {
    if (dependencies.configuration.key === defaultConfiguration.key) {
      throw new Error("You need to set the jwt key");
    }

    this.configuration = dependencies.configuration;
  }

  /**
   * Retrieves the stored token for the provided userId
   *
   * @param userId the username to retrieve the token for 
   */
  private async decodeToken(token: string): Promise<string> {
    try {
      let userId;
      const [header, payload, signature] = decodeJWTToken(token);
      if (typeof payload !== "object" || payload === null) throw new Error();
      for (const [key, value] of Object.entries(payload)) {
        if (key === "user") userId = value;
      }
      if (!userId) return Promise.reject("Invalid token");
      const tokenFound = await this.getToken(userId);
      if (!tokenFound || token !== tokenFound) throw new Error();
      return tokenFound;
    } catch (error) {
      return Promise.reject("Invalid Token");
    }
  }

  async getToken(userId: string) {
    let token = this.storage.get(userId);
    if (!token) {
      token = await this.decodeToken(userId);
      if (!token) {
        return Promise.reject("Could not get token for the provided userId");
      }
    }
    return token;
  }

  /**
   * Generates and persists the token for the provided userId
   *
   * @param userId the userId to generate the token for
   */
  async generateToken(userId: string) {
    const payload: Payload = {
      iss: "museums",
      exp: setExpiration(this.configuration.exp),
      user: userId,
    };
    const header = {
      alg: this.configuration.alg,
      typ: "JWT",
    };
    const token = await createJWTToken(
      header,
      payload,
      this.configuration.key,
    );
    this.storage.set(userId, token);
    return token;
  }
}
