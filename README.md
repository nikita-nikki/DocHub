# DocHub

*A one-sentence pitch of your project.*  
DocHub is a smart tool that extracts text from PDFs or images and generates concise summaries.

## Deployed URL

You can access the live project here: https://dochub-iups.onrender.com/

## Description

DocHub simplifies the process of reading lengthy documents by combining **OCR (Optical Character Recognition)** and **automatic text summarization**.  
Users can upload PDFs or image files, and the system extracts the text content, then generates a clear and concise summary.  

This tool is particularly useful for:  
- Students preparing notes from books, scanned pages, or research papers.  
- Professionals who need to review long reports quickly.  
- Anyone looking to save time by reading the “essence” of documents instead of going through the entire text.  

## Features

- **PDF & Image Support:** Upload files in PDF or image formats.  
- **Text Extraction:** OCR extracts text from scanned pages or images.  
- **Smart Summarization:** Generates concise summaries of extracted text.  
- **User-Friendly Interface:** Simple upload and summary viewing process.  

## Technologies Used

- **Frontend:** React  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **OCR:** Tesseract.js  
- **Summarization:** NLP-based text summarizer (e.g., Hugging Face Transformers / custom model)  
- **Deployment:** Docker, AWS  

## Installation

Follow these steps to get a development environment running:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/nikita-nikki/DocHub.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd DocHub
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Set up environment variables:**  
   Create a `.env` file in the `server` directory and add the following:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

5. **Run the application:**
    ```bash
    # Run the backend server
    npm start
    ```

## Usage

1. Open the deployed app using the link above.  
2. Upload a **PDF file** or an **image file** containing text.  
3. The system will automatically **extract text** from the uploaded file.  
4. Once processed, a **summary** of the extracted content will be displayed.  
5. Copy, download, or use the summary for quick reference.  

## Contributing

1. Fork the repository.  
2. Create a new branch: `git checkout -b feature/your-feature-name`  
3. Make your changes.  
4. Commit your changes: `git commit -m 'Add some feature'`  
5. Push to the branch: `git push origin feature/your-feature-name`  
6. Open a pull request.  

## License

This project is licensed under the [MIT License](LICENSE).

