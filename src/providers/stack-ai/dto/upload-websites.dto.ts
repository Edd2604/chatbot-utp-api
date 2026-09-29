import { IsUrl } from 'class-validator'

export class UploadWebsitesDto {
  @IsUrl({}, { each: true })
  urls: string[]
}
