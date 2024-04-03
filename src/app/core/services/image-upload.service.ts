import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private baseUrl = 'http://localhost:8080/api/v1/images';

  constructor(private http: HttpClient) {
  }

  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  searchImages(query: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/search?query=${query}`);
  }
}
