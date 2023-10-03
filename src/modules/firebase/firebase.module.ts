import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

const firebaseProvider = {
    provide: 'FIREBASE_APP',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const firebaseConfig = {
            type: configService.get<string>('firebaseConfig.type '),
            project_id: configService.get<string>('firebaseConfig.project_id'),
            private_key_id: configService.get<string>('firebaseConfig.private_key_id'),
            private_key: configService.get<string>('firebaseConfig.private_key'),
            client_email: configService.get<string>('firebaseConfig.client_email'),
            client_id: configService.get<string>('firebaseConfig.client_id'),
            auth_uri: configService.get<string>('firebaseConfig.auth_uri'),
            token_uri: configService.get<string>('firebaseConfig.token_uri'),
            auth_provider_x509_cert_url: configService.get<string>('firebaseConfig.auth_provider_x509_cert_url'),
            client_x509_cert_url: configService.get<string>('firebaseConfig.universe_domain'),
            universe_domain: configService.get<string>('firebaseConfig.universe_domain'),
        } as admin.ServiceAccount;

        return admin.initializeApp({
            credential: admin.credential.cert(firebaseConfig),
            databaseURL: configService.get<string>('firebaseConfig.databaseURL'),
            storageBucket: `${firebaseConfig.projectId}.appspot.com`,
        });
    },
};

@Module({
    imports: [ConfigModule],
    providers: [firebaseProvider],
    exports: [firebaseProvider],
})
export class FirebaseModule { }