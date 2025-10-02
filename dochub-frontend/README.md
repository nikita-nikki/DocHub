# DocHub Frontend - Angular Application

A modern Angular frontend for the DocHub document management system with AI-powered summarization.

## Features

- 🔐 **Authentication**: Login and registration with JWT tokens
- 📁 **File Upload**: Drag & drop file upload with support for PDF, PNG, JPG, JPEG
- 🤖 **AI Summarization**: Generate short, medium, or long summaries of documents
- 📱 **Responsive Design**: Modern, mobile-friendly interface
- 🎨 **Beautiful UI**: Clean, professional design with smooth animations

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

## Installation

1. Navigate to the project directory:

   ```bash
   cd dochub-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── components/          # Angular components
│   │   ├── login/          # Login component
│   │   ├── register/       # Registration component
│   │   ├── dashboard/      # Main dashboard
│   │   └── summary/        # Summary display
│   ├── services/           # Angular services
│   │   ├── auth.ts        # Authentication service
│   │   └── file.ts        # File management service
│   ├── models/             # TypeScript interfaces
│   │   ├── user.model.ts  # User-related models
│   │   └── file.model.ts  # File-related models
│   ├── app.routes.ts      # Application routing
│   └── app.config.ts      # App configuration
└── styles.scss            # Global styles
```

## API Integration

The frontend connects to your existing Node.js backend at `http://localhost:3000`. Make sure your backend is running before starting the Angular application.

### Backend Endpoints Used:

- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration
- `POST /api/users/logout` - User logout
- `GET /api/users/current` - Get current user
- `POST /api/files/upload` - Upload file
- `GET /api/files` - Get user files
- `POST /api/files/summary/:fileId` - Generate summary

## Features Overview

### Authentication

- Secure login and registration forms
- JWT token management
- Automatic redirects based on authentication status

### File Management

- Drag & drop file upload
- Support for multiple file types (PDF, PNG, JPG, JPEG)
- File listing with metadata
- Direct file access via URLs

### AI Summarization

- Three summary length options (short, medium, long)
- Beautiful summary display with scrollable content
- Loading states and error handling

### UI/UX Features

- Responsive design for all screen sizes
- Smooth animations and transitions
- Modern gradient backgrounds
- Professional color scheme
- Loading spinners and progress indicators
- Error and success messages

## Development

### Adding New Features

1. Create components in `src/app/components/`
2. Add services in `src/app/services/`
3. Define models in `src/app/models/`
4. Update routing in `src/app/app.routes.ts`

### Styling

- Global styles in `src/styles.scss`
- Component-specific styles in `*.scss` files
- Uses SCSS for enhanced CSS features
- Responsive design with mobile-first approach

## Build for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Testing

```bash
ng test
```

## Deployment

The application can be deployed to any static hosting service like:

- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

Make sure to update the API URL in the services if deploying to a different domain.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
