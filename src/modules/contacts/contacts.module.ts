import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { MessengerService } from '../messenger/messenger.service';
import { ContactCreatedListener } from './listeners/contact-created.listener';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, MessengerService, ContactCreatedListener],
  imports: [FirebaseModule],
})
export class ContactsModule { }
