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

  async getByUsername(username: string) {
    const user = this.storage.get(username);
    if (!user) throw new Error("User not found");
    return user;
  }

  private storage = new Map<User["username"], User>();
}
