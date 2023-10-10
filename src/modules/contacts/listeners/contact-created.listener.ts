import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ContactCreatedEvent } from '../events/contact-created.event';
import { MessengerService } from 'src/modules/messenger/messenger.service';

@Injectable()
export class ContactCreatedListener {
    private logger = new Logger(ContactCreatedListener.name);

    constructor(private messengerService: MessengerService) { }

    @OnEvent('contact.created')
    async handleContactCreatedEvent(event: ContactCreatedEvent) {
        await this.messengerService.sendMail(event).then((resp: any) => {
            this.logger.log("sending email to newly created contact was successful \u2193", resp);
        }).catch((error: any) => {
            this.logger.log(error);
        })
    }
}
