#!/bin/bash

# FROM:  https://raw.githubusercontent.com/maxheld83/ghpages/master/LICENSE
# MIT License

# Copyright (c) 2019 Maximilian Held

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

set -e

# Configuration
BUILD_DIR="dist"
SOURCE_DIRECTORY_DEPLOY_GH="$HOME/temp-gh-deploy-src"
CLONED_DIRECTORY_DEPLOY_GH="$HOME/temp-gh-deploy-cloned"
REMOTE_REPO="https://${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
REPONAME="$(basename "$GITHUB_REPOSITORY")"
OWNER="$(dirname "$GITHUB_REPOSITORY")"
GHIO="${OWNER}.github.io"
REMOTE_BRANCH=$([ "$REPONAME" == "$GHIO" ] && echo "master" || echo "gh-pages")

# Functions
prepare_directories() {
    echo "Creating directories..."
    mkdir -p "$SOURCE_DIRECTORY_DEPLOY_GH"
    mkdir -p "$CLONED_DIRECTORY_DEPLOY_GH"
}

clone_repository() {
    echo "Cloning branch '$REMOTE_BRANCH'..."
    git clone --single-branch --branch="$REMOTE_BRANCH" "$REMOTE_REPO" "$CLONED_DIRECTORY_DEPLOY_GH"
}

copy_build_files() {
    echo "Copying build files..."
    cp -r "$BUILD_DIR" "$SOURCE_DIRECTORY_DEPLOY_GH/"
    cp -r "$SOURCE_DIRECTORY_DEPLOY_GH/$BUILD_DIR" "$CLONED_DIRECTORY_DEPLOY_GH/"
}

clean_old_files() {
    echo "Removing old files..."
    cd "$CLONED_DIRECTORY_DEPLOY_GH" && git rm -rf . && git clean -fdx
}

commit_and_push() {
    echo "Committing and pushing changes..."
    mv "$CLONED_DIRECTORY_DEPLOY_GH/.git" "$CLONED_DIRECTORY_DEPLOY_GH/$BUILD_DIR/"
    cd "$CLONED_DIRECTORY_DEPLOY_GH/$BUILD_DIR"
    git config user.name "$GITHUB_ACTOR"
    git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
    date > forcebuild.date
    git add -A
    git commit -m 'Deploy to GitHub Pages'
    git push "$REMOTE_REPO" "$REMOTE_BRANCH:$REMOTE_BRANCH"
}

# Main execution
prepare_directories
clone_repository
clean_old_files
copy_build_files
commit_and_push
