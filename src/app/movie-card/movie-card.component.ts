import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie) => {
        movie.isFavorite = this.fetchApiData.isFavoriteMovie(movie._id);
      });
    });
  }

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

  getGenre(genre: any): void {
    this.dialog.open(GenreComponent, {
      data: {
        name: genre.name,
        description: genre.description,
      },
    });
  }

  getMovie(movie: any): void {
    console.log('selected movie:', movie);
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

  toggleFavoriteMovies(movie: any): void {
    if (movie.isFavorite) {
      this.removeFavoriteMovie(movie);
    } else {
      this.addFavoriteMovie(movie);
    }
  }

  addFavoriteMovie(movie: any): void {
    console.log('movieID ADD', movie);
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

  isFavMovie(movieID: string): boolean {
    return this.fetchApiData.isFavoriteMovie(movieID);
  }
}
