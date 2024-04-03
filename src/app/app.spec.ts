import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ImageUploadService } from './core/services/image-upload.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockImageUploadService: jasmine.SpyObj<ImageUploadService>;

  beforeEach(async () => {
    mockImageUploadService = jasmine.createSpyObj('ImageUploadService', ['uploadImage', 'searchImages']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: ImageUploadService, useValue: mockImageUploadService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.selectedFile).toBeNull();
    expect(component.searchQuery).toBe('');
    expect(component.imageUrls).toEqual([]);
  });

  it('should set selectedFile when onFileSelected is called', () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const event = {
      target: {
        files: [file]
      }
    };

    component.onFileSelected(event as any);
    expect(component.selectedFile).toBe(file);
  });

  it('should call uploadImage method when uploadImage is called with selectedFile', () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    component.selectedFile = file;

    mockImageUploadService.uploadImage.and.returnValue(of('Success'));

    component.uploadImage();

    expect(mockImageUploadService.uploadImage).toHaveBeenCalledWith(file);
  });

  it('should call searchImages method when searchImages is called with searchQuery', () => {
    component.searchQuery = 'test';

    const mockImageUrls = ['url1', 'url2'];
    mockImageUploadService.searchImages.and.returnValue(of(mockImageUrls));

    component.searchImages();

    expect(mockImageUploadService.searchImages).toHaveBeenCalledWith('test');
    expect(component.imageUrls).toEqual(mockImageUrls);
  });
});
