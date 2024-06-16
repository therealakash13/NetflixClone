import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import Swiper from 'swiper';
import { MovieContentInterface } from '../../models/movie-content.interface';
import { DescriptionPipe } from '../../../pipes/description.pipe';
import { animate, style, transition, trigger } from '@angular/animations';

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

  selectedContent: string | null = null;

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  constructor() {}
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

  setHoverMovie(movie: MovieContentInterface) {
    this.selectedContent = movie.title ?? movie.name;
  }

  clearHoverMovie() {
    this.selectedContent = null;
  }
}
