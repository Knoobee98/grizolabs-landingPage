import bcrypt from 'bcryptjs';
import { config, AdminUser } from '../config';

export type { AdminUser };

export const getAdminUsers = (): AdminUser[] => config.adminUsers;

export const findAdmin = (username: string): AdminUser | undefined => {
  return config.adminUsers.find(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );
};

export const isBcryptHash = (value: string): boolean => value.startsWith('$2');

export const verifyPassword = async (user: AdminUser, password: string): Promise<boolean> => {
  if (isBcryptHash(user.password)) {
    return bcrypt.compare(password, user.password);
  }
  return password === user.password;
};
