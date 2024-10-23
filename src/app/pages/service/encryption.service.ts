import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private readonly SECRET_KEY = 'your-secure-secret-key'; // Store this in environment variables

  encrypt(data: any): string {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.SECRET_KEY).toString();
    } catch (e) {
      console.error('Encryption failed:', e);
      return '';
    }
  }

  decrypt(encryptedData: string): any {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.SECRET_KEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      console.error('Decryption failed:', e);
      return null;
    }
  }
}