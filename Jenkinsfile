pipeline {
    agent any 
    
    tools {nodejs "node"}
    environment {
        ARTIFACT_NAME="node-app-${env.BUILD_NUMBER}.tgz"
    }
    

    stages {
        stage('build') {
            steps {
                sh 'npm install'
            }            
        }
        stage('test') {
            steps {
                 echo 'Running npm test'
                sh 'npm test'
                echo 'npm test completed'
            }            
        }
         stage('pack') {
            steps {
                 echo 'Zip the package'
                sh "npm pack --filename=$ARTIFACT_NAME"
                echo 'npm pack completed'
            }            
        }
        stage('artifact-to-s3') {
            steps { 
                script {

                            
                sh label: "push artefact artefact to s3", script: "/var/jenkins_home/.local/bin/aws s3 cp simple-node-app-1.0.0.tgz s3://bucket-028266843830/dev/$ARTIFACT_NAME"

                }
            }            
        }
    }
}