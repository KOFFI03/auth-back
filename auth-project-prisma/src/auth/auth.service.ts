import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update.dto';


@Injectable()
export class AuthService {
  refresh(token: string) {
    throw new Error('Method not implemented.');
  }
  update(id: string, dto: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: { email: dto.email, password: hash, firstname: dto.nom, lastname: dto.prenom },
    });
  }

  async login(dto: LoginDto) {
  const user = await this.prisma.user.findUnique({
    where: { email: dto.email },
  });

  if (!user) throw new UnauthorizedException('Utilisateur introuvable');
  if (!user.isActive) throw new UnauthorizedException('Compte désactivé');

  const match = await bcrypt.compare(dto.password, user.password);
  if (!match) throw new UnauthorizedException('Mot de passe incorrect');

  const payload = { sub: user.id, email: user.email };

  const accessToken = this.jwt.sign(payload, {
    secret: process.env.JWT_SECRET,
    expiresIn: '15m',
  });

  const refreshToken = this.jwt.sign(payload, {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: '7d',
  });

  // 🔐 stocker hash du refresh
  const hash = await bcrypt.hash(refreshToken, 10);

  await this.prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: hash },
  });

  return { accessToken, refreshToken };
}

}

