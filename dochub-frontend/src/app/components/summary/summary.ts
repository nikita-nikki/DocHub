import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FileService } from '../../services/file';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './summary.html',
  styleUrl: './summary.scss',
})
export class Summary implements OnInit {
  fileId: string = '';
  summary: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.fileId = this.route.snapshot.paramMap.get('fileId') || '';
    this.loadSummary();
  }

  loadSummary(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    // Fetch the summary from the backend
    this.fileService.generateSummary(this.fileId, 'medium').subscribe({
      next: (response) => {
        console.log('Summary response:', response);
        if (response.success) {
          this.summary = response.data;
          this.isLoading = false;
        } else {
          this.errorMessage = response.message || 'Failed to generate summary';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error generating summary:', error);
        this.errorMessage = error.error?.message || 'Failed to generate summary';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
