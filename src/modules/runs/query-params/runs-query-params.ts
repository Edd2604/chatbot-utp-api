import { RangeDateQueryParams } from '@common/query-params/rangeDate-query-params'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsBoolean, IsString } from 'class-validator'
import { Transform } from 'class-transformer'
enum ErrorEnum {
  true = 'true',
  false = 'false',
  all = 'all',
}

export class RunQueryParams extends RangeDateQueryParams {
  @ApiPropertyOptional({
    description: 'Estado',
    enum: ErrorEnum,
    example: 'all',
    default: 'all',
  })
  @IsOptional()
  @IsBoolean({
    message: 'el status debe ser uno de los siguientes valores = en, dis, all',
  })
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return null
    }

    if (value === 'true') return true
    if (value === 'false') return false
    if (value === 'all') return null

    return value
  })
  error?: boolean | null = null

  @ApiPropertyOptional({ description: 'Texto de búsqueda', example: '' })
  @IsOptional()
  @IsString()
  query: string
}
