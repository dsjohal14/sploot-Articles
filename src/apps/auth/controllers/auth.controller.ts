import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDto } from '../dtos/auth.login.dto';
import { AuthSignupDto } from '../dtos/auth.signup.dto';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() authCredentials: AuthLoginDto) {
    const data = await this.authService.login(
      authCredentials.email,
      authCredentials.password,
    );
    return { data, message: 'Login successful' };
  }

  @Post('signup')
  async signUp(@Body() user: AuthSignupDto) {
    await this.authService.signUp(user);
    return { data: true, message: 'Signup successful' };
  }
}
