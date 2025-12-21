#!/bin/bash

# Compiles pilot into a binary executable and installs to /usr/local/bin for global access.
# Requirements: Deno must be installed.

# checking for deno
if [ -z "$(command -v deno)" ]; then
  echo "Deno not found! install with: brew install deno" >&2;
  exit 1;
fi;

echo "Compiling pilot..."

# compiling the project with full permissions
deno compile -A --output /usr/local/bin/pilot main.js

# checking if compiling is success or not.
if [ $? -ne 0 ]; then
  echo 'pilot compiling failed ❌' >&2
  exit 1
fi

echo 'pilot compiled successfully ⚡️'
