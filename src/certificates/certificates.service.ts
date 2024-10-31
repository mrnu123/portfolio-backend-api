import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/firestore/firestore.service';

@Injectable()
export class CertificatesService {
  private readonly collectionName = 'certification';

  constructor(private readonly firestoreService: FirestoreService) {}

  async getCertificates() {
    const certificates = await this.firestoreService.getCollection(
      this.collectionName,
    );
    return certificates.docs.map((doc) => doc.data());
  }
}
