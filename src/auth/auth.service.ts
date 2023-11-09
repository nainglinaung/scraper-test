import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService { 
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(data) {
    const saltOrRounds = 10;
    data.password = await bcrypt.hash(data.password, saltOrRounds);
    const user = await this.prismaService.user.create({ data });
    const payload = { sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  findById(id) {
    return this.prismaService.user.findFirst({ where: { id } });
  }

  async login(data) {
    const user = await this.prismaService.user.findFirst({
      where: { email: data.email },
    });

    if (!user) {
      throw new HttpException('could not login', HttpStatus.BAD_REQUEST);
    }
    const passwordValid = await bcrypt.compare(data.password, user.password);

    if (!passwordValid) {
      throw new HttpException('could not login', HttpStatus.BAD_REQUEST);
    }

    if (user && passwordValid) {
      const payload = { sub: user.id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }
  }
}
