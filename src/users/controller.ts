import { RegisterPayload, UserRepository, userToUserDto } from "./index.ts";

interface ControllerDependencies {
  userRepository: UserRepository;
}

export class Controller {
  userRepository: UserRepository;
  constructor({ userRepository }: ControllerDependencies) {
    this.userRepository = userRepository;
  }
  public async register(payload: RegisterPayload) {
    // Check is user exists, reject if so.
    if (await this.userRepository.exists(payload.username)) {
      return Promise.reject("Username already exists");
    }
    const { username } = payload, hash = "randomHash", salt = "randomSalt";
    const createdUser = await this.userRepository.create({
      username,
      hash,
      salt,
    });
    return userToUserDto(createdUser);
  }
}
