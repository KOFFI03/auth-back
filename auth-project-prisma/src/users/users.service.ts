import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../auth/dto/create.dto';
import { UpdateUserDto } from '../auth/dto/update.dto';
import * as bcrypt from 'bcrypt';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class UsersService {
 
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const hash = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        firstname: dto.firstname,
        lastname: dto.lastname,
        adresse: dto.adresse,
        numero: dto.numero,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

 async update(id: string, dto: UpdateUserDto) {
  const findUser = await this.prisma.user.findUnique({ where: { id } });

  if (!findUser) {
    throw new HttpException('Utilisateur non trouvé', 404);
  }

  return this.prisma.user.update({
    where: { id },
    data: dto,
  });
}


  deactivate(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async activate(id: string) {
  const user = await this.prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new HttpException('Utilisateur non trouvé', 404);
  }

  return this.prisma.user.update({
    where: { id },
    data: { isActive: true },
  });
}


  async remove(id: string) {
  const user = await this.prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new HttpException('Utilisateur non trouvé', 404);
  }

  return this.prisma.user.delete({ where: { id } });
}

}
