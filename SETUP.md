# Tanasvi Technologies - Project Setup Guide

This guide will help you set up the complete Tanasvi Technologies project with the new backend structure.

## 📁 Project Structure

```
tanasviproject/
├── 📁 backend/                 # Backend API (Node.js/Express)
│   ├── 📁 src/
│   │   ├── 📄 app.js           # Main application
│   │   ├── 📁 config/          # Configuration files
│   │   ├── 📁 routes/          # API routes
│   │   └── 📁 middleware/      # Custom middleware
│   ├── 📁 uploads/            # File uploads directory
│   ├── 📄 package.json        # Backend dependencies
│   ├── 📄 start.js            # Startup script
│   └── 📄 README.md           # Backend documentation
├── 📁 src/                     # Frontend (React/TypeScript)
├── 📄 package.json            # Frontend dependencies
└── 📄 README.md               # Main project documentation
```

## 🚀 Quick Start

### 1. Install Frontend Dependencies
```bash
npm install
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 3. Configure Backend Environment
```bash
cd backend
cp env.example .env
```

Edit the `.env` file with your email configuration:
```env
NODE_ENV=development
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
OWNER_EMAIL=info@tanasvi.com
```

### 4. Start Development Servers

#### Option A: Start Both Servers (Recommended)
```bash
npm run dev
```
This will start both frontend (port 3000) and backend (port 5000) servers.

#### Option B: Start Servers Separately
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm start
```

## 🔧 Configuration

### Backend Configuration

#### Email Setup (Gmail)
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and generate password
   - Use this password in `EMAIL_PASS`

#### CORS Configuration
The backend is configured to allow requests from:
- **Development**: `http://localhost:3000`, `http://localhost:3001`
- **Production**: `https://tanasvi.com`, `https://www.tanasvi.com`

### Frontend Configuration
The frontend is configured to proxy API requests to `http://localhost:5000` (see `package.json` proxy setting).

## 📡 API Endpoints

### Health Check
- **GET** `http://localhost:5000/health`

### Contact API
- **POST** `http://localhost:5000/api/contact/send`
- **GET** `http://localhost:5000/api/contact/status`

### Career API
- **POST** `http://localhost:5000/api/career/apply`
- **GET** `http://localhost:5000/api/career/status`
- **GET** `http://localhost:5000/api/career/positions`

## 🧪 Testing the Setup

### 1. Test Backend Health
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Tanasvi Technologies Backend API is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

### 2. Test Contact Form
```bash
curl -X POST http://localhost:5000/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'
```

### 3. Test Frontend
Open `http://localhost:3000` in your browser and test the contact form.

## 🔒 Security Features

### Backend Security
- **CORS Protection**: Configured for specific origins
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Comprehensive validation using express-validator
- **File Upload Security**: Type and size restrictions (5MB max)
- **Security Headers**: Helmet.js protection
- **Error Handling**: Secure error responses

### File Upload
- **Supported Formats**: PDF, DOC, DOCX
- **Maximum Size**: 5MB
- **Storage**: Local filesystem in `backend/uploads/`

## 📧 Email Features

### Contact Form
- Sends notification to company email
- Sends confirmation to user
- HTML email templates with company branding

### Career Applications
- Sends application to HR team with resume attachment
- Sends confirmation to applicant
- Professional email templates

## 🚨 Troubleshooting

### Common Issues

#### 1. Backend Won't Start
- Check if `.env` file exists in `backend/` directory
- Verify all required environment variables are set
- Check if port 5000 is available

#### 2. Email Not Working
- Verify Gmail app password is correct
- Check if 2-factor authentication is enabled
- Ensure `EMAIL_USER` and `EMAIL_PASS` are correct

#### 3. CORS Errors
- Check if frontend is running on `http://localhost:3000`
- Verify backend CORS configuration
- Check browser console for specific error messages

#### 4. File Upload Issues
- Check if `backend/uploads/` directory exists
- Verify file size is under 5MB
- Ensure file type is PDF, DOC, or DOCX

### Debug Mode
Set `NODE_ENV=development` in backend `.env` file for detailed error messages.

## 📊 Monitoring

### Health Checks
- Backend: `http://localhost:5000/health`
- Contact API: `http://localhost:5000/api/contact/status`
- Career API: `http://localhost:5000/api/career/status`

### Logs
- Backend logs are displayed in the terminal
- Request logging with Morgan middleware
- Error logging to console

## 🚀 Production Deployment

### Backend Deployment
1. Set `NODE_ENV=production`
2. Configure production email settings
3. Set up proper CORS origins
4. Configure file storage (consider cloud storage)
5. Set up monitoring and logging
6. Configure reverse proxy (nginx)
7. Set up SSL certificates

### Frontend Deployment
1. Run `npm run build`
2. Deploy the `build/` directory to your hosting service
3. Configure environment variables for production API URLs

## 📝 Development Workflow

### Making Changes
1. **Backend Changes**: Edit files in `backend/src/`
2. **Frontend Changes**: Edit files in `src/`
3. **Restart Servers**: Use `Ctrl+C` and restart with `npm run dev`

### Adding New API Endpoints
1. Create route file in `backend/src/routes/`
2. Import and use in `backend/src/app.js`
3. Update frontend to call new endpoints

### Adding New Dependencies
```bash
# Backend dependencies
cd backend
npm install package-name

# Frontend dependencies
npm install package-name
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For technical support or questions:
- Email: info@tanasvi.com
- Phone: +91-9392562193

## 📄 License

This project is licensed under the MIT License.
