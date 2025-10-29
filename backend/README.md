# Tanasvi Technologies Backend API

A robust Node.js backend API for the Tanasvi Technologies website, handling contact forms, career applications, and email services.

## 🚀 Features

- **Contact Form API** - Handle contact form submissions with email notifications
- **Career Application API** - Process job applications with resume uploads
- **Email Service** - Automated email notifications and confirmations
- **File Upload** - Secure resume file handling (PDF, DOC, DOCX)
- **CORS Configuration** - Proper cross-origin resource sharing setup
- **Rate Limiting** - API protection against abuse
- **Input Validation** - Comprehensive data validation
- **Security Headers** - Helmet.js security middleware
- **Error Handling** - Global error handling and logging

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js              # Main application entry point
│   ├── config/
│   │   ├── cors.js         # CORS configuration
│   │   └── email.js        # Email service configuration
│   ├── routes/
│   │   ├── contact.js      # Contact form routes
│   │   └── career.js       # Career application routes
│   └── middleware/         # Custom middleware (future)
├── uploads/                # File upload directory
├── package.json           # Dependencies and scripts
├── env.example            # Environment variables template
└── README.md              # This file
```

## 🛠️ Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
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

## 🚀 Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Health Check
- **GET** `/health` - Server health status

### Contact API
- **POST** `/api/contact/send` - Submit contact form
- **GET** `/api/contact/status` - Contact service status

### Career API
- **POST** `/api/career/apply` - Submit job application
- **GET** `/api/career/status` - Career service status
- **GET** `/api/career/positions` - Available job positions

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the app password in `EMAIL_PASS`

### Email Templates
- **Contact Notification** - Sent to company when contact form is submitted
- **Contact Confirmation** - Sent to user confirming their message
- **Career Notification** - Sent to HR team with application details
- **Career Confirmation** - Sent to applicant confirming application

## 🔒 Security Features

- **CORS Protection** - Configured for specific origins
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **Input Validation** - Comprehensive validation using express-validator
- **File Upload Security** - Type and size restrictions
- **Security Headers** - Helmet.js protection
- **Error Handling** - Secure error responses

## 📁 File Upload

### Supported Formats
- PDF (.pdf)
- Microsoft Word (.doc, .docx)

### File Limits
- Maximum size: 5MB
- Storage: Local filesystem in `uploads/` directory
- Naming: Unique timestamp-based filenames

## 🌐 CORS Configuration

### Development
- `http://localhost:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:3001`

### Production
- `https://tanasvi.com`
- `https://www.tanasvi.com`

## 📊 Monitoring

### Health Check
```bash
curl http://localhost:5000/health
```

### Service Status
```bash
curl http://localhost:5000/api/contact/status
curl http://localhost:5000/api/career/status
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `EMAIL_HOST` | SMTP host | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port | `587` |
| `EMAIL_SECURE` | Use SSL | `false` |
| `EMAIL_USER` | Email username | Required |
| `EMAIL_PASS` | Email password | Required |
| `OWNER_EMAIL` | Company email | Required |

## 🚨 Error Handling

The API provides detailed error responses:

```json
{
  "error": "Error Type",
  "message": "Human-readable error message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Common Error Codes
- `400` - Bad Request (validation errors)
- `403` - Forbidden (CORS errors)
- `413` - Payload Too Large (file size)
- `429` - Too Many Requests (rate limiting)
- `500` - Internal Server Error
- `503` - Service Unavailable (email service)

## 🧪 Testing

### Manual Testing
```bash
# Health check
curl http://localhost:5000/health

# Contact form
curl -X POST http://localhost:5000/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'
```

## 📝 Logs

The server logs all requests and errors:
- Request logging with Morgan
- Error logging to console
- Email service status logging

## 🔄 Deployment

### Production Checklist
1. Set `NODE_ENV=production`
2. Configure production email settings
3. Set up proper CORS origins
4. Configure file storage (consider cloud storage)
5. Set up monitoring and logging
6. Configure reverse proxy (nginx)
7. Set up SSL certificates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For technical support or questions:
- Email: info@tanasvi.com
- Phone: +91-9392562193
