import { Component, HostListener, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MoviesService } from '../../shared/services/movies.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { MovieContentInterface } from '../../shared/models/movie-content.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
export class HomeComponent implements OnInit {
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  constructor(private movieService: MoviesService) {}

  movies: MovieContentInterface[] = [];
  tvShows: MovieContentInterface[] = [];
  nowPlayingMovies: MovieContentInterface[] = [];
  popularMovies: MovieContentInterface[] = [];
  upcomingMovies: MovieContentInterface[] = [];

  title: string = '';
  overView: string = '';
  posterPath: string = '';
  key: string = '';

  // ratedMovies: MovieContentInterface[] = [];
  // topRatedMovies: MovieContentInterface[] = [];

  fetchData() {
    this.movieService.getMovies().subscribe((res: any) => {
      this.movies = res.results;

      this.movieService
        .getBannerDetail(res.results[0].id)
        .subscribe((res: any) => {
          this.title = res.original_title;
          this.overView = res.overview;
          this.posterPath = res.poster_path;
        });

      this.movieService
        .getBannerVideo(res.results[0].id)
        .subscribe((res: any) => {
          this.key = res.results[3].key;
        });
    });

    this.movieService.getTvShows().subscribe((res: any) => {
      this.tvShows = res.results;
    });

    this.movieService.getNowPlaying().subscribe((res: any) => {
      this.nowPlayingMovies = res.results;
    });

    this.movieService.getPopularMovies().subscribe((res: any) => {
      this.popularMovies = res.results;
    });

    this.movieService.getUpcomingMovies().subscribe((res: any) => {
      this.upcomingMovies = res.results;
    });
  }

  ngOnInit(): void {
    this.fetchData();
    this.activeRoute.fragment.subscribe((res: any) => {
      this.jumpToRoute(res);
    });
  }

  jumpToRoute(section: any) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}
