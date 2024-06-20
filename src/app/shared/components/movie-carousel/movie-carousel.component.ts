import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import Swiper from 'swiper';
import { MovieContentInterface } from '../../models/movie-content.interface';
import { DescriptionPipe } from '../../../pipes/description.pipe';
import { animate, style, transition, trigger } from '@angular/animations';
import { GenreDetectorService } from '../../services/genre-detector.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-carousel',
  standalone: true,
  imports: [CommonModule, DescriptionPipe],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.css',
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('0.5s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class MovieCarouselComponent implements OnInit, AfterViewInit {
  @Input() videoContent: MovieContentInterface[] = [];
  @Input() title!: string;

  constructor(private movieService: MoviesService) {}

  genreDetector = inject(GenreDetectorService);
  private sanitizer = inject(DomSanitizer);

  selectedContent: string | null = null;
  isModalOpen = false;
  temp: any;
  genre: string[] = [];
  videoUrl!: any;
  videoKey: any;

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  ngOnInit(): void {}

  private initSwiper() {
    return new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 3,
      slidesPerGroup: 2,
      centeredSlides: true,
      loop: true,
      breakpoints: {
        600: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 5,
          centeredSlides: true,
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1500: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1800: {
          slidesPerView: 6,
          slidesPerGroup: 6,
          spaceBetween: 5,
          centeredSlides: true,
        },
      },
    });
  }

  sanitization() {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.videoKey}?autoplay=1&mute=0&loop=0&controls=1&rel=0`
    );
  }

  fetchMovies() {
    this.movieService.getBannerVideo(this.temp.id).subscribe((res: any) => {
      this.videoKey = res.results[0].key;
    });
    this.sanitization();
  }

  trailerToggler() {
    this.fetchMovies();
    this.fetchMovies();
  }
  openModal(movie: MovieContentInterface) {
    this.isModalOpen = true;
    this.temp = movie;
    console.log(this.temp);
    this.genre = this.temp.genre_ids.map((id: number) =>
      this.genreDetector.getGenreNameById(id)
    );
    //Design Modal
  }

  closeModal() {
    this.isModalOpen = false;
  }

  setHoverMovie(movie: MovieContentInterface) {
    this.selectedContent = movie.title ?? movie.name;
  }

  clearHoverMovie() {
    this.selectedContent = null;
  }
}
