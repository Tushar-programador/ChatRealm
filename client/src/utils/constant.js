export const HOST = import.meta.env.VITE_SERVER_URL;

// Auth Route 
const authRoute = "api/v1/auth";
export const signUpRoute = `${authRoute}/register`;
export const loginRoute = `${authRoute}/login`;
export const GET_USER_INFO = `${authRoute}/user-info`;
export const UpdateUserInfo = `${authRoute}/update-user`;
export const uploadProfileRoute = `${authRoute}/upload-profile`;
export const deleteProfileRoute = `${authRoute}/delete-profile`;
export const logoutRoute = `${authRoute}/logout`;
export const forgetpasswordsRoute = `${authRoute}/forgot-password`;

// Contact Route
const contactRoutes = "api/v1/contact";
export const CONTACT_ROUTES = `${contactRoutes}/search`;
export const GET_CONTACT_ROUTES = `${contactRoutes}/get-contact`;


// Message Route
const messageRoutes = "api/v1/message";
export const GET_MESSAGES = `${messageRoutes}/get-messages`; 