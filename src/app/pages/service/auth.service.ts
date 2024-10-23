import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthStateService } from './auth-state.service';
import { Auth } from '../module/auth.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}` + 'auth';

  constructor(
    private http: HttpClient,
    private authState: AuthStateService
  ) {}

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          if (response.success) {
            this.authState.updateAuthState(response);
          }
        }),
        catchError(this.handleError)
      );
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return passwordRegex.test(password);
  }

  private handleError(error: any) {
    let errorMessage = 'An error occurred during registration';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.error?.errors) {
      errorMessage = error.error.errors.join(', ');
    }

    return throwError(() => errorMessage);
  }

  login(email: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          if (response.success) {
            this.authState.updateAuthState(response);
          }
        }),
        catchError(error => {
          console.error('Login failed:', error);
          return throwError(() => error);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {})
      .pipe(
        tap(() => this.authState.clearAuthState()),
        catchError(error => {
          console.error('Logout failed:', error);
          return throwError(() => error);
        })
      );
  }

  refreshToken(): Observable<Auth> {
    return this.http.post<Auth>(`${this.apiUrl}/refresh-token`, {})
      .pipe(
        tap(response => {
          if (response.success) {
            this.authState.updateAuthState(response);
          }
        }),
        catchError(error => {
          console.error('Token refresh failed:', error);
          return throwError(() => error);
        })
      );
  }
}