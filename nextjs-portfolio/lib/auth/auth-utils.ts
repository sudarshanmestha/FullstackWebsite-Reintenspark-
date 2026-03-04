import { Tokens, User } from "./types";

const TOKEN_KEY = "auth_tokens";
const USER_KEY = "auth_user";

export const saveTokens = (tokens: Tokens) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  }
};

export const getTokens = (): Tokens | null => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(TOKEN_KEY);
  return data ? JSON.parse(data) : null;
};

export const removeTokens = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

export const saveUser = (user: User) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};