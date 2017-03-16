module.exports = {
	reaction:{
		happy:{
			local:{
				folder: 'excited',
				files: ['1.gif','2.gif','3.gif']
			},
			remote:["happy","delighted","i'm so happy","satisfied"],
			servo: null,
			led: "greenBlink",
			sound: null
		},
		sad:{
			local:{
				folder: 'sad',
				files: ['1.gif','2.gif']
			},
			remote:["crying","sad","feeling sad"],
			servo: null,
			led: "greenBlink",
			sound: null
		},
		excited:{
			local:{
				folder: 'excited',
				files: ['1.gif','2.gif']
			},
			remote:["excited","yay","this is awesome"],
			servo: null,
			led: "greenBlink",
			sound: null
		},
		angry:{
			local:{
				folder: 'angry',
				files: ['1.gif']
			},
			remote:["angry","are you serious","i am so mad"],
			servo: null,
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
			remote:["confused","what do I have to do","i don't understand"],
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
			servo: null,
			led: "error",
			sound: null
		},
		yes:{
			local:{
				folder: 'yes',
				files: ['1.gif','2.gif', '3.gif']
			},
			remote:["yes","you got it","ok boss"],
			servo: null,
			led: "success",
			sound: null
		},
		wink:{
			local:{
				folder: 'excited',
				files: ['1.gif','2.gif']
			},
			remote:["excited","yay","this is awesome"],
			servo: null,
			led: "greenBlink",
			sound: null
		},
		eyeroll:{
			local:{
				folder: 'excited',
				files: ['1.gif','2.gif']
			},
			remote:["excited","yay","this is awesome"],
			servo: null,
			led: "greenBlink",
			sound: null
		},
		facepalm:{
			local:{
				folder: 'excited',
				files: ['1.gif','2.gif']
			},
			remote:["excited","yay","this is awesome"],
			servo: null,
			led: "greenBlink",
			sound: null
		},
		shrug:{
			local:{
				folder: 'excited',
				files: ['1.gif','2.gif']
			},
			remote:["excited","yay","this is awesome"],
			servo: null,
			led: "greenBlink",
			sound: null
		},
	},

	greeting: {
		hello:{
			local:{
				folder: 'hello',
				files: ["1.gif","2.gif","3.gif","4.gif"],
			},
			remote:["hello","hi","howdy","whatsup","sup"],
			servo: null,
			led: "greenBlink",
			sound:null
		},
		bye: {
			local:{
				folder: 'bye',
				files: ["1.gif","2.gif"],
			},
			remote:["bye","see you","goodbye","ciao","so long"],
			servo: null,
			led: "greenBlink",
			sound:null
		},
		goodnight: {
			local:{
				folder: 'goodnight',
				files: ["1.gif"],
			},
			remote:["good night", "goodnight", "sweet dreams", "sleep tight"],
			servo: null,
			led: "greenBlink",
			sound:null
		}
	},

	information: {
		weather:{
			local:[],
			remote: [],
			servo: ""
		},

		music:{
			local: [],
			remote: [],
			servo: ""
		}
	},

	other: {
		alert:{

		},

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