import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
import { ContactCreateDto } from './dtos/contact-create.dto';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('contacts')
@ApiTags('contacts')
export class ContactsController {
    constructor(private contactsService: ContactsService) { }

    @Post('create')
    @ApiOperation({
        summary: 'create',
        description: 'create',
    })
    @ApiResponse({ status: 201, description: 'success' })
    async create(@Body() dto: ContactCreateDto) {
        return await this.contactsService.create(dto);
    }

    @UseGuards(FirebaseAuthGuard)
    @Get('list')
    @ApiOperation({
        summary: 'list',
        description: 'list',
    })
    @ApiResponse({ status: 200, description: 'success' })
    @UsePipes(new ValidationPipe({ transform: true }))
    async list() {
        return await this.contactsService.list();
    }
}
