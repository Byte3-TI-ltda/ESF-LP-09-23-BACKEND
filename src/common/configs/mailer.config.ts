import { registerAs } from '@nestjs/config';

export default registerAs('mailerConfig', () => ({
  user: process.env.MAILER_USER,
  pass: process.env.MAILER_PASS
}));
