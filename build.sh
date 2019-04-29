#!/bin/sh
DIR=$(cd `dirname $0` && pwd)

DEPENDENCIES_MISSING=false
command -v sass >/dev/null 2>&1 || { DEPENDENCIES_MISSING=true; echo >&2 "Npm module sass is required but not found. Please install it globally with 'npm install sass -g'"; }
command -v tsc >/dev/null 2>&1 || { DEPENDENCIES_MISSING=true; echo >&2 "Npm module typescript is required but not found. Please install it globally with 'npm install typescript -g'"; }
command -v tsc-bundle >/dev/null 2>&1 || { DEPENDENCIES_MISSING=true; echo >&2 "Npm module tsc-bundle is required but not found. Please install it globally with 'npm install tsc-bundle -g'"; }

if [ $DEPENDENCIES_MISSING = true ] ; then
  return 0
fi

echo 'Building the stylesheets...'
sass $DIR/sass/style.scss $DIR/stylesheets/style.css
echo 'Stylesheets built.'

echo '\nBuilding scripts'
# tsc-bundle is a npm script
tsc-bundle $DIR/tsconfig.json --outFile $DIR/build/minified.js
echo 'Scripts built.'
echo 'FINI :D'