import { Inject, Injectable, Logger } from '@nestjs/common';
import { Contact } from './entities/contact.entity';
import { ContactCreateDto } from './dtos/contact-create.dto';
import { app } from 'firebase-admin';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ContactsService {
  private db: FirebaseFirestore.Firestore;
  private collection: FirebaseFirestore.CollectionReference;
  private logger = new Logger(ContactsService.name);

  constructor(
    @Inject('FIREBASE_APP') private firebaseApp: app.App,
    private eventEmitter: EventEmitter2
  ) {
    this.db = firebaseApp.firestore();
    this.collection = this.db.collection('contacts');
  }

  async create(dto: ContactCreateDto): Promise<any> {
    return new Promise<void>(async (resolve, reject) => {
      await this.collection
        .add(dto)
        .then((data: any) => {
          this.logger.log("\u2193", JSON.stringify(data));
          this.eventEmitter.emit('contact.created', dto);
          resolve(data);
        })
        .catch((error) => {
          this.logger.error(error);
          reject(error);
        })
        .finally(() => { });
    });
  }

  async list(): Promise<Contact[]> {
    return new Promise((resolve, reject) => {
      this.collection
        .get()
        .then((snapshot) => {
          const documentos = [];
          snapshot.forEach((doc) => {
            documentos.push({ id: doc.id, data: doc.data() });
          });
          resolve(documentos);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
