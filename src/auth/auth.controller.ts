import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './auth.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async login(@Body() data: LoginDTO) {
    return this.authService.login(data);
  }

  @Post('/register')
  register(@Body() credential: RegisterDTO) {
    this.logger.log(credential);
    return this.authService.createUser(credential);
  }
}
