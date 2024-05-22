const BE_URL = process.env.REACT_APP_BE_URL;

const API = {
    RegisterUser: {
        endPoint: `${BE_URL}/auth/register`,
        method: 'post',
    },

    VerifyEmailPublicLink: {
        endPoint: `${BE_URL}/auth/verifyEmailPublicLink`,
        method: 'get',
    },

    VerifyEmail: {
        endPoint: `${BE_URL}/auth/verifyEmail`,
        method: 'get',
    },

    SignIn: {
        endPoint: `${BE_URL}/auth/signIn`,
        method: 'post',
    },

    CheckExistEmail: {
        endPoint: `${BE_URL}/auth/checkExistEmail`,
        method: 'get',
    },
    ResetPassword: {
        endPoint: `${BE_URL}/auth/resetPassword`,
        method: 'post',
    },
};

export default API;
