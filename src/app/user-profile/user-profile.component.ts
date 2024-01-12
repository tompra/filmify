import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * @typedef {Object} User
 * @property {string} _id - The unique identifier for the user.
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 * @property {string} email - The email address of the user.
 * @property {Array} favoriteMovies - An array of favorite movies for the user.
 */
type User = {
  _id: string;
  username: string;
  password: string;
  email: string;
  favoriteMovies: [];
};

/**
 * @description Component that defines the user profile component of the app
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
  selector: 'app-user-profile',
  /**
   * @description URL component's HTML template
   * @member {string} templateUrl - The template URL for the component
   * @memberof UserProfileComponent
   */
  templateUrl: './user-profile.component.html',
  /**
   * @description Array of URLs of stylesheets to use in this component
   * @member {Array} styleUrls - Name for stylesheets for the component
   * @memberof UserRegistrationFormComponent
   */
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  /**
   * @description Indicates if the password input should be hidden or visible
   * @member {boolean} hide - The state of visibility of the password input
   * @memberof UserProfileComponent
   */
  hide = true;

  /**
   * @description User data object representing the user's profile
   * @member {User} user - Object user data containing _id, username, password, email, favoriteMovies
   * @memberof UserProfileComponent
   */
  user: User = {
    _id: '',
    username: '',
    password: '',
    email: '',
    favoriteMovies: [],
  };

  /**
   * @description Input that marks a property
   * @member {Object} userData - Object user data containing _id, username, password, email, favoriteMovies
   * @memberof UserProfileComponent
   */
  @Input() userData = {
    username: '',
    password: '',
    email: '',
    favoriteMovies: [],
  };

  /**
   * @description Handling API requests related to user profile
   * @param fetchApiData
   * @param snackBar
   * @param router
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * @description Lifecycle hook that is called after component initialized
   * @method
   * @memberof UserProfileComponent
   */
  ngOnInit(): void {
    this.fetchUserData();
    this.userData = {
      username: this.user.username || '',
      password: this.user.password || '',
      email: this.user.email || '',
      favoriteMovies: this.user.favoriteMovies || [],
    };
  }

  /**
   * @description Update the user profile information by calling the editUser method from FetchApiDataService
   * @method
   * @memberof UserProfileComponent
   */
  updateUser(): void {
    console.log('update btn clicked');
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      console.log('result', result);
      localStorage.setItem('user', JSON.stringify(result));
      this.snackBar.open('User updated succesfully', 'OK', { duration: 2000 });
    });
  }

  /**
   * @description Delete the user profile by calling the deleteUser method from FetchApiDataService
   * @method
   * @memberof UserProfileComponent
   */
  deleteUser(): void {
    console.log('deleteUser is clicked');
    this.fetchApiData.deleteUser().subscribe((result) => {
      console.log('result', result);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.snackBar.open('User deleted succesfully', 'OK', { duration: 2000 });
      this.router.navigate(['welcome']);
    });
  }

  /**
   * @description Fetch user data from the local storage and assign it to the user property
   * @method
   * @memberof UserProfileComponent
   */
  fetchUserData(): void {
    const userData = JSON.parse(localStorage.getItem('user') || '');
    if (userData._id) {
      this.user = userData as User;
    }
  }
}
