import { Allow, IsNotEmpty } from 'class-validator';

export class CategoryDto {

  @IsNotEmpty()
  title?: string;

  @Allow()
  body?: string;

}
