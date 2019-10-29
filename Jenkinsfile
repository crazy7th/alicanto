pipeline {
  agent any
  environment {
    ALICANTO_HARBOR_USER = credentials('ALICANTO_HARBOR_USER')
    ALICANTO_HARBOR_PASS = credentials('ALICANTO_HARBOR_PASS')
    ALICANTO_HARBOR_ADDR = credentials('ALICANTO_HARBOR_ADDR')
    ALICANTO_DOCKER_HUB_USER = credentials('ALICANTO_DOCKER_HUB_USER')
    ALICANTO_DOCKER_HUB_PASS = credentials('ALICANTO_DOCKER_HUB_PASS')
    ALICANTO_STAGING_HOST = credentials('ALICANTO_STAGING_HOST')
    ALICANTO_STAGING_CREDS = credentials('ALICANTO_STAGING_CREDS')
    ALICANTO_STAGING_USER = credentials('ALICANTO_STAGING_USER')
    ALICANTO_STAGING_APP_DIR = credentials('ALICANTO_STAGING_APP_DIR')
    ALICANTO_STAKEHOLDER_RECIPIENT = credentials('ALICANTO_STAKEHOLDER_RECIPIENT')
    REPOSITORY_NAME = 'alicanto'
    USER_WORKSPACE = 'sepulsa'
    DEPS_IMAGE = 'sancadeps/alicanto'
    APPS_IMAGE = 'alicantoapps'
    IMAGE_TAG = 'latest'
    PR_IMAGE_TAG = 'analyze'
    COMMIT_TITLE = sh (script: 'git log --oneline -1 ${GIT_COMMIT}', returnStdout: true).trim()
    COMMIT_AUTHOR = sh (script: 'git show -s --pretty=%an', returnStdout: true).trim()
    GITHUB_ACCESS_TOKEN = credentials('537f2dde-1a07-4ba6-8362-ea7a9cff7668')
  }
  parameters {
    string(name: 'COMMIT_TITLE', defaultValue: '', description: 'Title of last commit')
  }
  stages {
    stage('[PR] Build (Deps & /) Apps Analyze Image') {
      when {
        changeRequest()
      }
      steps {
        script {
          // fetch issues details
          def issues_json = sh(
            script: "curl -H \"Authorization: token ${env.GITHUB_ACCESS_TOKEN}\" https://api.github.com/repos/${env.USER_WORKSPACE}/${env.REPOSITORY_NAME}/issues/${env.CHANGE_ID}",
            returnStdout: true
          )
    
          // read JSON
          def prInfo = readJSON text: issues_json
          def pipelineAuthorId = prInfo['user']['login'].toString()

          // iterate labels
          prInfo.labels.each{
            if (it.name == 'rebuild') {
              // build image, check if exist remove
              sh "docker image inspect ${ALICANTO_HARBOR_ADDR}/${DEPS_IMAGE}:${PR_IMAGE_TAG}_${pipelineAuthorId} >/dev/null 2>&1 && docker rmi ${ALICANTO_HARBOR_ADDR}/${DEPS_IMAGE}:${PR_IMAGE_TAG}_${pipelineAuthorId} || echo \"no deps analyze image was found\""
              try {
                // build deps image
                sh "docker build -t ${ALICANTO_HARBOR_ADDR}/${DEPS_IMAGE}:${PR_IMAGE_TAG}_${pipelineAuthorId} -f Dockerfile-deps --build-arg docker_tag=${PR_IMAGE_TAG}_${pipelineAuthorId} ."
              }catch(Exception e) {
                // build deps image
                sh "docker build -t ${ALICANTO_HARBOR_ADDR}/${DEPS_IMAGE}:${PR_IMAGE_TAG}_${pipelineAuthorId} -f Dockerfile-deps ."
              }
            }
          }
          
          // build image, check if exist remove
          sh "docker image inspect ${USER_WORKSPACE}/${APPS_IMAGE} >/dev/null 2>&1 && docker rmi ${USER_WORKSPACE}/${APPS_IMAGE} || echo \"no apps image was found\""
          try {
            // build image, using image tag
            sh "docker build -t ${USER_WORKSPACE}/${APPS_IMAGE}:${PR_IMAGE_TAG}_${pipelineAuthorId} -f Dockerfile-pr --build-arg docker_tag=${PR_IMAGE_TAG}_${pipelineAuthorId} ."
          }catch(Exception e) {
            // build image, using image tag
            sh "docker build -t ${USER_WORKSPACE}/${APPS_IMAGE}:${PR_IMAGE_TAG}_${pipelineAuthorId} -f Dockerfile-pr ."
          }
        }
      }
    }
    stage('[DOCKER] Publish Deps & Apps Image') {
      when {
        allOf {
          expression { BRANCH_NAME ==~ /^(staging|release\/\d+)$/ }
          expression { (COMMIT_TITLE ==~ /(.*\[rebuild\].*)/) }
        }
      }
      steps {
        script {
          // get scm vars
          def scmVars = checkout scm
          // feature prior merged hash
          def commitID = sh(
            script: "git log --pretty=format:'%h : %s' --graph | head -n 3 | tail -n 1 | cut -c 5- | cut -c1-7",
            returnStdout: true
          ).trim()
          // fetch commit details
          def commits_json = sh(
            script: "curl -H \"Authorization: token ${env.GITHUB_ACCESS_TOKEN}\" https://api.github.com/repos/${env.USER_WORKSPACE}/${env.REPOSITORY_NAME}/commits/${commitID}",
            returnStdout: true
          )
          def commitInfo = readJSON text: commits_json
          def pipelineAuthorId = commitInfo['author']['login'].toString()

          // tagging docker deps image
          sh "docker tag ${ALICANTO_HARBOR_ADDR}/${DEPS_IMAGE}:${PR_IMAGE_TAG}_${pipelineAuthorId} ${ALICANTO_HARBOR_ADDR}/${DEPS_IMAGE}:${IMAGE_TAG}'"
          // build apps image using latest tag
          sh "docker build -t ${USER_WORKSPACE}/${APPS_IMAGE}:${IMAGE_TAG} -f Dockerfile-apps --build-arg docker_tag=${PR_IMAGE_TAG}_${pipelineAuthorId} .'"
          // login to harbor
          sh "docker login ${ALICANTO_HARBOR_ADDR} --username=${ALICANTO_HARBOR_USER} --password=${ALICANTO_HARBOR_PASS}'"
          // push deps image to harbor repository (renew latest)
          sh "docker push ${ALICANTO_HARBOR_ADDR}/${DEPS_IMAGE}:${IMAGE_TAG}'"
          // login to dockerhub
          sh "docker login --username=${ALICANTO_DOCKER_HUB_USER} --password=${ALICANTO_DOCKER_HUB_PASS}'"
          // push apps image to repository (renew latest)
          sh "docker push ${USER_WORKSPACE}/${APPS_IMAGE}:${IMAGE_TAG}'"
        }
      }
    }
    stage('[DOCKER] Publish Apps Image') {
      when {
        allOf {
          expression { BRANCH_NAME ==~ /^(staging|release\/\d+)$/ }
          expression { !(COMMIT_TITLE ==~ /(.*\[rebuild\].*)/) }
        }
      }
      steps {
        script {
          // get scm vars
          def scmVars = checkout scm
          // feature prior merged hash
          def commitID = sh(
            script: "git log --pretty=format:'%h : %s' --graph | head -n 3 | tail -n 1 | cut -c 5- | cut -c1-7",
            returnStdout: true
          ).trim()
          // fetch commit details
          def commits_json = sh(
            script: "curl -H \"Authorization: token ${env.GITHUB_ACCESS_TOKEN}\" https://api.github.com/repos/${env.USER_WORKSPACE}/${env.REPOSITORY_NAME}/commits/${commitID}",
            returnStdout: true
          )
          def commitInfo = readJSON text: commits_json
          def pipelineAuthorId = commitInfo['author']['login'].toString()

          // tagging docker apps image
          sh "docker tag ${USER_WORKSPACE}/${APPS_IMAGE}:${PR_IMAGE_TAG}_${pipelineAuthorId} ${USER_WORKSPACE}/${APPS_IMAGE}:${IMAGE_TAG}"
          // login to docker hub
          sh "docker login --username=${ALICANTO_DOCKER_HUB_USER} --password=${ALICANTO_DOCKER_HUB_PASS}"
          // push image to repository (renew latest)
          sh "docker push ${USER_WORKSPACE}/${APPS_IMAGE}:${IMAGE_TAG}"
        }
      }
    }
    stage('[ALICANTO] Deploy to Staging') {
      when {
        branch 'staging'
      }
      steps {
        sshagent(credentials: ['ALICANTO_STAGING_CREDS']) {
          // ignore host checking
          sh 'ssh -o StrictHostKeyChecking=no ${ALICANTO_STAGING_USER}@${ALICANTO_STAGING_HOST} uptime'
          // upload file
          sh 'scp staging/docker-compose.yml ${ALICANTO_STAGING_USER}@${ALICANTO_STAGING_HOST}:${ALICANTO_STAGING_APP_DIR}/docker-compose.yml'
          // running deploy
          sh '''
            ssh -tt ${ALICANTO_STAGING_USER}@${ALICANTO_STAGING_HOST} "
            cd ${ALICANTO_STAGING_APP_DIR} &&
            docker login --username=${ALICANTO_DOCKER_HUB_USER} --password=${ALICANTO_DOCKER_HUB_PASS} &&
            docker stop alicantoweb && docker rm alicantoweb &&
            docker image inspect ${USER_WORKSPACE}/${APPS_IMAGE} >/dev/null 2>&1 && docker rmi ${USER_WORKSPACE}/${IMAGE} || echo "no image was found" &&
            docker pull ${USER_WORKSPACE}/${APPS_IMAGE}:${IMAGE_TAG} &&
            docker-compose up -d
            "
          '''
        }
      }
    }
    stage('[ALICANTO DOCKER] Publish Release Docker') {
      when {
        allOf {
            expression { COMMIT_AUTHOR != 'semantic-release-bot' }
            branch 'master'
        }
      }
      steps {
        // create release
        sh 'GITHUB_TOKEN=${GITHUB_ACCESS_TOKEN} DOCKER_USERNAME=${ALICANTO_DOCKER_HUB_USER} DOCKER_PASSWORD=${ALICANTO_DOCKER_HUB_PASS} npx semantic-release --allow-same-version'
      }
    }
    stage('[ALICANTO DOCKER] Release Point') {
      when {
        allOf {
            expression { COMMIT_AUTHOR == 'semantic-release-bot' }
            branch 'master'
        }
      }
      steps {
        // update email template
        sh 'mkdir -p $JENKINS_HOME/email-templates'
        sh 'rm -rf $JENKINS_HOME/email-templates/release-html.template'
        sh 'cp .jenkins/release-html.template $JENKINS_HOME/email-templates/release-html.template'
        script {
          def mailSender = 'jenkins.do.not.reply@alterra.id'
          emailext attachmentsPattern: 'CHANGELOG.md',
            body: '''${SCRIPT, template="release-html.template"}''',
          mimeType: 'text/html',
          subject: "[Jenkins] ALICANTO Release",
          to: "${ALICANTO_STAKEHOLDER_RECIPIENT}",
          replyTo: "${mailSender}"
        }
      }
    }
  }
}
