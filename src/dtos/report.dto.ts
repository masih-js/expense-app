import { Exclude, Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ReportType } from 'src/data';
export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;
}

export class reportResponseDto {
  id: string;
  source: string;
  amount: number;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
  type: ReportType;

  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at;
  }
  constructor(partial: Partial<reportResponseDto>) {
    Object.assign(this, partial);
  }
}
