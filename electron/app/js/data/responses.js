module.exports = {
	reaction:{
		happy:{
			local:{
				folder: 'excited',
				files: ['1.gif','2.gif','3.gif']
			},
			remote:["happy","delighted","i'm so happy","satisfied"],
			servo: "happy",
			led: "greenBlink",
			sound: null
		},
		sad:{
			local:{
				folder: 'sad',
				files: ['1.gif','2.gif']
			},
			remote:["crying","sad","feeling sad"],
			servo: "sad",
			led: "fadeRed",
			sound: null
		},
		excited:{
			local:{
				folder: 'excited',
				files: ['1.gif','2.gif']
			},
			remote:["excited","yay","this is awesome"],
			servo: "excited",
			led: "greenBlink",
			sound: null
		},
		abouttime:{
			local:{
				folder: 'abouttime',
				files: ['1.gif']
			},
			remote:["it's about time","finally","thank god"],
			servo: "abouttime",
			led: null,
			sound: null
		},
		watching: {
			local:{
				folder: 'watching',
				files: ['1.gif']
			},
			remote:["i'm watching you","don't mess with me", "eyes on you", "mexican standoff"],
			servo: "lookup",
			led: "greenBlink",
			sound: null
		},
		angry:{
			local:{
				folder: 'angry',
				files: ['1.gif']
			},
			remote:["angry","are you serious","i am so mad"],
			servo: "angry",
			led: "error",
			sound: null
		},
		laugh:{
			local:{
				folder: 'excited',
				files: ['1.gif','2.gif']
			},
			remote:["excited","yay","this is awesome"],
			servo: null,
			led: "greenBlink",
			sound: null
		},
		confused:{
			local:{
				folder: 'confused',
				files: ['1.gif','2.gif']
			},
			remote:["confused","shrug", "what do I have to do","i don't understand"],
			servo: null,
			led: "error",
			sound: null
		},
		no:{
			local:{
				folder: 'no',
				files: ['1.gif']
			},
			remote:["no","nope","never","absolutely not"],
			servo: "no",
			led: "error",
			sound: null
		},
		yes:{
			local:{
				folder: 'yes',
				files: ['1.gif','2.gif', '3.gif']
			},
			remote:["yes","you got it","ok boss"],
			servo: "nod",
			led: "success",
			sound: null
		},
		wink:{
			local:{
				folder: 'excited',
				files: ['1.gif','2.gif']
			},
			remote:["excited","yay","this is awesome"],
			servo: "lookup",
			led: "greenBlink",
			sound: null
		},
		eyeroll:{
			local:{
				folder: 'excited',
				files: ['1.gif','2.gif']
			},
			remote:["excited","yay","this is awesome","judging you", "side eye"],
			servo: null,
			led: "greenBlink",
			sound: null
		},
		facepalm:{
			local:{
				folder: 'excited',
				files: ['1.gif','2.gif']
			},
			remote:["facepalm","judging you","i'll kill you", "eyeroll", "don't mess with me"],
			servo: "lookup",
			led: null,
			sound: null
		},
		learning:{
			local:{
				folder: 'learning',
				files: ['1.gif']
			},
			remote:["learning","knowledge","downloading"],
			servo: null,
			led: "greenBlink",
			sound: null
		},
	},

	greeting: {
		alert:{
			local:{
				folder: null,
				files: []
			},
			remote: null,
			servo: "alert",
			led: "alert",
			sound: "alert"
		},

		hello:{
			local:{
				folder: 'hello',
				files: ["1.gif","2.gif","3.gif","4.gif"],
			},
			remote:["hello","hi","howdy","whatsup","sup","yo"],
			servo: "curious",
			led: "greenBlink",
			sound:null
		},
		bye: {
			local:{
				folder: 'bye',
				files: ["1.gif","2.gif"],
			},
			remote:["bye","see you","goodbye","ciao","so long"],
			servo: "curious",
			led: "blueBlink",
			sound:null
		},
		goodnight: {
			local:{
				folder: 'goodnight',
				files: ["1.gif"],
			},
			remote:["good night", "goodnight", "sweet dreams", "sleep tight"],
			servo: "lookup",
			led: null,
			sound:null
		},
		what: {
			local:{
				folder: 'what',
				files: ["1.gif"],
			},
			remote:["what", "what is your problem", "side eye"],
			servo: null,
			led: "greenBlink",
			sound:null
		}
	},

	info: {
		weather:{
			local:[],
			remote: [],
			servo: ""
		},

		music:{
			local: [],
			remote: [],
			servo: ""
		},

		gifjif:{
			local:{
				folder: 'gifjif',
				files: ["1.gif","2.gif"],
			},
			remote:["gif jif", "gif or jif", "pronounce gif"],
			servo: "lookup",
			led: null,
			sound:null
		}
	},

	other: {
		
		boop: {
			local:{
				folder: 'boop',
				files: ['1.gif']
			},
			remote:["boop","boop nose"],
			servo: null,
			led: null,
			sound: null
		},

		offline:{
			local:{
				folder: 'offline',
				files: ['1.gif']
			},
			remote:[],
			servo: null,
			led: "error",
			sound: null
		},

		back: {
			local:{
				folder: 'back',
				files: ['1.gif']
			},
			remote:["i'm back"],
			servo: "alert",
			led: "success",
			sound: null
		},

		wakeup: {
			local:{
				folder: 'wakeup',
				files: ['1.gif']
			},
			remote:["wake up","sleepy","rise and shine"],
			servo: "wakeup",
			led: "blueBlink",
			sound: null
		},

		camera: {
			local:{
				folder: 'camera',
				files: ["1.gif"],
			},
			remote:["camera","say cheese","smile for the camera"],
			servo: null,
			led: "greenBlink",
			sound:null
		}
	}
}