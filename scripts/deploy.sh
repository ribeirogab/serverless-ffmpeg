#!/bin/bash

# Create FFmpeg layer
./scripts/create-ffmpeg-layer.sh

# Update Node.js layer package.json
node postinstall.js

# Install Node.js layer dependencies
npm i --prefix layers/dependencies/nodejs

# Deploy
serverless deploy