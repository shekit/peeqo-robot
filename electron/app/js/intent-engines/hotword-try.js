const record = require('node-record-lpcm16')
const Detector = require('snowboy').Detector
const Models = require('snowboy').Models
const googleSpeechApi = require('@google-cloud/speech')
const path = require('path')
const stream = require('stream')
const models = new Models()
const config = require(path.join(__dirname, 'config/config'))

var speech = googleSpeechApi({
    projectId: config.google.speech.id,
    keyFilename: path.join(__dirname, 'config', config.google.speech.keyfile)
})
var googleIsListening = false

models.add({
    file: path.join(__dirname,'js/data/Peeqo.pmdl'),
    sensitivity: '0.5',
    hotwords : 'peeqo'
});

const detector = new Detector({
    resource: path.join(__dirname,'js/data/common.res'),
    models: models,
    audioGain: 2.0
});

var options = {
    config: {
      encoding: 'LINEAR16',
      sampleRate: 16000
    },
    singleUtterance: true,
    interimResults: false,
    verbose: true
}

gDetector = speech.createRecognizeStream(options)
    
gDetector.on('error', function(err){
  console.log("ERROR: ", err)
})

gDetector.on('data', function(data){
  if(data.endpointerType=='START_OF_SPEECH'){
     googleIsListening = true
  }
  if(data.endpointerType=='END_OF_AUDIO'){
     googleIsListening = true
  }

  console.log(data.results)
  // mic.pipe(detector)
  // console.log(data.results)

})


const googleRecognizer = {}

var googleStream = null

googleRecognizer.stream = function(audio, listening){

  if(googleIsListening){
    console.log("GOOGLE - ALREADY LISTENING")
    return
  }
  console.log("GOOGLE - NEW STREAM")

  googleIsListening = true

  console.log("GOOGLE - LISTENNG:",googleIsListening)

  const recognitionStream = speech.createRecognizeStream(options)

  recognitionStream.on('error', function(err){
    console.log("GOOGLE ERROR:", err)
  })

  recognitionStream.on('data', function(data){
    var result = data.results[0]
    if(result){
      console.log(result)
    }
    console.log("GOOGLE RESULTS:",data.results)
    if(data.endpointerType=='START_OF_SPEECH'){
      console.log("GOOGLE - START OF SPEECH")
      googleIsListening = true
    }
    if(data.endpointerType=='END_OF_AUDIO'){
      console.log("GOOGLE - END OF AUDIO")
      googleIsListening = false
    }
    if(data && data.results.isFinal){
      googleIsListening = false;
      console.log("GOOGLE - LISTENNG:",googleIsListening)
    }

    // if(data){
    //   const result = data.results[0]
    //   if(result && result.isFinal){
    //       console.log('FINAL:', result.transcript)
    //       console.log("LISTENNG:",googleIsListening)
    //       googleIsListening = false
    //       console.log("LISTENNG:",googleIsListening)
    //       //mic.pipe(detector)
    //   }

    //   if(data.endpointerType=='END_OF_AUDIO'){
    //     console.log("END OF AUDIO")
    //     googleIsListening = false
    //   }
    // }
  })

  audio.pipe(recognitionStream)
}

detector.on('silence', function () {
  //console.log('silence');
});

detector.on('sound', function () {
  //console.log('sound');
});

detector.on('error', function () {
  console.log('error');
});

detector.on('hotword', function (index, hotword) {

  if(googleIsListening){
    console.log("SNOWBOY - NO GOOGLE")
    return
  } else {
    console.log('SNOWBOY - START GOOGLE')
    googleRecognizer.stream(mic, googleIsListening)
  }

  

  //mic.pipe(gDetector)
  //console.log('hotword', index, hotword);
})

const mic = record.start({
  threshold: 0,
  verbose: false
})

mic.pipe(detector)


