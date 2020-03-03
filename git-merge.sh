#!/bin/bash
REPO_NAME=caffeine-source-map
SOURCE_REPO=~/dev/imikimi/npm/$REPO_NAME
TARGET_FOLDER=packages/$REPO_NAME

echo git filter-repo --source $SOURCE_REPO --target . --tag-rename '':'$SOURCE_REPO-' --to-subdirectory-filter $TARGET_FOLDER
# git remote add -f origin git@github.com:caffeine-suite/caffeine-suite.git
echo git pull origin master --allow-unrelated-histories
# git push -u origin master