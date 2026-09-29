import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { PrismaService } from 'src/providers/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { SearchStatusQueryParamsDto } from '@common/query-params/search-status-query-params'
import { PrismaException } from '@providers/prisma/exceptions/prisma.exception'
import * as bcrypt from 'bcryptjs'
import { generateUUIDV7 } from '@common/utils/uuid'
import { ReniecService } from '@providers/reniec/reniec.service'
import { IReniecResponse } from '@providers/reniec/interfaces/reniec-response.interface'
import { formatDate } from '@common/utils/format-date'

import { UpdateUserDto } from './dto/update-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { ChangePasswordDto } from './dto/change-password.dto'

@Injectable()
export class UsersService {
  constructor(
    private readonly db: PrismaService,
    private reniecService: ReniecService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, role, modules_access, ...rest } = createUserDto

    const { nombres, apellidoMaterno, apellidoPaterno }: IReniecResponse =
      await this.reniecService.getInfoDNI(createUserDto.dni)
    try {
      const newAdmin = await this.db.user.create({
        data: {
          id: generateUUIDV7(),
          name: nombres,
          last_name: apellidoPaterno + ' ' + apellidoMaterno,
          password: await bcrypt.hash(password, 10),
          role: role,
          modules_access,
          ...rest,
        },
        omit: {
          password: true,
          is_archived: true,
        },
      })

      return newAdmin
    } catch (e) {
      if (e.code) {
        throw new PrismaException(e)
      }
      throw new InternalServerErrorException(
        'Hubo un error al crear el usuario',
      )
    }
  }

  async findAll({
    query,
    page,
    page_size,
    status,
  }: SearchStatusQueryParamsDto) {
    const pages = page || 1
    const skip = (pages - 1) * page_size

    const where = {
      AND: [
        query
          ? { name: { contains: query, mode: Prisma.QueryMode.insensitive } }
          : {},
        status !== null && status !== undefined ? { is_active: status } : {},
      ],
      is_archived: false,
    }

    const [users, total] = await Promise.all([
      this.db.user.findMany({
        where,
        skip,
        take: page_size,
        omit: {
          password: true,
          is_archived: true,
        },
      }),
      this.db.user.count({ where }),
    ])

    const totalPages = Math.ceil(total / page_size)
    const data = users.map((u, i) => {
      return {
        ...u,
        number: i + 1,
        created_at: formatDate(u.created_at),
        updated_at: formatDate(u.updated_at),
      }
    })
    return {
      data,
      total,
      totalPages,
    }
  }

  async getOne(id: string) {
    return await this.db.user.findFirst({
      omit: {
        password: true,
        is_archived: true,
      },
      where: {
        id,
        is_archived: false,
      },
    })
  }

  async getOneByEmail(email: string) {
    return await this.db.user.findFirst({
      omit: {
        is_archived: true,
      },
      where: {
        email,
        is_archived: false,
      },
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { role, is_active, dni, email, modules_access } = updateUserDto
    const { nombres, apellidoMaterno, apellidoPaterno }: IReniecResponse =
      await this.reniecService.getInfoDNI(updateUserDto.dni)
    try {
      const actualUser = await this.getOne(id)
      const updatedUser = await this.db.user.update({
        where: {
          id,
          is_archived: false,
        },
        data: {
          email,
          dni,
          name: nombres,
          last_name: apellidoPaterno + ' ' + apellidoMaterno,
          role,
          is_active,
          modules_access,
        },
        omit: {
          password: true,
          is_archived: true,
        },
      })

      return { actualUser, updatedUser }
    } catch (e) {
      if (e.code) {
        throw new PrismaException(e)
      }
      throw new InternalServerErrorException(
        'Hubo un error al actualizar el usuario',
      )
    }
  }

  async updatePassword(id: string, dto: ChangePasswordDto) {
    try {
      const actualUser = await this.getOne(id)
      const updatedUser = await this.db.user.update({
        where: {
          id,
          is_archived: false,
        },
        data: {
          password: await bcrypt.hash(dto.newPassword, 10),
        },
        omit: {
          password: true,
          is_archived: true,
        },
      })

      return { actualUser, updatedUser }
    } catch (e) {
      if (e.code) {
        throw new PrismaException(e)
      }
      throw new InternalServerErrorException(
        'Hubo un error al actualizar el usuario',
      )
    }
  }

  async remove(id: string) {
    try {
      const archivedUser = await this.db.user.update({
        where: {
          id,
          is_archived: false,
        },
        data: {
          is_active: false,
          is_archived: true,
        },
      })

      return archivedUser
    } catch (e) {
      if (e.code) {
        throw new PrismaException(e)
      }
      throw new InternalServerErrorException(
        'Hubo un error al archivar el usuario',
      )
    }
  }

  async verifyDni(dni: string) {
    return await this.reniecService.getInfoDNI(dni)
  }
}
