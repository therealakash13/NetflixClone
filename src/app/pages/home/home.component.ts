import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MoviesService } from '../../shared/services/movies.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { MovieContentInterface } from '../../shared/models/movie-content.interface';
import { Observable, forkJoin, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    BannerComponent,
    CommonModule,
    MovieCarouselComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  movieService = inject(MoviesService);

  movies: MovieContentInterface[] = [];
  tvShows: MovieContentInterface[] = [];
  ratedMovies: MovieContentInterface[] = [];
  nowPlayingMovies: MovieContentInterface[] = [];
  popularMovies: MovieContentInterface[] = [];
  topRatedMovies: MovieContentInterface[] = [];
  upcomingMovies: MovieContentInterface[] = [];

  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();
  key: any = [];

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    // this.movieService.getRatedMovies(),
    this.movieService.getNowPlaying(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRatedMovies(),
  ];

  ngOnInit(): void {
    forkJoin(this.sources)
      .pipe(
        map(
          ([
            movies,
            tvShows,
            ratedMovies,
            nowPlaying,
            upcoming,
            popular,
            topRated,
          ]) => {
            this.bannerDetail$ = this.movieService.getBannerDetail(
              `${movies.results[0].id}`
            );
            this.bannerVideo$ = this.movieService.getBannerVideo(
              `${movies.results[0].id}`
            );

            return {
              movies,
              tvShows,
              ratedMovies,
              nowPlaying,
              upcoming,
              popular,
              topRated,
            };
          }
        )
      )
      .subscribe((res: any) => {
        this.movies = res.movies.results as MovieContentInterface[];
        this.tvShows = res.tvShows.results as MovieContentInterface[];
        this.ratedMovies = res.ratedMovies.results as MovieContentInterface[];
        this.nowPlayingMovies = res.nowPlaying
          .results as MovieContentInterface[];
        this.upcomingMovies = res.upcoming.results as MovieContentInterface[];
        this.popularMovies = res.popular.results as MovieContentInterface[];
        // this.topRatedMovies = res.topRated.results as MovieContentInterface[];
      });
  }
}
