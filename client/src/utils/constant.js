export const HOST = import.meta.env.VITE_SERVER_URL;

const authRoute = "api/v1/auth";
export const signUpRoute = `${authRoute}/register`;
export const loginRoute = `${authRoute}/login`;
export const GET_USER_INFO = `${authRoute}/user-info`;
export const UpdateUserInfo = `${authRoute}/update-user`;