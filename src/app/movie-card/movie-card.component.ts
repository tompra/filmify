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
      return resp;
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

  addFavoriteMovie(movieID: any): void {
    console.log('movieID', movieID);
    movieID.isFavorite = true;
  }

  removeFavoriteMovie(movieID: any): void {
    console.log('movieID', movieID);
    movieID.isFavorite = false;
  }
}
