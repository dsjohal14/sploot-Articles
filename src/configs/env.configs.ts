import { registerAs } from "@nestjs/config";

export default registerAs('CONFIGS', () =>({
    DATABASE_URL: 'http://localhost',
}));