import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FileService } from '../../services/file';
import { File } from '../../models/file.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  user: any = null;
  files: File[] = [];
  isLoading: boolean = false;
  isUploading: boolean = false;
  selectedFile: any = null;
  dragOver: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private fileService: FileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Dashboard initializing...');
    this.authService.currentUser$.subscribe((user) => {
      console.log('Current user in dashboard:', user);
      this.user = user;
      if (user) {
        console.log('User authenticated, loading files...');
        this.loadFiles();
      } else {
        console.log('No user, redirecting to login...');
        this.router.navigate(['/login']);
      }
    });
  }

  loadFiles(): void {
    console.log('Loading files...');
    this.isLoading = true;
    this.fileService.getFiles().subscribe({
      next: (files) => {
        console.log('Files received in dashboard:', files);
        this.files = files;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading files:', error);
        this.errorMessage = 'Failed to load files';
        this.isLoading = false;
      },
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadFile();
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this.uploadFile();
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) return;

    this.isUploading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.fileService.uploadFile(this.selectedFile).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = 'File uploaded successfully!';
          this.loadFiles();
          this.selectedFile = null;
        } else {
          this.errorMessage = response.message || 'Upload failed';
        }
        this.isUploading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Upload failed';
        this.isUploading = false;
      },
    });
  }

  generateSummary(fileId: string, length: string): void {
    this.fileService.generateSummary(fileId, length).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/summary', fileId]);
        } else {
          this.errorMessage = response.message || 'Failed to generate summary';
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to generate summary';
      },
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.router.navigate(['/login']);
      },
    });
  }

  getFileName(url: string): string {
    return url.split('/').pop() || 'Unknown file';
  }
}
