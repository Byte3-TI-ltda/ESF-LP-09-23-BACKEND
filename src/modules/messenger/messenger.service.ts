import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Contact } from '../contacts/entities/contact.entity';

@Injectable()
export class MessengerService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendMail(contact: Contact): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.mailerService
        .sendMail({
          from: `Exploradores Sem Fronteiras <${this.configService.get<string>(
            'mailerConfig.user',
          )}>`,
          to: contact.email,
          subject: 'Se inscreva em nosso canal do YouTube! 🎥🌎',
          html: `
              <h1>Olá, ${contact.firstName}.</h1>
              <p>Muito obrigado por preencher nosso formulário. Abaixo seguem os links de nossas redes sociais. Siga-nos e fique por dentro de todas as novidades!</p>
              <hr>

              <a href="https://www.facebook.com/exploradoressemfronteiras/"
              target="_blank"
              rel="noopener noreferrer">
              Facebook
              </a>
              <br>

              <a href="https://www.instagram.com/exploradoressemfronteiras/"
              target="_blank"
              rel="noopener noreferrer">
              Instagram
              </a>
              <br>

              <a href="https://www.tiktok.com/@exploradoressfronteiras/"
              target="_blank"
              rel="noopener noreferrer">
              Tiktok
              </a>
              <br>

              <a href="https://www.youtube.com/@exploradoressemfronteiras/"
              target="_blank"
              rel="noopener noreferrer">
              Youtube
              </a>
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
