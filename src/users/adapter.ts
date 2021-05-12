import { User, UserDto } from "./index.ts";

// Data Transfer Object used to hide sensitive user data, e.g to be returned from the user registration function
export function userToUserDto(user: User): UserDto {
  return {
    username: user.username,
    createdAt: user.createdAt,
  };
}
