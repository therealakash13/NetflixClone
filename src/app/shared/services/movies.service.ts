import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const options = {
  params: {
    include_adults: 'false',
    includE_videos: 'true',
    language: 'en-US',
    sort_by: 'popularity.desc',
    page: '1',
  },
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTgzYWNlOTUzYTE3ZTE0MDEyYjJmMzk3ZTk5OTk0OSIsInN1YiI6IjY2NmFiNmQxNDgzN2NlYmFhZWE3NTAyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DoTLW9x91irvjY7GU1PmNItAe723uxyr4fhKO1mt-Ck',
  },
};

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  http = inject(HttpClient);
  constructor() {}
  getMovies() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/discover/movie',
      options
    );
  }

  getTvShows() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/discover/tv',
      options
    );
  }

  getNowPlaying() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/now_playing',
      options
    );
  }

  getTopRatedMovies() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/top_rated',
      options
    );
  }

  getUpcomingMovies() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/upcoming',
      options
    );
  }

  getPopularMovies() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/popular',
      options
    );
  }

  getBannerVideo(id: string) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      options
    );
  }

  getBannerImage() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/575264/images',
      options
    );
  }

  getBannerDetail(id: string) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/${id}`,
      options
    );
  }

  // getRatedMovies() {
  //   return this.http.get<any>(
  //     'https://api.themoviedb.org/3/guest_session/{guest_session_id}/rated/movies',
  //     options
  //   );
  // }
}
