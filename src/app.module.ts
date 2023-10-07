import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './modules/contacts/contacts.module';
import { getEnvPath } from './common/helper/env.helper';
import { ConfigModule, ConfigService } from '@nestjs/config';
import firebaseConfig from './common/configs/firebase.config';
import { FirebaseModule } from './modules/firebase/firebase.module';
import mailerConfig from './common/configs/mailer.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EventEmitterModule } from '@nestjs/event-emitter';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs/`);

@Module({
  imports: [
    ContactsModule,
    FirebaseModule,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: envFilePath,
      isGlobal: true,
      load: [firebaseConfig, mailerConfig],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: configService.get<string>('mailerConfig.transport_service'),
          auth: {
            user: configService.get<string>('mailerConfig.transport_auth_user'),
            pass: configService.get<string>('mailerConfig.transport_auth_pass'),
          },
          ignoreTLS: true,
        },
        defaults: {},
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
