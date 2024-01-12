import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @description Component that defines the movie description component of the app
 * @category Components
 * @class
 * @module
 */
@Component({
  /**
   * @description CSS selector that identifies the component
   * @member {string} selector - CSS selector for the component
   * @memberof MovieCardComponent
   */
  selector: 'app-movie-card',
  /**
   * @description URL component's HTML template
   * @member {string} templateUrl - The template URL for the component
   * @memberof MovieCardComponent
   */
  templateUrl: './movie-card.component.html',
  /**
   * @description Array of URLs of stylesheets to use in this component
   * @member {Array} styleUrls - Name for stylesheets for the component
   * @memberof MovieCardComponent
   */
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  /**
   * @description Array that stores movie data
   * @member {Array} movies - Array of movie data
   */
  movies: any[] = [];
  /**
   * @description Constructor of the MovieCard component
   * @constructor
   * @param fetchApiData
   * @param dialog
   * @param snackBar
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  /**
   * @description Lifecycle hook that is called after component initialized
   * @method
   * @memberof MovieCardComponent
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * @description Fetch all movies form the API And update the movies array
   * @method
   * @memberof MovieCardComponent
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie) => {
        movie.isFavorite = this.fetchApiData.isFavoriteMovie(movie._id);
      });
    });
  }

  /**
   * @description Opens a dialog displaying information about the director
   * @method
   * @param {any} director - Director data
   * @memberof MovieCardComponent
   */
  getDirector(director: any): void {
    this.dialog.open(DirectorComponent, {
      data: {
        name: director.name,
        bio: director.bio,
        birth: director.birth,
        death: director.death,
      },
    });
  }

  /**
   * @description Opens a dialog displaying information about the genre
   * @method
   * @param {any} genre - Genre data
   * @memberof MovieCardComponent
   */
  getGenre(genre: any): void {
    this.dialog.open(GenreComponent, {
      data: {
        name: genre.name,
        description: genre.description,
      },
    });
  }

  /**
   * @description Opens a dialog displaying information about a selected movie
   * @method
   * @param {any} movie - Movie data
   * @memberof MovieCardComponent
   */
  getMovie(movie: any): void {
    this.fetchApiData.getMovie(movie.title).subscribe(
      (data) => {
        this.dialog.open(MovieDescriptionComponent, {
          data: {
            title: data.title,
            description: data.description,
            director: data.director.name,
            genre: data.genre.name,
            actors: data.actors,
          },
        });
      },
      (error) => console.error('Error fetching movie data:', error)
    );
  }

  /**
   * @desription Toggles the favorite status of the favorite button
   * @method
   * @param {any} movie - The movie data
   * @memberof MovieCardComponent
   */
  toggleFavoriteMovies(movie: any): void {
    if (movie.isFavorite) {
      this.removeFavoriteMovie(movie);
    } else {
      this.addFavoriteMovie(movie);
    }
  }

  /**
   * @description Adds a movie to the user's favorites lists
   * @method
   * @param {any} movie - The movie data
   * @memberof MovieCardComponent
   */
  addFavoriteMovie(movie: any): void {
    this.fetchApiData.addFavoriteMovie(movie._id).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open('Added to favorites', 'OK', { duration: 2000 });
        movie.isFavorite = true;
      },
      (error) => {
        console.error('Error adding from favorites', error);
        this.snackBar.open('Failed to add to favories', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * @description Removes a movie to the user's favorites lists
   * @method
   * @param {any} movie - The movie data
   * @memberof MovieCardComponent
   */
  removeFavoriteMovie(movie: any): void {
    console.log('movie remove', movie);
    this.fetchApiData.removeFavoriteMovie(movie._id).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open('Remove from favorites', 'OK', { duration: 2000 });
        movie.isFavorite = false;
      },
      (error) => {
        console.error('Error removing from favorites', error);
        this.snackBar.open('Failed to remove from favories', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * @description Check if movie is in the user's favorites
   * @param {string} movieID - The ID of the movie
   * @returns {boolean} - Returns true if the movie is favorite or false if not.
   * @memberof MovieCardComponent
   */
  isFavMovie(movieID: string): boolean {
    return this.fetchApiData.isFavoriteMovie(movieID);
  }
}
