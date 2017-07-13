export const USER_LOGIN = 'USER_LOGIN';
export const URL = 'URL';

export function updateUserName(user) {
  return {
    type: USER_LOGIN,
    user: user,
  };
}