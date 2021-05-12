import { CreateUser, User, UserRepository } from "./index.ts";

export class Repository implements UserRepository {
  async create(user: CreateUser) {
    const userWithCreatedAt = { ...user, createdAt: new Date() };
    this.storage.set(user.username, { ...userWithCreatedAt });
    return userWithCreatedAt;
  }

  async exists(username: string) {
    return this.storage.has(username);
  }
  private storage = new Map<User["username"], User>();
}
