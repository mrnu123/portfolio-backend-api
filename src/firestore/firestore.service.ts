import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { firebaseConfig } from 'src/constant';

@Injectable()
export class FirestoreService {
  private firestore: admin.firestore.Firestore;

  constructor(private configService: ConfigService) {
    try {
      const serviceAccount: ServiceAccount = JSON.parse(`
        {
            "type": "${configService.get<string>(firebaseConfig.TYPE)}",
            "project_id": "${configService.get<string>(
              firebaseConfig.PROJECT_ID,
            )}",
            "private_key_id": "${configService.get<string>(
              firebaseConfig.PRIVATE_KEY_ID,
            )}",
            "private_key": "${configService.get<string>(
              firebaseConfig.PRIVATE_KEY,
            )}",
            "client_email": "${configService.get<string>(
              firebaseConfig.CLIENT_EMAIL,
            )}",
            "client_id": "${configService.get<string>(
              firebaseConfig.CLIENT_ID,
            )}",
            "auth_uri": "${configService.get<string>(firebaseConfig.AUTH_URI)}",
            "token_uri": "${configService.get<string>(
              firebaseConfig.TOKEN_URI,
            )}",
            "auth_provider_x509_cert_url": "${configService.get<string>(
              firebaseConfig.AUTH_PROVIDER_X509_CERT_URL,
            )}",
            "client_x509_cert_url": "${configService.get<string>(
              firebaseConfig.CLIENT_X509_CERT_URL,
            )}",
            "universe_domain": "${configService.get<string>(
              firebaseConfig.UNIVERSE_DOMAIN,
            )}"
        }
        `);

      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      }
      this.firestore = admin.firestore();
    } catch (error) {
      console.error('Error reading Firebase credentials:', error);
      throw error;
    }
  }

  async getCollection(collectionName: string) {
    return this.firestore.collection(collectionName).get();
  }

  async addDocument(collectionName: string, data: any) {
    return this.firestore.collection(collectionName).add(data);
  }
}
