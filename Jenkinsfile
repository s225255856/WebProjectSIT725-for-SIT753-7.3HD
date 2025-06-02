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
        SONARQUBE_URL = 'http://localhost:9000'
        SONARQUBE_TOKEN=credentials('SONARQUBE_TOKEN')
        SONARQUBE_PROJECT_KEY=credentials('SONARQUBE_PROJECT_KEY')

        //for snyk
        SNYK_TOKEN_ID=credentials('SNYK_TOKEN_ID')

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

        // //BUILD STAGE

        // stage('Cleanup Old Logs') { //clean up logs
        //     steps {
        //         bat 'del /F /Q C:\\Users\\%USERNAME%\\AppData\\Local\\Docker\\log\\*.log'
        //         bat 'del /F /Q C:\\Users\\%USERNAME%\\AppData\\Local\\Docker\\log\\host\\*.log'
        //         echo 'Old logs cleaned up!'
        //     }
        // }
        // stage('Build and tag image') { //build image 
        //     steps {
        //         bat 'docker build --build-arg VERSION=%VERSION% -t %DOCKER_REGISTRY%/%IMAGE_NAME%:%VERSION% .'
        //         echo 'build'
        //     }
        // }
        // // stage('Test image') {
        // //     steps {
        // //         bat 'docker run -e GOOGLE_CLIENT_ID=%GOOGLE_CLIENT_ID% %IMAGE_NAME%:%VERSION%'
        // //     }
        // // }
        // stage('Push to Registry') { //save
        //     steps {
        //         //withDockerRegistry([credentialsId: 'DOCKER_CRED', url: 'https://index.docker.io/v1/']) {
        //             //bat 'docker tag %IMAGE_NAME%:%VERSION% %DOCKER_REGISTRY%/%IMAGE_NAME%:%VERSION%'
        //             bat 'docker push %DOCKER_REGISTRY%/%IMAGE_NAME%:%VERSION%'
        //         //}
        //     }
        // }
        // stage('Deploy with Docker Compose') { //docker compose
        //     steps {
        //         bat 'docker-compose up -d'
        //     }
        // }
        // stage('Clean up unused image and volumes') { //remove unused docker image and volumes
        //     steps {
        //         bat 'docker system prune -a -f'
        //         bat 'docker-compose down --volumes'
        //         echo 'Unused images cleaned!'
        //     }
        // }

        // //TEST STAGE 

        // stage('Test') {
        //     steps {
        //         catchError(buildResult: 'UNSTABLE') {
        //             bat 'npm test'
        //             bat 'type test-results.xml'
        //             echo 'test'
        //         }
        //     }
        //     post {
        //         always {
        //             junit '**/test-results.xml' //generates test reports
        //         }
        //         success {
        //             echo 'All test passed!'
        //         }
        //         failure {
        //             echo 'Some tests failed. Check test result for details.'
        //         }
        //     }
        // }

        //CODE QUALITY STAGE

        stage('Code health check') {
            steps {
                withSonarQubeEnv('73hd') {
                    bat '''
                        set JAVA_OPTS=-Xmx10G -Xms6G -XX:+UseG1GC -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath="C:\\Users\\Alex\\Downloads\\sonarqube-25.5.0.107428\\sonarqube-25.5.0.107428"
                        sonar-scanner -Dsonar.projectKey=%SONARQUBE_PROJECT_KEY% -Dsonar.host.url=%SONARQUBE_URL%
                    '''
                }
                echo 'code quality'
            }
        }
        stage('Quality gate') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    script{
                        catchError(buildResult: 'UNSTABLE') {
                            def qualityGate = waitForQualityGate()
                            if (qualityGate.status == 'OK') {
                                echo 'Quality Gate passed!'
                            } else {
                                echo 'Quality Gate failed. Check the SonarQube Dashboard for issues.'
                            }
                        }
                    }
                }
            }
        }

        //SECURITY STAGE 

        stage('Sonarqube Security Scan') { 
            steps {
                //sonarqube security scan
                script{
                    catchError(buildResult: 'UNSTABLE') {
                        def qualityGate = waitForQualityGate()
                        if (qualityGate.status == 'OK') {
                            echo 'Quality Gate passed!'
                        } else {
                            echo 'Quality Gate failed. Check the SonarQube Dashboard for issues.'
                        }
                    }
                }
                echo 'security'
            }
        }
        stage('OWASP Dependencies Check') {  //API Key: 2261fd63-0ef2-441d-b234-b7216e723a74  
            steps {
                //owasp dependencies check
                dependencyCheck additionalArguments: ''' 
                    -o './'
                    -s './'
                    -f 'ALL' 
                    --prettyPrint
                    --nvdApiKey 2261fd63-0ef2-441d-b234-b7216e723a74''',
                odcInstallation: 'OWASP-DC'
                
                //output
                dependencyCheckPublisher pattern: 'dependency-check-report.xml'
                publishHTML([
                    reportDir: '.',
                    reportFiles: 'dependency-check-report.html',
                    reportName: 'OWASP Dependency Report'
                ])
            }
        }
        // stage('Snyk Security Scan') {
        //     steps{
        //         //snyk scan
        //         snykSecurity(
        //             snykInstallation: 'Snyk',
        //             snykTokenId: '%SNYK_TOKEN_ID%'
        //         )
        //     }
        // }

        //DEPLOY STAGE 

        stage('Deploy') {
            steps {
                sh 'docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d --build'

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