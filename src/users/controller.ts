import {
  generateSalt,
  hashWithSalt,
  RegisterPayload,
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
}
