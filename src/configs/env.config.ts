import { registerAs } from '@nestjs/config';

export default registerAs('CONFIGS', () => ({
  DATABASE_URL: 'http://localhost',
  PORT: 3000,
  JWT_SECRET: '1234567890',
}));
