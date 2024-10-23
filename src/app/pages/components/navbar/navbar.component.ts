import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../module/auth.model';
import { AuthStateService } from '../../service/auth-state.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  currentUser: User | null = null;
  private subscriptions = new Subscription();
  dropdownOpen = false;
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  constructor(
    private authState: AuthStateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.authState.isAuthenticated$.subscribe(
        isAuthenticated => this.isAuthenticated = isAuthenticated
      )
    );

    this.subscriptions.add(
      this.authState.currentUser$.subscribe(user => {
        this.currentUser = user;
      })
    );
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: (error) => console.error('Logout error:', error)
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}