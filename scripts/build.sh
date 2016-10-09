#!/bin/sh
set -e

while [[ $# -gt 1 ]]
do
key="$1"
case $key in
    -d|--dev)
    DEV="$2"
    shift
    ;;
    *)
    ;;
esac
shift
done

if [ -z "$1" ]; then
  rm -Rf ./avalanche
  git clone -b dev git@github.com:avalanchesass/avalanche.git
fi

node ./scripts/build.js
