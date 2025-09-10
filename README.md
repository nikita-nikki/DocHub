# DocHub

*A one-sentence pitch of your project.*  
For example: "DocHub is a collaborative platform for real-time document editing and sharing."

## Description

Provide a more detailed overview of your project. Explain the problem it solves and who the target audience is. What makes your project stand out?

## Features

- **Real-time Collaboration:** Multiple users can edit the same document simultaneously.  
- **Rich Text Formatting:** A full-featured editor with various formatting options.  
- **Version History:** Track changes and revert to previous versions of a document.  
- **Secure Sharing:** Share documents with specific users or create public links.  


## Technologies Used

- **Frontend:** React, Redux, Slate.js  
- **Backend:** Node.js, Express.js, Socket.IO  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
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

3. **Install  dependencies:**
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

Showcase how to use your application. You can include screenshots, GIFs, or code snippets to demonstrate key functionalities.

## Contributing

1. Fork the repository.  
2. Create a new branch: `git checkout -b feature/your-feature-name`  
3. Make your changes.  
4. Commit your changes: `git commit -m 'Add some feature'`  
5. Push to the branch: `git push origin feature/your-feature-name`  
6. Open a pull request.  

## License

This project is licensed under the [MIT License](LICENSE).
