export const ENV = {
         AUTHENTICATION_URL:
           process.env.AUTHENTICATION_HOST || '/authentication-service',
         JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY || 'shhhhhh',
       };
