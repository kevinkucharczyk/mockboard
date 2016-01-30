#!/bin/bash
set -e

ember build --environment ghpages

cd dist

git init

git config user.name "Travis CI Build (kevinkucharczyk)"
git config user.email "kevinkucharczyk+travisci@gmail.com"

git add .
git commit -m "Deploy to GitHub Pages"

echo "Pushing to GitHub..."

git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1

echo "Done!"