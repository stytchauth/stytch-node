import { User, UserRaw } from "../b2c/shared";

export const request = jest.fn();

export function parseUser(user: UserRaw): User {
  if (typeof user !== "object") {
    return user;
  }
  return {
    ...user,
    created_at: new Date(user.created_at),
  };
}
