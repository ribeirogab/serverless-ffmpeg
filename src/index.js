const child = require('node:child_process')
const util = require('node:util')

const { createVideo } = require('./videoshow')

const exec = util.promisify(child.exec)

module.exports.handler = async event => {
  console.log('Executing `ffmpeg -version` command')

  let statusCode = 200

  const { stdout, stderr } = await exec('ffmpeg -version')

  if (stdout) {
    console.log('stdout', stdout)
  }

  if (stderr) {
    console.log('stderr', stderr)
    statusCode = 500
  }

  console.log('Executing `createVideo` script')
  await createVideo()

  return {
    statusCode,
    body: JSON.stringify(
      {
        message: stdout || stderr,
        input: event
      },
      null,
      2
    )
  }
}
