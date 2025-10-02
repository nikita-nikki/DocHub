export interface File {
  _id: string;
  url: string;
  filetype: string;
  extractedText: string;
  summary?: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface FileUploadResponse {
  success: boolean;
  message: string;
  data: File;
}

export interface SummaryRequest {
  length: 'short' | 'medium' | 'long';
}

export interface SummaryResponse {
  success: boolean;
  message: string;
  data: string;
}
