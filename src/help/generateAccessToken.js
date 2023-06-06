import { signToken } from '@feathersjs/authentication-jwt';

// Generate an access token
export const generateAccessToken = (user) => {
    const payload = {
        userId: user._id,
    };
    const accessToken = signToken(payload);

    return accessToken;
};
