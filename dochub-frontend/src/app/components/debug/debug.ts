import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileService } from '../../services/file';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="debug-container">
      <h2>Debug Information</h2>

      <div class="debug-section">
        <h3>Authentication Status</h3>
        <p>User: {{ user ? user.name : 'Not logged in' }}</p>
        <p>User ID: {{ user ? user._id : 'N/A' }}</p>
      </div>

      <div class="debug-section">
        <h3>Files API Test</h3>
        <button (click)="testFilesAPI()" [disabled]="isLoading">
          {{ isLoading ? 'Loading...' : 'Test Files API' }}
        </button>
        <div *ngIf="files.length > 0">
          <h4>Files Found ({{ files.length }}):</h4>
          <ul>
            <li *ngFor="let file of files">
              ID: {{ file._id }}<br />
              URL: {{ file.url }}<br />
              Type: {{ file.filetype }}<br />
              Created: {{ file.createdAt }}
            </li>
          </ul>
        </div>
        <div *ngIf="errorMessage">
          <p style="color: red;">Error: {{ errorMessage }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .debug-container {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      }

      .debug-section {
        margin-bottom: 30px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
      }

      button {
        padding: 10px 20px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      button:disabled {
        background: #ccc;
        cursor: not-allowed;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      li {
        margin-bottom: 15px;
        padding: 10px;
        background: #f8f9fa;
        border-radius: 4px;
      }
    `,
  ],
})
export class Debug implements OnInit {
  user: any = null;
  files: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private fileService: FileService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  testFilesAPI(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.files = [];

    console.log('Testing files API...');
    this.fileService.getFiles().subscribe({
      next: (files) => {
        console.log('Debug - Files received:', files);
        this.files = files;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Debug - Error:', error);
        this.errorMessage = error.message || 'Unknown error';
        this.isLoading = false;
      },
    });
  }
}
