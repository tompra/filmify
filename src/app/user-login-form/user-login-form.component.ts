import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * @description Component that defines the user login component of the app
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
  selector: 'app-user-login-form',
  /**
   * @description URL component's HTML template
   * @member {string} templateUrl - The template URL for the component
   * @memberof UserProfileComponent
   */
  templateUrl: './user-login-form.component.html',
  /**
   * @description Array of URLs of stylesheets to use in this component
   * @member {Array} styleUrls - Name for stylesheets for the component
   * @memberof UserRegistrationFormComponent
   */
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * @description Input that marks a property
   * @member {Object} userLogData - Object user data containing _id, username, password, email, favoriteMovies
   * @memberof UserProfileComponent
   */
  @Input() userLogData = { username: '', password: '' };

  /**
   * @description Handling API requests related to login user
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
   * @param router
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * @description Lifecycle hook that is called after component initialized
   * @method
   * @memberof UserLoginFormComponent
   */
  ngOnInit(): void {}

  /**
   * @description User login by calling the userLogin method from FetchApiDataService
   * @method
   * @memberof UserLoginFormComponent
   */
  userLogin(): void {
    this.fetchApiData.userLogin(this.userLogData).subscribe(
      (result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        this.snackBar.open('User login successfully', 'OK', {
          duration: 2000,
          panelClass: ['green-snackbar'],
        });
        this.router.navigate(['movies']);
      },
      (error) => {
        console.log('error', error);
        if (error === 'User not found. Please try again!') {
          this.snackBar.open(error, 'Try again!', { duration: 2000 });
        } else {
          this.snackBar.open(
            'An error occured while trying to login user',
            'Try again',
            { duration: 2000 }
          );
        }
      }
    );
  }
}
