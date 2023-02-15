import { User, UserRaw } from "../shared_b2c";

export function parseUser(user: UserRaw): User {
  if (typeof user !== "object") {
    return user;
  }
  return {
    ...user,
    created_at: new Date(user.created_at),
  };
}
