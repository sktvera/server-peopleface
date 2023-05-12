import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsNumber()
  author: number; // Aquí asumo que el autor es un número (por ejemplo, el ID del usuario)
}
