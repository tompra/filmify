import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(this.userData);
    this.fetchUserData();
    this.userData = {
      username: this.user.username || '',
      password: this.user.password || '',
      email: this.user.email || '',
    };
  }

  updateUser(): void {
    console.log('updateUser is clicked');
  }

  deleteUser(): void {
    console.log('deleteUser is clicked');
  }

  fetchUserData(): void {
    const userData = JSON.parse(localStorage.getItem('user') || '');
    console.log(userData);
    if (userData._id) {
      this.user = userData as User;
    }
  }
}
