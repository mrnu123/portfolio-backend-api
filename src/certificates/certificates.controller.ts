import { Controller, Get } from '@nestjs/common';
import { FirestoreService } from 'src/firestore/firestore.service';
import { CertificatesService } from './certificates.service';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}
  @Get()
  async getCertificates() {
    console.log('Get certificates');
    const certificates = await this.certificatesService.getCertificates();
    return certificates;
  }
}
