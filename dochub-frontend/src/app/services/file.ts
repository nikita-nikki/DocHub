import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  File as FileModel,
  FileUploadResponse,
  SummaryRequest,
  SummaryResponse,
} from '../models/file.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private readonly API_URL = 'http://localhost:3000/api/files';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<FileUploadResponse>(`${this.API_URL}/upload`, formData, {
      withCredentials: true,
    });
  }

  getFiles(): Observable<FileModel[]> {
    console.log('Making request to:', `${this.API_URL}`);
    return this.http
      .get<any>(`${this.API_URL}`, {
        withCredentials: true,
      })
      .pipe(
        map((response) => {
          console.log('Raw files response:', response);
          if (response && response.data) {
            console.log('Files found:', response.data.length);
            return response.data;
          } else {
            console.log('No data in response');
            return [];
          }
        })
      );
  }

  generateSummary(fileId: string, length: string): Observable<SummaryResponse> {
    return this.http.post<SummaryResponse>(
      `${this.API_URL}/summary/${fileId}`,
      { length },
      {
        withCredentials: true,
      }
    );
  }
}
