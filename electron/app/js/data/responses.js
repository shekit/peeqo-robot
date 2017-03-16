module.exports = {
	reaction:{
		sad:{
			local:{
				folder: '',
				files: []
			}
			remote:[],
			servo: "",
		},
		happy:{
			local:[],
			remote:[],
			servo: "",
		},
		excited:{
			local:[],
			remote:[],
			servo: "",
		},
		angry:{
			local:[],
			remote:[],
			servo: "",
		},
		smile:{
			local:[],
			remote:[],
			servo: "",
		},
		confused:{
			local:[],
			remote:[],
			servo: "",
		},
		no:{
			local:[],
			remote:[],
			servo: "",
		},
		yes:{
			local:[],
			remote:[],
			servo: "",
		},
		wink:{
			local:[],
			remote:[],
			servo: "",
		},
		eyeroll:{
			local:[],
			remote:[],
			servo: "",
		},
		facepalm:{
			local:[],
			remote:[],
			servo: "",
		},
		shrug:{
			local:[],
			remote:[],
			servo: "",
		},



	},

	greeting: {
		hello:{
			local:{
				folder: 'r_hello',
				files: ["hello.gif","hi.gif","hi2.gif","hi3.gif"],
			}
			remote:["hello","hi","howdy","whatsup","sup"],
			servo: null,
			led: "greenBlink",
			sound:null
		},
		bye: {
			local:["bye2.gif","bye3.gif"],
			remote:["goodbye","ciao","see you","bye bye"],
			servo: ""
		},
		goodmorning: {
			local:[],
			remote:[],
			servo: "",
		}
	},

	information: {
		weather:{
			local:[],
			remote: []
		},

		misc:{

		}

		music:{
			local: [],
			remote: [],
			servo: ""
		}

	}
}