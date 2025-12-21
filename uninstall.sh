#!/bin/bash

# Uninstalls pilot from the host by deleting the binary executable from '/usr/local/bin/pilot';

if [ -e /usr/local/bin/pilot ]; then
  rm /usr/local/bin/pilot
  echo 'pilot deleted ✅';
else
  echo 'pilot is not available';
fi;

