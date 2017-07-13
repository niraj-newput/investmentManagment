export const USER_LOGIN = 'USER_LOGIN';

export function employeeDetail(user) {
    console.log(user);
  return {
    type: USER_LOGIN,
    employee: user
  };
}