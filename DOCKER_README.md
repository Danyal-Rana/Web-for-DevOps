# Docker Deployment Guide

This guide explains how to containerize and deploy the MERN Todo Application using Docker and Docker Compose.

## Prerequisites

- Docker installed on your system
- Docker Compose installed
- Git (to clone the repository)
- Environment files configured (see below)

## Environment Setup

Before running the application, ensure you have the following environment files in the root directory:

### .env.backend (Backend Configuration)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://admin:password123@mongodb:27017/todoapp?authSource=admin
JWT_SECRET=your_super_secret_jwt_key_here_make_it_very_long_and_random
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
```

### .env.frontend (Frontend Configuration)
```env
VITE_API_URL=http://localhost:5000/api
```

## Project Structure

```
Web-for-DevOps/
├── client/                 # React Frontend
│   ├── Dockerfile         # Frontend container configuration
│   ├── nginx.conf         # Nginx configuration for serving React app
│   └── .env.production    # Production environment variables
├── server/                # Node.js Backend
│   ├── Dockerfile         # Backend container configuration
│   └── .env.production    # Production environment variables
├── docker-compose.yml     # Multi-container orchestration
├── .dockerignore         # Files to exclude from Docker build
└── README.md             # This file
```

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Web-for-DevOps
   ```

2. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

## Docker Services

### 1. MongoDB (Database)
- **Image:** mongo:7-jammy
- **Port:** 27017
- **Volume:** `mongodb_data` for data persistence
- **Authentication:** Enabled with admin user

### 2. Backend (API Server)
- **Base Image:** node:18-alpine
- **Port:** 5000
- **Environment:** Production configuration
- **Health Check:** Automatic health monitoring

### 3. Frontend (React App)
- **Build Process:** Multi-stage build (Node.js → Nginx)
- **Port:** 3000 (maps to container port 80)
- **Reverse Proxy:** Nginx handles API routing

## Docker Commands

### Development
```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb
```

### Production Deployment
```bash
# Build and start
docker-compose up --build -d

# Scale services (if needed)
docker-compose up -d --scale backend=3

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Maintenance
```bash
# Rebuild specific service
docker-compose build backend

# Restart specific service
docker-compose restart backend

# View running containers
docker-compose ps

# Execute commands in running container
docker-compose exec backend sh
docker-compose exec mongodb mongosh
```

## Environment Configuration

### Backend Environment Variables
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://admin:password123@mongodb:27017/todoapp?authSource=admin
JWT_SECRET=your_super_secret_jwt_key_here_make_it_very_long_and_random
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost
```

### Frontend Environment Variables
```env
VITE_API_URL=http://localhost:5000/api
```

## Data Persistence

The MongoDB container uses a named volume `mongodb_data` to persist data:

```yaml
volumes:
  mongodb_data:
    driver: local
```

This ensures that your todo data survives container restarts and updates.

## Networking

All services communicate through a custom bridge network `todoapp-network`:

- **backend** can access **mongodb** via `mongodb:27017`
- **frontend** proxies API calls to **backend** via `backend:5000`
- External access through mapped ports

## Health Checks

- **Backend:** HTTP health check on `/api/health`
- **Frontend:** HTTP check on root path
- **MongoDB:** MongoDB ping command

## Security Features

- Non-root user execution in containers
- Security headers in Nginx configuration
- Environment variable protection
- Network isolation between services

## AWS EC2 Deployment

### Prerequisites
- AWS account with EC2 access
- Security group allowing ports 22, 80, 3000, 5000
- Key pair for SSH access

### Deployment Steps

1. **Launch EC2 Instance:**
   ```bash
   # Ubuntu 22.04 LTS recommended
   # t2.micro or t3.micro for development
   # t2.small or larger for production
   ```

2. **Connect to EC2:**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Docker on EC2:**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker ubuntu

   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose

   # Logout and login again for group changes
   exit
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

4. **Deploy Application:**
   ```bash
   # Clone repository
   git clone <your-repo-url>
   cd Web-for-DevOps

   # Start application
   docker-compose up --build -d

   # Check status
   docker-compose ps
   docker-compose logs
   ```

5. **Access Application:**
   - Frontend: http://your-instance-ip:3000
   - Backend API: http://your-instance-ip:5000

## Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check what's using the port
   sudo lsof -i :3000
   sudo lsof -i :5000

   # Stop conflicting services or change ports in docker-compose.yml
   ```

2. **MongoDB connection issues:**
   ```bash
   # Check MongoDB logs
   docker-compose logs mongodb

   # Verify MongoDB is healthy
   docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')"
   ```

3. **Build failures:**
   ```bash
   # Clear Docker cache
   docker system prune -f

   # Rebuild without cache
   docker-compose build --no-cache
   ```

4. **Permission issues:**
   ```bash
   # Check Docker permissions
   docker run hello-world

   # Add user to docker group (if needed)
   sudo usermod -aG docker $USER
   ```

### Monitoring

```bash
# View resource usage
docker stats

# Monitor logs in real-time
docker-compose logs -f

# Check container health
docker-compose ps
docker inspect <container-name>
```

## Production Considerations

1. **SSL/TLS:** Use AWS Certificate Manager or Let's Encrypt
2. **Load Balancing:** AWS ALB or Nginx reverse proxy
3. **Database:** Consider AWS DocumentDB for managed MongoDB
4. **Monitoring:** AWS CloudWatch or Prometheus/Grafana
5. **Backup:** Regular database backups to S3
6. **Security:** AWS Security Groups, IAM roles, VPC configuration

## Support

For issues with Docker deployment:
1. Check container logs: `docker-compose logs`
2. Verify environment variables
3. Ensure ports are not conflicting
4. Check network connectivity between containers

---

**Happy Containerizing! 🐳**