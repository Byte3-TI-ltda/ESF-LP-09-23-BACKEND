import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { EmailService } from '../email/email.service';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, EmailService],
  imports: [FirebaseModule],
})
export class ContactsModule {}
