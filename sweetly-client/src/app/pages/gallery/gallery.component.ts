import { Component, OnInit } from '@angular/core';
import { Photo, PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  photos: Photo[] = [];
  loading = false;
  error: string | null = null;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.loading = true;
    this.photoService.getPhotos().subscribe({
      next: data => {
        this.photos = data;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Error al cargar la galería';
        this.loading = false;
      }
    });
  }
}
