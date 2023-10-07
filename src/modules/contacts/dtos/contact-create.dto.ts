import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ContactInterface } from '../entities/contact.entity';
import { IsValidEmail } from '../decorators/is-valid-email.decorator';
import { DefaultDto } from 'src/common/dtos/default.dto';

export class ContactCreateDto extends DefaultDto implements ContactInterface {
    @ApiProperty({
        description: 'primeiro nome do contato',
        example: 'John',
    })
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({
        description: 'sobrenome do contato',
        example: 'Doe',
    })
    @IsNotEmpty()
    @IsString()
    lastName: string;

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
