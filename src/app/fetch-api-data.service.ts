import { Injectable } from '@angular/core';
import { of, catchError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// API Source
const apiUrl = `https://popcornhub-api.onrender.com/`;

/**
 * @description Service for fetch api data
 * @injectable
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /**
   * constructor the FetchApiData
   * @constructor
   * @param {HttpClient} http - The angular HTTPClient for making HTTP requests
   */
  constructor(private http: HttpClient) {}

  // user registration
  /**
   * @description Register a new user
   * @method
   * @param {Object} userDetails - User details for registration
   * @returns {Observable<any>} Observable that generates the response or an error.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log('userDetails login', userDetails);
    return this.http
      .post(`${apiUrl}users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  // user login
  /**
   * @description Logs in a user
   * @method
   * @param {Object} userDetails - User details for login.
   * @returns {Observable<any>} Observable that generates the response or an error.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log('userDetails login', userDetails);
    return this.http
      .post(`${apiUrl}login`, userDetails)
      .pipe(catchError(this.handleLoginError));
  }

  // getAllMovies
  /**
   * @description Get all movies
   * @method
   * @returns {Observable<any>} Observable that generates the response of all the movies or an error
   */
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
  /**
   * @description Get movie by title
   * @param {string} title - Title of the movie to be retrieved
   * @returns {Observable<any>} - Observable that generates the response of the requested movie or an error.
   */
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
  /**
   * @description Get director by name
   * @method
   * @param {string} director - Director information to be retrived
   * @returns {Observable<any>} - Observable that generates the response of the requested director or an error
   */
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
  /**
   * @description Get genre
   * @method
   * @param {string} genre - Genre information to be retrieved.
   * @returns {Observable<any>} - Observable that generates the response of the requested genre or an error.
   */
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
  /**
   * @description Get user
   * @method
   * @param {string} username - User information to be retrieved
   * @returns {Observable<any>} - Observable that generates the response of the requested user or an error
   */
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
  /**
   * @description Get favorite movies from user
   * @param {string} username - User favorite movies to be retrieved.
   * @returns {Observable<any>} - Observable that generates the response of the requested user's favorite movies or an error
   */
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
  /**
   * @description Check if a movie is a favorite for the current user
   * @method
   * @param {string} movieID - The movie iID of the movie to check
   * @returns {boolean} - Indicates whether the movie is favorite
   */
  isFavoriteMovie(movieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.favoriteMovies.indexOf(movieID) >= 0;
  }

  // addFavoriteMovie
  /**
   * @description Adds a movie to user's favorite list
   * @method
   * @param {string} movieID - The movie ID to add to favorite list
   * @returns {Observable<any>} - Observable that generates the response of adding the movie to current user favorite movie list
   */

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
  /**
   * @description Deletes a movie to user's favorite list
   * @method
   * @param {string} movieID - The movie ID to add to favorite list
   * @returns {Observable<any>} - Observable that generates the response of removing the movie to current user favorite movie list
   */
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
  /**
   * @description Edit the current user's information
   * @method
   * @param {any} userData - The user data to be updated
   * @returns {Observable<any>} - Observable that generates the response of updating the current user's information
   */
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
  /**
   * @description Deletes user account
   * @method
   * @returns {Observable<any>} - Observable that generates the response of deleting the user
   */
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
  /**
   * @description Extract the response data from an HTTP response
   * @private
   * @method
   * @param {Response} res - HTTP response
   * @returns {any} - The extracted response data
   */
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  // handling error
  /**
   * @description Handles HTTP errors
   * @private
   * @method
   * @param {any} error - HTTP error
   * @returns {Observable<any>} - Observable that generates the HTTP error messages.
   */
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

  // handle Login error
  /**
   * @private
   * @method
   * @param {HttpErrorResponse} error - The HTTP error from user login
   * @returns {Observable<any>} - Observable that generates the error message from user login
   */

  private handleLoginError(error: HttpErrorResponse): Observable<any> {
    console.log('Error occured in login user:', error);
    if (
      error.status === 400 &&
      !error.error.user &&
      error.error.message === 'Something is not right'
    ) {
      return throwError('User not found. Please try again!');
    }
    return this.handleError(error);
  }
}
