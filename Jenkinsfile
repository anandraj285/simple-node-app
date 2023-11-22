pipeline {
    agent any 

    tools {nodejs "node"}

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }            
        }
        stage('Test') {
            steps {
                 echo 'Running npm test'
                sh 'npm test'
                echo 'npm test completed'
            }            
        }
    }
}