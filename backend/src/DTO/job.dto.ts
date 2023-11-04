import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';

export class CSVInputDTO {
  @IsNotEmpty()
  @IsString()
  readonly keyword: string;

  @IsNotEmpty()
  @IsNumber()
  readonly user_id: number;
}
