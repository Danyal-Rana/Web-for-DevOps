# TodoApp - MERN Stack Application

A modern, full-stack todo application built with the MERN stack (MongoDB, Express.js, React, Node.js) designed for DevOps practice and learning.

## Features

### Backend (API)
- **Authentication**: JWT-based user registration and login
- **Task Management**: Full CRUD operations for tasks
- **User Security**: Password hashing with bcryptjs
- **Data Validation**: Input validation and sanitization
- **Rate Limiting**: API rate limiting for security
- **Error Handling**: Comprehensive error handling and logging
- **Database**: MongoDB with Mongoose ODM

### Frontend (React)
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **User Authentication**: Login/Register with form validation
- **Task Management**: Create, read, update, delete tasks
- **Task Features**: Priority levels, due dates, completion status
- **Real-time Updates**: Instant UI updates after actions
- **Search & Filter**: Filter by status, priority, and search functionality
- **Statistics**: Dashboard with task statistics
- **Mobile Responsive**: Works on all screen sizes

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- helmet (security)
- cors
- dotenv

### Frontend
- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- React Toastify
- Lucide React (icons)
- date-fns (date utilities)

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context providers
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # CSS files
│   ├── public/            # Static assets
│   ├── Dockerfile         # Frontend container configuration
│   ├── nginx.conf         # Nginx configuration for production
│   ├── .env.production    # Production environment variables
│   └── package.json       # Frontend dependencies
│
├── server/                # Backend Node.js application
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   ├── Dockerfile         # Backend container configuration
│   ├── .env.production    # Production environment variables
│   └── package.json      # Backend dependencies
│
├── docker-compose.yml     # Multi-container orchestration
├── .dockerignore         # Files to exclude from Docker build
├── DOCKER_README.md      # Docker deployment documentation
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Web-for-DevOps
```

### 2. Backend Setup
```bash
cd server
npm install
```

### 3. Frontend Setup
```bash
cd client
npm install
```

### 4. Environment Configuration
Create environment files for both frontend and backend:

#### Backend (.env.backend)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://admin:password123@mongodb:27017/todoapp?authSource=admin
JWT_SECRET=your_super_secret_jwt_key_here_make_it_very_long_and_random
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env.frontend)
```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Database Setup
Make sure MongoDB is running on your system or set up MongoDB Atlas and update the MONGODB_URI in your .env file.

## Running the Application

### Development Mode

#### Start Backend Server
```bash
cd server
npm run dev
```
The backend will run on http://localhost:5000

#### Start Frontend Development Server
```bash
cd client
npm run dev
```
The frontend will run on http://localhost:3000

### Production Build

#### Build Frontend
```bash
cd client
npm run build
```

#### Start Backend in Production
```bash
cd server
npm start
```

## Docker Deployment

For containerized deployment using Docker and Docker Compose, see the [Docker Deployment Guide](DOCKER_README.md).

### Quick Docker Start
```bash
# Build and start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks
- `GET /api/tasks` - Get all tasks (protected)
- `GET /api/tasks/stats` - Get task statistics (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

## Features in Detail

### User Authentication
- Secure user registration and login
- JWT token-based authentication
- Protected routes and API endpoints
- Password hashing with bcryptjs

### Task Management
- Create tasks with title, description, priority, and due date
- Update task details and completion status
- Delete tasks
- Filter tasks by completion status and priority
- Sort tasks by date created, due date, or priority
- Search tasks by title and description

### User Interface
- Clean, modern design with Tailwind CSS
- Responsive layout for all devices
- Real-time notifications with toast messages
- Loading states and error handling
- Intuitive task management interface

## Security Features

- JWT token authentication
- Password hashing
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Helmet.js for security headers
- Environment variable protection

## DevOps Ready

This application is designed with DevOps practices in mind:
- **Containerization**: Docker support with multi-stage builds for optimized images
- **Orchestration**: Docker Compose for multi-container application management
- **Persistent Storage**: MongoDB data persistence with Docker volumes
- **Health Checks**: Automatic health monitoring for all services
- **Environment Management**: Separate environment configurations for development and production
- **Security**: Non-root user execution, security headers, and network isolation
- **Scalability**: Service-based architecture ready for horizontal scaling
- **CI/CD Pipeline Friendly**: Proper .gitignore, build scripts, and containerization
- **Monitoring Ready**: Health check endpoints and logging infrastructure

## License

MIT License - feel free to use this project for learning and practice!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Happy Learning! 🚀**