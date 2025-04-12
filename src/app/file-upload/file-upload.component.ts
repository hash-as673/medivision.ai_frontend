import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  prediction: string | null = null;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(event: Event): void {
    event.preventDefault();
    if (!this.selectedFile) return;
  
    const formData = new FormData();
    formData.append('file', this.selectedFile);
  
    this.http.post<any>('http://localhost:8080/api/upload', formData).subscribe({
      next: (response) => {
        console.log('Response from backend:', response); // Debugging log
        if (response && response.prediction) {
          this.prediction = response.prediction; // Extract and display prediction
          this.error = null;
        } else {
          this.error = 'Unexpected response from the server.';
          this.prediction = null;
        }
      },
      error: (err) => {
        console.error('Error during file upload:', err); // Debugging log
        this.error = 'Failed to upload image or process the prediction.';
        this.prediction = null;
      }
    });
  }
}