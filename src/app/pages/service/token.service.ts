import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SecureStorageService } from './secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly jwtHelper = new JwtHelperService();
  private readonly TOKEN_KEY = 'token';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';

  constructor(private secureStorage: SecureStorageService) {}

  setTokens(accessToken: string, refreshToken: string): void {
    this.secureStorage.setItem(this.TOKEN_KEY, accessToken);
    this.secureStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  getAccessToken(): string | null {
    return this.secureStorage.getItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return this.secureStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  removeTokens(): void {
    this.secureStorage.removeItem(this.TOKEN_KEY);
    this.secureStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  isTokenExpired(token: string): boolean {
    try {
      return this.jwtHelper.isTokenExpired(token);
    } catch {
      return true;
    }
  }

  getTokenExpirationDate(token: string): Date | null {
    try {
      return this.jwtHelper.getTokenExpirationDate(token);
    } catch {
      return null;
    }
  }

  decodeToken(token: string): any {
    try {
      return this.jwtHelper.decodeToken(token);
    } catch {
      return null;
    }
  }
}