import { Component } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
/**
 * @description Component that defines the Welcome component of the app
 * @category Components
 * @class
 * @module
 */
@Component({
  /**
   * @description CSS selector that identifies the component
   * @member {string} selector - CSS selector for the component
   * @memberof WelcomePageComponent
   */
  selector: 'app-welcome-page',
  /**
   * @description URL component's HTML template
   * @member {string} templateUrl - The template URL for the component
   * @memberof WelcomePageComponent
   */
  templateUrl: './welcome-page.component.html',
  /**
   * @description Array of URLs of stylesheets to use in this component
   * @member {Array} styleUrls - Name for stylesheets for the component
   * @memberof WelcomePageComponent
   */
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  /**
   * @description Mat dialog service for opening dialog boxes
   * @param {MatDialog} dialog
   */
  constructor(public dialog: MatDialog) {}

  /**
   * @description Lifecycle hook that is called after component initialized
   * @method
   * @memberof WelcomePageComponent
   */
  ngOnInit(): void {}

  /**
   * @description Open the user registration dialog box
   * @method
   * @memberof WelcomePageComponent
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '320px',
    });
  }
  /**
   * @description Open the user login dialog box
   * @method
   * @memberof WelcomePageComponent
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '320px',
    });
  }
}
