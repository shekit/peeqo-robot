'use strict'

// Load in smart mirror config
const path = require('path')
const os = require('os')
const config = require(path.join(process.env.PWD,"app","config","config"))
if(!config || !config.speech || !config.speech.keyFilename || !config.speech.model || !config.speech.language){
  throw "Configuration Error! Setup your config file";
}

// Configure Sonus
const Sonus = require('sonus')
const speech = require('@google-cloud/speech')({
  projectId: config.speech.projectId,
  keyFilename: path.join(process.env.PWD, 'app','config/', config.speech.keyFilename)
})

const hotwords = [{ file: path.join(process.env.PWD, 'app','config', config.speech.model), hotword: config.speech.keyword, sensitivity:  config.speech.sensitivity || '0.5'}]
const language = config.speech.language

const recordProgram = (os.arch() == 'arm') ? "arecord" : "rec"

const sonus = Sonus.init({ hotwords, language, recordProgram}, speech)

// Start Recognition
Sonus.start(sonus)

// Event IPC
sonus.on('hotword', (index, keyword) => console.log("!h:", index))
sonus.on('partial-result', result => console.log("!p:", result))
sonus.on('final-result', result => console.log("!f:", result))
sonus.on('error', error => console.error("!e:", error))
