pipeline {
    agent any

    environment {
        DOCKERHUB = credentials('dockerhub')
        BACKEND_IMAGE = "mdrana/todoapp-backend"
        FRONTEND_IMAGE = "mdrana/todoapp-frontend"
        APP_VERSION = "v${env.BUILD_NUMBER}"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Danyal-Rana/Web-for-DevOps.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE:$APP_VERSION ./server'
                sh 'docker tag $BACKEND_IMAGE:$APP_VERSION $BACKEND_IMAGE:latest'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t $FRONTEND_IMAGE:$APP_VERSION --build-arg VITE_API_URL=/api ./client'
                sh 'docker tag $FRONTEND_IMAGE:$APP_VERSION $FRONTEND_IMAGE:latest'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                sh 'echo $DOCKERHUB_PSW | docker login -u $DOCKERHUB_USR --password-stdin'
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                sh 'docker push $BACKEND_IMAGE:$APP_VERSION'
                sh 'docker push $BACKEND_IMAGE:latest'
                sh 'docker push $FRONTEND_IMAGE:$APP_VERSION'
                sh 'docker push $FRONTEND_IMAGE:latest'
            }
        }

        stage('Deploy on Jenkins EC2') {
            steps {
                sh '''
                echo "🔍 Switching to Jenkins workspace..."
                cd $WORKSPACE

                echo "🔄 Pulling latest images..."
                docker compose pull

                echo "⬇️  Stopping old containers..."
                docker compose down || true

                echo "🚀 Starting updated containers..."
                docker compose up -d
                '''
            }
        }
    }
}