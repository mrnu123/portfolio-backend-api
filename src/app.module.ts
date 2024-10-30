import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreService } from './firestore/firestore/firestore.service';
import { FirestoreService } from './firestore/firestore.service';
import { CertificatesModule } from './certificates/certificates.module';
import { BadgesModule } from './badges/badges.module';

@Module({
  imports: [CertificatesModule, BadgesModule],
  controllers: [AppController],
  providers: [AppService, FirestoreService],
})
export class AppModule {}
