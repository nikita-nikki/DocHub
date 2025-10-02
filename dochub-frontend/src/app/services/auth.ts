import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api/users';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/login`, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          if (response.success) {
            this.currentUserSubject.next(response.data);
          }
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, userData);
  }

  logout(): Observable<any> {
    return this.http
      .post(
        `${this.API_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(() => {
          this.currentUserSubject.next(null);
        })
      );
  }

  getCurrentUser(): Observable<AuthResponse> {
    return this.http
      .get<AuthResponse>(`${this.API_URL}/current`, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          if (response.success) {
            this.currentUserSubject.next(response.data);
          }
        })
      );
  }

  private checkAuthStatus(): void {
    this.getCurrentUser().subscribe({
      error: () => {
        this.currentUserSubject.next(null);
      },
    });
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}
