// API constants for Xyra app
// These endpoints are no longer used in the authentication flow
export const API = {
  baseUrl: 'https://api.xyra.com',
  endpoints: {
    auth: {
      requestOTP: '/auth/request-otp',
      verifyOTP: '/auth/verify-otp',
      register: '/auth/register',
    },
    user: {
      profile: '/user/profile',
      updateProfile: '/user/profile',
    },
  },
};
