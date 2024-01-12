import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userLogData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
