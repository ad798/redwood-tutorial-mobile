#!/bin/bash

set -e

rm -rf dist

cd ../web
yarn install
yarn rw build web
cp -r dist ../mobile/

cd ../mobile
if [[ ! -f capacitor.config.ts ]]
then
  yarn add @capacitor/core
  yarn add -D @capacitor/cli
  npx cap init --web-dir dist $1 $2
fi
if [[ ! -d android ]]
then
  yarn add @capacitor/android
  npx cap add android
fi
npx cap sync
npx cap open android
