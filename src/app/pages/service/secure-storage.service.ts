import { Injectable } from '@angular/core';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {
  constructor(private encryptionService: EncryptionService) {}

  setItem(key: string, value: any): void {
    if (!value) return;
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    const encryptedValue = this.encryptionService.encrypt(stringValue);
    localStorage.setItem(key, encryptedValue);
  }

  getItem(key: string): any {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) return null;
    
    const decryptedValue = this.encryptionService.decrypt(encryptedValue);
    try {
      return JSON.parse(decryptedValue);
    } catch {
      return decryptedValue; // Return as is if it's not JSON
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
