import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { validate, version } from 'uuid'

@Injectable()
export class ValidateUUID implements PipeTransform {
  transform(value: string) {
    if (!isValidUUIDv7(value)) {
      throw new BadRequestException(
        'UUID inválido. Se espera un UUID versión 7.',
      )
    }
    return value
  }
}

function isValidUUIDv7(uuid: string): boolean {
  if (!validate(uuid)) return false
  return version(uuid) === 7
}
