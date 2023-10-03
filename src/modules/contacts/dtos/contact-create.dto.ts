import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ContactInterface } from '../entities/contact.entity';
import { IsValidEmail } from '../decorators/is-valid-email.decorator';

export class ContactCreateDto implements ContactInterface {
    @ApiProperty({
        description: 'primeiro nome do contato',
        example: 'John',
    })
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty({
        description: 'sobrenome do contato',
        example: 'Doe',
    })
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @ApiProperty({
        description: 'email do contato',
        example: 'johndoe@example.com',
    })
    @IsNotEmpty()
    @IsString()
    @IsValidEmail({
        message: 'informe um e-mail válido',
    })
    email: string;

    @ApiProperty({
        description: 'número de whatsApp do contato',
        example: '+5511999999999',
    })
    @IsNotEmpty()
    @IsString()
    whatsapp: string;
}
