import {Component} from '@angular/core';
import {ImageUploadService} from './core/services/image-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedFile: File | null = null;
  searchQuery: string = '';
  imageUrls: string[] = [];
  errorMessage: string = '';
  isUploading: boolean = false;
  progressPercentage: number = 0;

  constructor(private imageService: ImageUploadService) {
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadImage(): void {
    if (this.selectedFile) {
      this.isUploading = true;
      this.imageService.uploadImage(this.selectedFile).subscribe(
        response => {
          console.log('Image uploaded successfully:', response);
          this.isUploading = false;
          this.progressPercentage = 100;
          alert('Image uploaded successfully!');
        },
        error => {
          console.error('Error uploading image:', error);
          this.isUploading = false;
          this.progressPercentage = 0;
        }
      );
    }
  }

  searchImages(): void {
    this.imageService.searchImages(this.searchQuery).subscribe(
      data => {
        this.imageUrls = data;
        if (this.imageUrls.length === 0) {
          this.errorMessage = `Oops, we cannot find images with object - ${this.searchQuery}.`;
        } else {
          this.errorMessage = '';
        }
      },
      error => {
        console.error('Error searching images:', error);
        this.errorMessage = 'Error searching images. Please try again later.';
      }
    );
  }
}
