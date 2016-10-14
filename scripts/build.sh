#!/bin/sh
set -e

while [[ $# -gt 1 ]]
do
key="$1"
case $key in
    -c|--clone)
    DEV="$2"
    shift
    ;;
    *)
    ;;
esac
shift
done

if [ -n "$1" ]; then
  rm -Rf ./avalanche
  git clone -b dev https://github.com/avalanchesass/avalanche.git
fi

node ./scripts/build.js
