import { Injectable } from '@angular/core';
import { of, catchError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = `https://popcornhub-api.onrender.com/`;

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  // user registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log('userDetails login', userDetails);
    return this.http
      .post(`${apiUrl}users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  // user login
  public userLogin(userDetails: any): Observable<any> {
    console.log('userDetails login', userDetails);
    return this.http
      .post(`${apiUrl}login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  // getAllMovies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(
        map((res: any) => this.extractResponseData(res)),
        catchError(this.handleError)
      );
  }

  // getOneMovies
  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/${title}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(
        map((res: any) => this.extractResponseData(res)),
        catchError(this.handleError)
      );
  }

  // getDirector
  getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}director/${director}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(
        map((res: any) => this.extractResponseData(res)),
        catchError(this.handleError)
      );
  }

  // getGenre
  getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}genre/${genre}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(
        map((res: any) => this.extractResponseData(res)),
        catchError(this.handleError)
      );
  }

  // getUser
  getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map((res: any) => this.extractResponseData(res)),
        catchError(this.handleError)
      );
  }

  // getFavoriteMoviesUser
  getFavoriteMoviesUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(
        map((res: any) => {
          console.log('Response from the server', res);
          return this.extractResponseData(res);
        }),
        catchError(this.handleError)
      );
  }
  //check if is favorite movie
  isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.favoriteMovies.indexOf(movieId) >= 0;
  }

  // addFavoriteMovie
  addFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.favoriteMovies.push(movieID);
    localStorage.setItem('user', JSON.stringify(user));

    if (!this.isFavoriteMovie(movieID)) {
      return of({ message: 'Movie is not in favorites.' });
    }

    return this.http
      .post(
        `${apiUrl}users/${user.username}/movies/${movieID}`,
        {},
        {
          headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
        }
      )
      .pipe(
        map((res: any) => this.extractResponseData(res)),
        catchError(this.handleError)
      );
  }

  // removeFavoriteMovie
  removeFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!this.isFavoriteMovie(movieID)) {
      return of({ message: 'Movie is not in favorites.' });
    }

    const favIndex = user.favoriteMovies.indexOf(movieID);
    if (favIndex > -1) {
      user.favoriteMovies.splice(favIndex, 1);
    }
    localStorage.setItem('user', JSON.stringify(user));

    return this.http
      .delete(`${apiUrl}users/${user.username}/movies/${movieID}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(
        map((res: any) => this.extractResponseData(res)),
        catchError(this.handleError)
      );
  }

  // editUser
  editUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .put(`${apiUrl}users/${user.username}`, userData, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(
        map((res: any) => this.extractResponseData(res)),
        catchError(this.handleError)
      );
  }

  // deleteUser
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .delete(apiUrl + 'users/' + user.username, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(
        map((res: any) => this.extractResponseData(res)),
        catchError(this.handleError)
      );
  }

  // extract response data
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  // handling error
  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    let errorMessage = 'An error occurred while processing your request.';

    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 422) {
      // Server-side validation errors
      errorMessage = 'Validation error. Please check your input.';
    } else if (error.status === 500) {
      // Server-side errors
      errorMessage = 'Server error. Please try again later.';
    }

    return throwError(errorMessage);
  }
}
