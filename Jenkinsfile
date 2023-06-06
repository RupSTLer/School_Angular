pipeline {
    agent any
    tools{
        nodejs 'node'
    }
    stages {
        stage('build') {
            steps {
                script {
                    echo "building the application..."
                    // git "https://github.com/RupSTLer/SMS-Frontend.git"
                    bat 'npm install'
                    // bat 'npm run ng -- build'
                }
            }
        }
        // stage('test'){
        //     steps{
        //         script{
        //             echo "running the test cases..."
        //             bat 'npm run test'
        //             bat 'npm run ng -- build'
        //         }
        //     }
        // }
        stage('run') {
            steps {
                script {
                    echo "Running the application..."
                    bat 'npm run ng -- serve'
                }
            }
        }
    }
}