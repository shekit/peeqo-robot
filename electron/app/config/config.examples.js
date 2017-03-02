module.exports = {
	
	giphy:{
		key:'dc6zaTOxFJmzC',
		max_gif_size: 800000
	},
	spotify: {
		key:''
	},
	wifi: {
		ssid:'',
		pass:''
	},
	timezone: {
		key:''
	},
	hue: {
		user:'',
		ip:''
	},
	peeqo: {
		server:''
	},
	apiAi: {
		server: '',
		token: '', 
		sessionId: ''
	},
	language: "en-US",
	speech: {
        projectId: '',
        keyFilename: '',
        keyword: "peeqo",
        model: "Peeqo.pmdl", // The name of your model
        sensitivity: 0.5, // Keyword getting too many false positives or not detecting? Change this.
        continuous: false // After a keyword is detected keep listening until speech is not heard
    },

	wit: {
		token: ''
	}
}