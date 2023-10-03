import { registerAs } from '@nestjs/config';

export default registerAs('mailerConfig', () => ({
  transport_service: process.env.MAILE_TRANSPORT_SERVICE,
  transport_auth_user: process.env.MAILE_TRANSPORT_AUTH_USER,
  transport_auth_pass: process.env.MAILE_TRANSPORT_AUTH_PASS,
}));
