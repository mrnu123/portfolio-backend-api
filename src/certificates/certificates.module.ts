import { Module } from '@nestjs/common';
import { CertificatesController } from './certificates.controller';
import { CertificatesService } from './certificates.service';
import { FirestoreService } from 'src/firestore/firestore.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [CertificatesController],
  providers: [CertificatesService,FirestoreService,ConfigService],
  exports: [CertificatesService],
})
export class CertificatesModule {}
