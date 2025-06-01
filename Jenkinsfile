pipeline {
    agent any

    // triggers {
    //     cron('H/5 * * * *') //runs every 5 minutes
    // }

    environment {
        DOCKER_REGISTRY = 'docker.io/s225255856'
        IMAGE_NAME = '73hd-image'
        VERSION = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/s225255856/WebProjectSIT725-for-SIT753-7.3HD.git'
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        //BUILD STAGE

        stage('Cleanup Old Logs') { //clean up logs
            steps {
                sh 'rm -rf /var/lib/docker/containers/*/*-json.log'
                echo 'Old logs cleaned up!'
            }
        }
        stage('Build') { //build image
            steps {
                sh 'docker build -t ${IMAGE_NAME}:${VERSION} .'
                echo 'build'
            }
        }
        stage('Test image') {
            steps {
                sh 'docker run -p 3000:3000 ${IMAGE_NAME}:${VERSION} .'
            }
        }
        stage('Push to Registry') {
            steps {
                withDockerRegistry([credentialsId: 'docker-credentials', url: 'https://index.docker.io/v1/']) {
                    sh 'docker tag ${IMAGE_NAME}:${VERSION} ${DOCKER_REGISTRY}/${IMAGE_NAME}:${VERSION}'
                    sh 'docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${VERSION}'
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                sh 'docker system prune -f'
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