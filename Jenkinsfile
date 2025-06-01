pipeline {
    agent any

    // triggers {
    //     cron('H/5 * * * *') //runs every 5 minutes
    // }

    environment {
        DOCKER_REGISTRY = 'docker.io/s225255856'
        IMAGE_NAME = '73hd-image'
        VERSION = "${BUILD_NUMBER}"
        GOOGLE_CLIENT_ID=credentials('GOOGLE_CLIENT_ID') //get GOOGLE_CLIENT_ID
        GOOGLE_CLIENT_SECRET=credentials('GOOGLE_CLIENT_SECRET') //get GOOGLE_CLIENT_SECRET
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/s225255856/WebProjectSIT725-for-SIT753-7.3HD.git'
            }
        }
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        //BUILD STAGE

        // stage('Cleanup Old Logs') { //clean up logs
        //     steps {
        //         bat 'del /F /Q C:\\Program File\\Docker\\containers\\*.log'
        //         echo 'Old logs cleaned up!'
        //     }
        // }
        stage('Build') { //build image
            steps {
                bat 'docker build --build-arg GOOGLE_CLIENT_ID=%GOOGLE_CLIENT_ID% -t %IMAGE_NAME%:%VERSION% .'
                echo 'build'
            }
        }
        stage('Test image') {
            steps {
                bat 'docker run --rm %IMAGE_NAME%:%VERSION%'
            }
        }
        stage('Push to Registry') { //save
            steps {
                withDockerRegistry([credentialsId: 'docker-credentials', url: 'https://index.docker.io/v1/']) {
                    bat 'docker tag %IMAGE_NAME%:%VERSION% %DOCKER_REGISTRY%/%IMAGE_NAME%:%VERSION%'
                    bat 'docker push %DOCKER_REGISTRY%/%IMAGE_NAME%:%VERSION%'
                }
            }
        }
        stage('Deploy with Docker Compose') { //docker compose
            steps {
                bat 'docker-compose up -d'
            }
        }
        stage('Clean up unused image') { //remove unused docker image
            steps {
                bat 'docker system prune -f'
                echo 'Unused images cleaned!'
            }
        }

        //TEST STAGE 

        stage('Test') {
            steps {
                echo 'test'
            }
        }

        //CODE QUALITY STAGE
        stage('Code Quality') {
            steps {
                echo 'code quality'
            }
        }

        //SECURITY STAGE 

        stage('Security') { 
            steps {
                echo 'security'
            }
        }

        //DEPLOY STAGE 

        stage('Deploy') {
            steps {
                echo 'deploy'
            }
        }

        //RELEASE STAGE

        stage('Release') {
            steps {
                echo 'release'
            }
        }

        //MONITORING STAGE

        stage('Monitoring') {
            steps {
                echo 'monitoring'
            }
        }
    }
}