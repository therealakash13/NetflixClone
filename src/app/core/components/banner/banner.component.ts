import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { DescriptionPipe } from '../../../pipes/description.pipe';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [DescriptionPipe],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent implements OnChanges {
  @Input({ required: true }) bannerTitles = '';
  @Input({ required: true }) bannerOverview = '';
  @Input({ required: true }) videoKey = '';
  @Input({ required: true }) bannerImage = '';

  private sanitizer = inject(DomSanitizer);
  videoUrl!: any;
  imageUrl!: any;
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['videoKey']) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.videoKey}?autoplay=1&mute=1&loop=1&controls=0&rel=0`
      );
    }
    if (changes['bannerImage']) {
      this.imageUrl = `https://image.tmdb.org/t/p/w200/${this.bannerImage}`;
    }
  }
}
