module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '762fde1c0352885a1ab1cf311ccf5878'),
  },
});
