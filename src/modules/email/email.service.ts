import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Scope } from '@nestjs/common';
import { Contact } from '../contacts/entities/contact.entity';

@Injectable({ scope: Scope.DEFAULT })
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(contact: Contact): Promise<void> {
    new Promise(async (resolve, reject) => {
      await this.mailerService
        .sendMail({
          from: 'Exploradores Sem Fronteiras <esf.firebase@gmail.com>',
          to: contact.email,
          subject: 'Se inscreva em nosso canal do YouTube! 🎥🌎',
          html: `
          <h1>Olá, ${contact.firstname}</h1>
          <p>Muito obrigado por preencher nosso formulário. Abaixo seguem os links de nossas redes sociais. Siga-nos e fique por dentro de todas as novidades!</p>
        `,
        })
        .then((resp) => {
          resolve(resp);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
