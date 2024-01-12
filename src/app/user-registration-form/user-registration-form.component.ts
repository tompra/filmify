import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @description Component that defines the user registration component of the app
 * @category Components
 * @class
 * @module
 */

@Component({
  /**
   * @description CSS selector that identifies the component
   * @member {string} selector - CSS selector for the component
   * @memberof UserRegistrationFormComponent
   */
  selector: 'app-user-registration-form',
  /**
   * @description URL component's HTML template
   * @member {string} templateUrl - The template URL for the component
   * @memberof UserRegistrationFormComponent
   */
  templateUrl: './user-registration-form.component.html',
  /**
   * @description Array of URLs of stylesheets to use in this component
   * @member {Array} styleUrls - Name for stylesheets for the component
   * @memberof UserRegistrationFormComponent
   */
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * @description Input that marks a property
   * @member {Object} userData - The user data input object containing username, password, email and birthday
   * @memberof UserRegistrationFormComponent
   */
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  /**
   * @description Handling API requests related to user registration
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * @description Lifecycle hook that is called after component initialized
   * @method
   * @memberof UserRegistrationFormComponent
   */
  ngOnInit(): void {}

  /**
   * @description Registers a new user by callng the userRegistration method from FetchApiDataService
   * @method
   * @memberof UserRegistrationFormComponent
   */

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        this.dialogRef.close();
        console.log('result:', result);
        this.snackBar.open('User registered successfully', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        console.log('error:', error);
        this.snackBar.open(error, 'Try again', {
          duration: 2000,
        });
      }
    );
  }
}
