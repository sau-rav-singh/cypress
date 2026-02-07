pipeline {
    agent {
        docker {
            image 'cypress/included:latest' // This image has Chrome/Electron/Node pre-installed
        }
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                // Cypress included image has npm, but we need to install project-specific deps
                sh 'npm install'
            }
        }
        stage('Run Regression') {
            steps {
                // Running your specific script from package.json
                sh 'npm run regression'
            }
        }
    }
    post {
        always {
            // Optional: Archive screenshots or videos if they exist
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true
        }
    }
}