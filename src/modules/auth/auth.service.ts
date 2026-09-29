/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '@modules/users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { IUserSession } from '@auth/interfaces/user-session.interface'
import { envs } from 'src/config/envs'

import { SignInDto } from './dto/signIn.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register() {}

  async signIn({ email, password }: SignInDto) {
    const user = await this.userService.getOneByEmail(email)
    if (!user) {
      throw new UnauthorizedException('El usuario no existe')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) throw new UnauthorizedException('La contraseña es incorrecta')

    const payload: IUserSession = {
      id: user.id,
      username: user.name + ' ' + user.last_name,
      email: user.email,
      role: user.role,
      modules: user.modules_access,
    }

    return {
      user: payload,
      tokens: {
        access: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET,
          expiresIn: '1d',
        }),
        refresh: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        }),
      },
    }
  }

  async signOut() {}

  async refresh(user: any) {
    const payload: IUserSession = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      modules: user.modules_access,
    }
    return {
      access: await this.jwtService.signAsync(payload, {
        secret: envs.jwtSecret,
        expiresIn: '1d',
      }),
      refresh: await this.jwtService.signAsync(payload, {
        secret: envs.refreshJwtSecret,
        expiresIn: '7d',
      }),
    }
  }
}
