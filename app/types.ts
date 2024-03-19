export type User = {
  id: number;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
};

export type UserToken = {
  email: string;
  token: Token;
  following: string[];
};

export type Token = {
  value: string;
  expiration: string;
};

export type Session = {
  id: number;
  token: string;
  csrfSecret: string;
};
