#!/bin/bash
echo "Enabling Corepack..."
corepack enable
echo "Preparing Yarn 4.3.0..."
corepack prepare yarn@4.3.0 --activate
echo "Verifying Yarn version..."
yarn --version