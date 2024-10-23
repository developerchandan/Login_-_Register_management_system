import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SecureStorageService } from './secure-storage.service';
import { Auth, User } from '../module/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private readonly USER_KEY = 'currentUser';
  private readonly TOKEN_KEY = 'token';

  currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private secureStorage: SecureStorageService) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = this.secureStorage.getItem(this.TOKEN_KEY);
    const user = this.secureStorage.getItem(this.USER_KEY);
    
    if (token && user) {
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  updateAuthState(auth: Auth): void {
    if (auth && auth.success && auth.data) {
      const user: User = {
        email: auth.data.email,
        username: auth.data.username,
        userId: auth.data.userId,
        token: auth.data.token
      };

      this.secureStorage.setItem(this.TOKEN_KEY, auth.data.token);
      this.secureStorage.setItem(this.USER_KEY, user);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  clearAuthState(): void {
    this.secureStorage.removeItem(this.TOKEN_KEY);
    this.secureStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return this.secureStorage.getItem(this.TOKEN_KEY);
  }
}
