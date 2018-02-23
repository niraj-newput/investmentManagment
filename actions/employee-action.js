export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export function employeeDetail(user) {
  return {
    type: USER_LOGIN,
    employee: user
  };
}
export function removeUser() {
  return {
    type: USER_LOGOUT,
    employee: null
  };
}
