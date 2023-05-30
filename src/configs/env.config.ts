import { registerAs } from '@nestjs/config';

export default registerAs('CONFIGS', () => ({
  DATABASE_URL:
    'mongodb+srv://dsjohal14:WRmnoBjkdF3B65Ho@cluster0.1uupuwh.mongodb.net/?retryWrites=true&w=majority',
  PORT: 3000,
  JWT_SECRET: '2EhG8u5VqW54W4Ux9A3f7RbE6S2e0BdK',
}));
