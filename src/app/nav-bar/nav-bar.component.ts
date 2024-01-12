import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @description Component that defines the navbar component of the app
 * @category Components
 * @class
 * @module
 */
@Component({
  /**
   * @description CSS selector that identifies the component
   * @member {string} selector - CSS selector for the component
   * @memberof UserProfileComponent
   */
  selector: 'app-nav-bar',
  /**
   * @description URL component's HTML template
   * @member {string} templateUrl - The template URL for the component
   * @memberof UserProfileComponent
   */
  templateUrl: './nav-bar.component.html',
  /**
   * @description Array of URLs of stylesheets to use in this component
   * @member {Array} styleUrls - Name for stylesheets for the component
   * @memberof UserRegistrationFormComponent
   */
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  /**
   * @description Angular router service for navigation
   * @param router
   */
  constructor(private router: Router) {}

  /**
   * @description Navigatse to the user profile page
   * @method
   * @memberof NavBarComponent
   */
  navigateToProfile() {
    this.router.navigate(['profile']);
  }
  /**
   * @description Navigates to the movies page
   * @method
   * @memberof NavBarComponent
   */
  navigateToMovies() {
    console.log('go home clicked');
    this.router.navigate(['movies']);
  }
  /**
   * @description Logsout the user by removing token and user data from local storage. After logout it navigates to welcome page
   * @method
   * @memberof NavBarComponent
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['welcome']);
  }
}
