import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { app } from 'firebase-admin';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(FirebaseAuthStrategy.name);
  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate(token: any) {
    return this.firebaseApp
      .auth()
      .verifyIdToken(token, true)
      .catch((error) => {
        this.logger.error(error);
        throw new UnauthorizedException();
      });
  }
}
