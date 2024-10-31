import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreService } from './firestore/firestore.service';
import { CertificatesModule } from './certificates/certificates.module';
import { BadgesModule } from './badges/badges.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CertificatesModule, BadgesModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, FirestoreService],
  exports: [FirestoreService],
})
export class AppModule {}
