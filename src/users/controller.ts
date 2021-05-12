import {
  generateSalt,
  hashWithSalt,
  LoginPayload,
  RegisterPayload,
  User,
  UserController,
  UserRepository,
  userToUserDto,
} from "./index.ts";

interface ControllerDependencies {
  userRepository: UserRepository;
}

export class Controller implements UserController {
  userRepository: UserRepository;
  constructor({ userRepository }: ControllerDependencies) {
    this.userRepository = userRepository;
  }
  private async getHashedUser(username: string, password: string) {
    const salt = generateSalt();
    const user = {
      username,
      hash: hashWithSalt(password, salt),
      salt,
    };
    return user;
  }
  public async register(payload: RegisterPayload) {
    // Check is user exists, reject if so.
    if (await this.userRepository.exists(payload.username)) {
      return Promise.reject("Username already exists");
    }
    const { username, password } = payload;
    const createdUser = await this.userRepository.create(
      await this.getHashedUser(username, password),
    );
    return userToUserDto(createdUser);
  }
  public async login(payload: LoginPayload) {
    try {
      const user = await this.userRepository.getByUsername(payload.username);
      await this.comparePassword(payload.password, user); // This method throws an Error if not matching, thus exiting this code block.
      return { user: userToUserDto(user) };
    } catch (error) {
      throw new Error("Username and password combination is not correct");
    }
  }
  private async comparePassword(password: string, user: User) {
    const hashedPassword = hashWithSalt(password, user.salt);
    if (hashedPassword === user.hash) {
      return Promise.resolve(true);
    }
    Promise.reject(false);
  }
}
