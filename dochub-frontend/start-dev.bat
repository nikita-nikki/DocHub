@echo off
echo Starting DocHub Frontend Development Server...
echo.
echo Make sure your backend is running on http://localhost:3000
echo.
echo The application will open at http://localhost:4200
echo.
echo Authentication Flow:
echo - If you're logged in, you'll be redirected to /dashboard
echo - If you're not logged in, you'll be redirected to /login
echo.
ng serve --open
pause
