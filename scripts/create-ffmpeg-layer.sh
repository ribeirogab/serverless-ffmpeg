#!/bin/bash
LAYERS_PATH=./layers

# Download and unpack the latest static release build of FFmpeg for Linux amd64 from https://johnvansickle.com/ffmpeg/
wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz
wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz.md5
md5sum -c ffmpeg-release-amd64-static.tar.xz.md5
tar xvf ffmpeg-release-amd64-static.tar.xz

# Create layer directory
mkdir -p $LAYERS_PATH/ffmpeg/bin

# Copy the binaries to the layer
cp ffmpeg-*-amd64-static/ffmpeg $LAYERS_PATH/ffmpeg/bin/
cp ffmpeg-*-amd64-static/ffprobe $LAYERS_PATH/ffmpeg/bin/

# Delete unused files
rm -rf ffmpeg-*-amd64-static*