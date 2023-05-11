pipeline {
    agent any
       stages {
            stage('Git Pull stage') {
                steps {
                    git url: 'https://github.com/hanzohasashi33/newsgenie-frontend',
                    branch: 'main',
                    credentialsId : 'GithubCred'
                }
            }
            stage('Install react project'){
                steps{
                    script{
                        sh 'npm install'
                    }    
                }
            }
            stage('Frontend react test'){
                steps{
                    script{
                        sh 'npm test'
                    }    
                }
            }
            stage('Docker build image'){
                steps{
                    script{
                        sh 'docker build -t sivani4/newsgeniefrontend:latest .'
                    }    
                }
            }
            stage('Push docker image'){
                steps{
                    script{
                        withDockerRegistry([ credentialsId: "dockercred", url: "" ]){
                            sh 'docker push sivani4/newsgeniefrontend:latest'
                        }
                    }    
                }
            }
       }
}       
