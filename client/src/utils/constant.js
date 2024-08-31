export const HOST = import.meta.env.VITE_SERVER_URL;

const authRoute = "api/v1/auth";
export const signUpRoute = `${authRoute}/register`;
export const loginRoute = `${authRoute}/login`;
export const GET_USER_INFO = `${authRoute}/user-info`;
export const UpdateUserInfo = `${authRoute}/update-user`;
export const uploadProfileRoute = `${authRoute}/upload-profile`;
export const deleteProfileRoute = `${authRoute}/delete-profile`;
export const logoutRoute = `${authRoute}/logout`;
export const forgetpasswordsRoute = `${authRoute}/forgot-password`;

const contactRoutes = "api/v1/contact";
export const CONTACT_ROUTES = `${contactRoutes}/search`;
