export const HOST = `https://chatrealm-server.onrender.com`;

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
export const GET_ALL_CONTACT_ROUTES = `${contactRoutes}/get-all-contacts`;

// Message Route
const messageRoutes = "api/v1/message";
export const GET_MESSAGES = `${messageRoutes}/get-messages`;

//Channel Route
const channelRoutes = "api/v1/channel";
export const GET_CHANNELS = `${channelRoutes}/get-channels`;
export const CREATE_CHANNEL = `${channelRoutes}/create-channel`;
export const JOIN_CHANNEL = `${channelRoutes}/join-channel`;
export const LEAVE_CHANNEL = `${channelRoutes}/leave-channel`;
export const GET_CHANNEL_MEMBERS = `${channelRoutes}/get-channel-members`;
