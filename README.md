# Serverless + FFmpeg

**Related:**

- <https://github.com/ribeirogab/lambda-docker-ecr>
- <https://github.com/ribeirogab/lambda-docker-ffmpeg>

---

## Create FFmpeg layer

1. Create `layers` folder

```bash
mkdir layers
```

2. Create shell script:
*scripts/create-ffmpeg-layer.sh*

```bash
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
```

3. Execute script:

```bash
cd scripts
chmod +x ./create-ffmpeg-layer.sh
./create-ffmpeg-layer.sh
```

*when the script is finished running, the folder structure should look like this:*
![folder structure](https://i.ibb.co/bBvmWXF/Screenshot-from-2023-07-25-15-40-44.png)

4. Add layer in `serverless.yml` file

```yml
layers:
  ffmpeg:
    name: ${self:custom.functionName}-ffmpeg-layer
    path: layers/ffmpeg
    compatibleRuntimes:
      - nodejs18.x
```
