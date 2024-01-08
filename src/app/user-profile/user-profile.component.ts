import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

type User = {
  _id: string;
  username: string;
  password: string;
  email: string;
  favoriteMovies: [];
};

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  hide = true;
  user: User = {
    _id: '',
    username: '',
    password: '',
    email: '',
    favoriteMovies: [],
  };

  @Input() userData = { username: '', password: '', email: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUserData();
    this.userData = {
      username: this.user.username || '',
      password: this.user.password || '',
      email: this.user.email || '',
    };
  }

  updateUser(): void {
    console.log('update btn clicked');
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      console.log('result', result);
      localStorage.setItem('user', JSON.stringify(result));
      this.snackBar.open('User updated succesfully', 'OK', { duration: 2000 });
    });
  }

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

  fetchUserData(): void {
    const userData = JSON.parse(localStorage.getItem('user') || '');
    if (userData._id) {
      this.user = userData as User;
    }
  }
}
