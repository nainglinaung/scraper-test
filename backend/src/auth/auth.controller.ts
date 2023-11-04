import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AccessTokenGuard } from './AccessTokenGuard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() data: LoginDTO) {
    return this.authService.login(data);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/test')
  get() {
    return 10;
  }

  @Post('/register')
  register(@Body() credential: RegisterDTO) {
    return this.authService.createUser(credential);
  }
}
