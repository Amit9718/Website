# Amit Das Portfolio Website

A modern, responsive portfolio website with backend functionality for contact forms and CV downloads.

## Features

### Frontend
- Responsive design that works on all devices
- Smooth scrolling navigation
- Mobile-friendly hamburger menu
- Service filtering functionality
- Project showcase
- Contact form with validation
- CV download functionality

### Backend
- Express.js server
- Contact form email functionality
- CV download endpoint
- Portfolio data API
- Error handling and validation
- CORS enabled for cross-origin requests

## Bug Fixes Applied

1. **Fixed typo**: `downlodeBtn` → `downloadBtn`
2. **Fixed navigation links**: Removed extra spaces in href attributes
3. **Added proper form validation**: Email format validation and required field checks
4. **Enhanced mobile menu**: Added toggle functionality for mobile navigation
5. **Improved accessibility**: Added focus styles and proper form handling
6. **Added loading states**: Better UX during form submission and file downloads

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env` file and update with your email credentials
   - For Gmail, you'll need to generate an App Password:
     - Go to Google Account settings
     - Enable 2-factor authentication
     - Generate an App Password for this application
     - Use the App Password in the `.env` file

3. **Add your CV:**
   - Place your PDF resume in the `assets/` directory
   - Name it exactly `Amit_Das_CV.pdf`

4. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the website:**
   - Open your browser and go to `http://localhost:3000`

## Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=3000

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=your-contact-email@gmail.com

# Environment
NODE_ENV=development
```

## API Endpoints

- `GET /` - Serves the main portfolio page
- `POST /api/contact` - Handles contact form submissions
- `GET /api/download-cv` - Downloads the CV file
- `GET /api/portfolio` - Returns portfolio data in JSON format

## File Structure

```
├── assets/
│   ├── README.md
│   └── Amit_Das_CV.pdf (add your CV here)
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
├── .env
└── README.md
```

## Technologies Used

### Frontend
- HTML5
- CSS3 (with responsive design)
- Vanilla JavaScript
- RemixIcon for icons

### Backend
- Node.js
- Express.js
- Nodemailer (for email functionality)
- CORS
- dotenv

## Deployment

For production deployment:

1. Set `NODE_ENV=production` in your environment
2. Configure your email service properly
3. Ensure all environment variables are set
4. Use a process manager like PM2 for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this code for your own portfolio!

## Contact

For any questions or issues, please use the contact form on the website or reach out directly.