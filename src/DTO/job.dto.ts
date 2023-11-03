import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CSVInputDTO {
  @IsNotEmpty()
  @IsString()
  readonly keyword: string;
}
