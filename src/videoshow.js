const path = require('node:path')
const videoshow = require('videoshow')

const VIDEO_PATH = path.resolve('/tmp', 'video.mp4')

const videoOptions = {
  fps: 25,
  loop: 5,
  transition: true,
  transitionDuration: 1,
  videoBitrate: 1024,
  videoCodec: 'libx264',
  size: '640x?',
  audioBitrate: '128k',
  audioChannels: 2,
  format: 'mp4',
  pixelFormat: 'yuv420p'
}

module.exports.createVideo = () =>
  new Promise((resolve, reject) =>
    videoshow(['example.jpg'], videoOptions)
      .save(VIDEO_PATH)
      .on('start', function (command) {
        console.log('ffmpeg process started:', command)
        console.log('VIDEO_PATH', VIDEO_PATH)
      })
      .on('error', function (error, _stdout, stderr) {
        console.error('Error:', error)
        console.error('ffmpeg stderr:', stderr)
        reject(error)
      })
      .on('end', function (output) {
        console.log('Video created in:', output)
        resolve(output)
      })
  )
