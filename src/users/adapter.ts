import { User, UserDto } from "./index.ts";

export function userToUserDto(user: User): UserDto {
  return {
    username: user.username,
    createdAt: user.createdAt,
  };
}
