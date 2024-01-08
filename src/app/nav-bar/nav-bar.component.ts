import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(private router: Router) {}

  navigateToProfile() {
    this.router.navigate(['profile']);
  }
  navigateToMovies() {
    console.log('go home clicked');
    this.router.navigate(['movies']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['welcome']);
  }
}
