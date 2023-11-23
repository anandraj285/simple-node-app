pipeline {
    agent any 
    
    tools {nodejs "node"}
    environment {
        ARTIFACT_NAME="node-app-${env.BUILD_NUMBER}.zip"
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
                sh "zip -r $ARTIFACT_NAME ."
                echo 'npm pack completed'
            }            
        }
        stage('artifact-to-s3') {
            steps { 
                script {
                            
                sh label: "push artefact artefact to s3", script: "aws s3 cp $ARTIFACT_NAME s3://bucket-028266843830/dev/$ARTIFACT_NAME"
                sh label: "push artefact artefact to s3", script: "aws s3 cp $ARTIFACT_NAME s3://bucket-028266843830/dev/simple-node-app.zip"

                }
            }            
        }
    }
}