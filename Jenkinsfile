pipeline {
    agent any

    // triggers {
    //     cron('H/5 * * * *') //runs every 5 minutes
    // }

    environment {
        //for docker
        DOCKER_REGISTRY = 'docker.io/s225255856'
        IMAGE_NAME = '73hd-image'
        VERSION = "${BUILD_NUMBER}"

        //for authentication
        MONGO_URI=credentials('MONGO_URI')
        JWT_SECRET=credentials('JWT_SECRET')
        GOOGLE_CLIENT_ID=credentials('GOOGLE_CLIENT_ID') 
        GOOGLE_CLIENT_SECRET=credentials('GOOGLE_CLIENT_SECRET') 

        //for sonarqube
        SONARQUBE_URL = 'http;//localhost:9000'
        SONARQUBE_TOKEN=credentials('SONARQUBE_TOKEN') 

        //me
        USERNAME = 'Alex'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/s225255856/WebProjectSIT725-for-SIT753-7.3HD.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        //BUILD STAGE

        stage('Cleanup Old Logs') { //clean up logs
            steps {
                bat 'del /F /Q C:\\Users\\%USERNAME%\\AppData\\Local\\Docker\\log\\*.log'
                bat 'del /F /Q C:\\Users\\%USERNAME%\\AppData\\Local\\Docker\\log\\host\\*.log'
                echo 'Old logs cleaned up!'
            }
        }
        stage('Build and tag image') { //build image 
            steps {
                bat 'docker build --build-arg VERSION=%VERSION% -t %DOCKER_REGISTRY%/%IMAGE_NAME%:%VERSION% .'
                echo 'build'
            }
        }
        // stage('Test image') {
        //     steps {
        //         bat 'docker run -e GOOGLE_CLIENT_ID=%GOOGLE_CLIENT_ID% %IMAGE_NAME%:%VERSION%'
        //     }
        // }
        stage('Push to Registry') { //save
            steps {
                //withDockerRegistry([credentialsId: 'DOCKER_CRED', url: 'https://index.docker.io/v1/']) {
                    //bat 'docker tag %IMAGE_NAME%:%VERSION% %DOCKER_REGISTRY%/%IMAGE_NAME%:%VERSION%'
                    bat 'docker push %DOCKER_REGISTRY%/%IMAGE_NAME%:%VERSION%'
                //}
            }
        }
        stage('Deploy with Docker Compose') { //docker compose
            steps {
                bat 'docker-compose up -d'
            }
        }
        stage('Clean up unused image and volumes') { //remove unused docker image and volumes
            steps {
                bat 'docker system prune -a -f'
                bat 'docker-compose down --volumes'
                echo 'Unused images cleaned!'
            }
        }

        //TEST STAGE 

        stage('Test') {
            steps {
                catchError(buildResult: 'UNSTABLE') {
                    bat 'npm test'
                    bat 'type test-results.xml'
                    echo 'test'
                }
            }
            post {
                always {
                    junit '**/test-results.xml' //generates test reports
                }
                success {
                    echo 'All test passed!'
                }
                failure {
                    echo 'Some tests failed. Check test result for details.'
                }
            }
        }

        //CODE QUALITY STAGE

        stage('Code health check') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    bat 'sonar-scanner -Dsonar.projectKey=%SONARQUBE_TOKEN% -Dsonar.host.url=%SONARQUBE_URL%'
                }
                echo 'code quality'
            }
        }
        stage('Quality gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
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