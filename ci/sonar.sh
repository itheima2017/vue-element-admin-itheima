#!/bin/bash

sonar-scanner -X \
  -Dsonar.analysis.mode=preview \
  -Dsonar.projectKey=gitlab:$CI_COMMIT_REF_NAME:$CI_PROJECT_NAME \
  -Dsonar.projectName=gitlab:$CI_COMMIT_REF_NAME:$CI_PROJECT_NAME \
  -Dsonar.projectVersion=1.0.$CI_PIPELINE_ID \
  -Dsonar.gitlab.project_id=$CI_PROJECT_ID \
  -Dsonar.gitlab.commit_sha=$CI_COMMIT_SHA \
  -Dsonar.gitlab.ref_name=$CI_COMMIT_REF_NAME 

if [ $? -eq 0 ]; then
    echo "sonarqube code-publish over."
fi