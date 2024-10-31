import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { environment } from 'src/constant';

@Injectable()
export class FirestoreService {
  private firestore: admin.firestore.Firestore;

  constructor(private configService: ConfigService) {
    try {
      const serviceAccount: ServiceAccount = JSON.parse(
        readFileSync(
          resolve(
            __dirname,
            configService.get<string>(environment.FIREBASE_CRED),
          ),
          'utf-8',
        ),
      );

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
