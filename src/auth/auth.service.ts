import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) { }

  async createUser(data) {
    try {
      const saltOrRounds = 10;
      data.password = await bcrypt.hash(data.password, saltOrRounds);
      const user = await this.prismaService.user.create({ data });
      const payload = { sub: user.id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } catch (error) {
      this.logger.error(error);
    }
  }

  findById(id) {
    try {
      return this.prismaService.user.findFirst({ where: { id } });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async login(data): Promise<{ accessToken: string }> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { email: data.email },
      });

      if (!user) {
        throw new NotAcceptableException('could not login');
      }
      const passwordValid = await bcrypt.compare(data.password, user.password);

      if (!passwordValid) {
        throw new NotAcceptableException('could not login');
      }

      if (user && passwordValid) {
        const payload = { sub: user.id };
        return {
          accessToken: this.jwtService.sign(payload),
        };
      }

      return null;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
