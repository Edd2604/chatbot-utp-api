import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { ValidateUUID } from '@common/pipes/validate-uuid.pipe'
import { SearchStatusQueryParamsDto } from '@common/query-params/search-status-query-params'
import { UserSession } from '@auth/decorators/user-session.decorator'
import { IUserSession } from '@auth/interfaces/user-session.interface'
import { PublicAccess } from '@auth/decorators/public.decorator'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { LoggerEvents } from '@modules/events/logger/logger-events.interfaces'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { Auth } from '@modules/auth/decorators/auth.decorator'
import { Entity } from '@prisma/client'

import { ValidateDNI } from './pipes/validate-dni.pipe'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { ChangePasswordDto } from './dto/change-password.dto'

@ApiBearerAuth()
@Auth(['SUPER_ADMIN'])
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post('create-user')
  @ApiOperation({
    summary: 'Crea un usuario del sistema',
  })
  async createUser(
    @UserSession() session: IUserSession,
    @Body() createUserDto: CreateUserDto,
  ) {
    const admin = await this.usersService.create(createUserDto)
    this.eventEmitter.emit(LoggerEvents.ENTITY_CREATED_EVENT, {
      session,
      entity: Entity.User,
      entityId: admin.id,
    })
    return admin
  }

  @Get('get-all-users')
  @ApiOperation({
    summary: 'Obtiene todos los usuarios',
  })
  async getAllUsers(@Query() query: SearchStatusQueryParamsDto) {
    return this.usersService.findAll(query)
  }

  @PublicAccess()
  @Get(':userDni/verify-DNI')
  @ApiOperation({
    summary: 'Verifica el dni de un usuario',
  })
  async verifyDni(@Param('userDni', ValidateDNI) dni: string) {
    return this.usersService.verifyDni(dni)
  }

  @Get(':userId/get-user')
  @ApiOperation({
    summary: 'Obtiene un usuario',
  })
  async getOneUser(@Param('userId', ValidateUUID) userId: string) {
    return this.usersService.getOne(userId)
  }

  @Patch(':userId/update-user')
  @ApiOperation({
    summary: 'Actualiza la información de un usuario',
  })
  async updateUser(
    @Param('userId', ValidateUUID) userId: string,
    @UserSession() session: IUserSession,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { actualUser, updatedUser } = await this.usersService.update(
      userId,
      updateUserDto,
    )
    this.eventEmitter.emit(LoggerEvents.ENTITY_UPDATED_EVENT, {
      session,
      entity: Entity.User,
      entityId: actualUser.id,
      after: updatedUser,
      before: actualUser,
    })
    return updatedUser
  }

  @Patch(':userId/change-password')
  @ApiOperation({
    summary: 'Actualiza la contraseña de un usuario',
  })
  async changePassword(
    @Param('userId', ValidateUUID) userId: string,
    @UserSession() session: IUserSession,
    @Body() newPassword: ChangePasswordDto,
  ) {
    const { actualUser, updatedUser } = await this.usersService.updatePassword(
      userId,
      newPassword,
    )
    this.eventEmitter.emit(LoggerEvents.ENTITY_UPDATED_EVENT, {
      session,
      entity: Entity.User,
      entityId: actualUser.id,
      after: updatedUser,
      before: actualUser,
    })
    return updatedUser
  }

  @Delete(':userId/remove-user')
  @ApiOperation({
    summary: 'Archiva un usuario',
  })
  async removeUser(
    @Param('userId', ValidateUUID) userId: string,
    @UserSession() session: IUserSession,
  ) {
    const admin = await this.usersService.remove(userId)
    this.eventEmitter.emit(LoggerEvents.ENTITY_ARCHIVED_EVENT, {
      session,
      entity: Entity.User,
      entityId: admin.id,
    })
    return admin
  }
}
