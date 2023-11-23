pipeline {
    agent any 
    
    tools {nodejs "node"}

    environment {
        ARTIFACT_NAME="simple-node-app-${env.BUILD_NUMBER}.zip"
    }
    

    stages {
        stage('build') {
            steps {
                sh label: "Install packages", script: 'npm install'
            }            
        }
        stage('test') {
            steps {
                
                sh label: "Running NPM test", script: 'npm test'
              
            }            
        }
         stage('pack') {
            steps {
                
                sh label: "Zip the package", script: "zip -r $ARTIFACT_NAME ."
                
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
         stage('deploy-to-staging'){
            steps {
                script {                
                ssm_command_id = sh(returnStdout: true, script: """ \
                aws ssm send-command \
                --document-name "AWS-RunRemoteScript" \
                --document-version "1" \
                --targets Key=tag:Product,Values=node Key=tag:Environment,Values=test \
                --parameters '{"sourceType": ["S3"],"sourceInfo": ["{\\\"path\\\":\\\"s3://bucket-028266843830/script/deploy.sh\\\"}"],"commandLine": ["deploy.sh"]}' \
                --region eu-west-1 \
                --timeout-seconds 600 --max-concurrency "50" --max-errors "0" \
                --query "Command.CommandId"
                """ ).trim()                    
                waitUntil {
                    ssm_command_status = sh(returnStdout: true, script: "aws ssm list-commands \
                    --command-id $ssm_command_id \
                    --region eu-west-1 \
                    --query 'Commands[0].Status'").trim().replace("\"", "")
                    return !["Pending", "InProgress", "Delayed"].contains(ssm_command_status)
                }
                echo "Got ssm_command_status : $ssm_command_status"
                if (ssm_command_status != 'Success')
                    error("""ssm script failed with status $ssm_command_status.
                        Check the ssm command with id $ssm_command_id.
                        If script failed on instance ssm logs can be check on instance.
                        Fix the issue and re-trigger the job""")
            }
         }
        }
    }
     post {
        always {
            // clean workspace
            cleanWs()
        }

         success {
            // send email
           script {
             echo 'success'
           }
        }
}