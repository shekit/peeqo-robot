// require servo commands
const servoCmd = require('js/data/servo-cmds')

module.exports = {
	reset: {
		desc:"",
		angles:[
				[94,91,89,88,87,92]
			],
		access_cmd:[
				servoCmd.easing1000.cmd
			],
		duration: [
				servoCmd.easing1000.duration
			]
	},
	alert: {
		desc:"",
		angles:[
				[65,115,65,115,65,115]
			],
		access_cmd:[
				servoCmd.easingBounce.cmd
			],
		duration: [
				servoCmd.easingBounce.duration
			]
	},
	sad: {
		desc:"",
		angles:[
				[119,66,104,71,104,81],
				[119,66,104,71,104,81],
			],
		access_cmd:[
				servoCmd.easing2000.cmd,
				servoCmd.easing3000.cmd,
			],
		duration: [
				servoCmd.easing2000.duration,
				servoCmd.easing3000.duration,
			]
	},
	lookaway: {
		desc:"",
		angles:[
				[93,93,93,93,93,93],
				[93,93,93,93,93,93]
			],
		access_cmd:[
				servoCmd.easing500.cmd,
				servoCmd.easing500.cmd,
			],
		duration: [
				servoCmd.easing500.duration,
				servoCmd.easing500.duration,
			]
	},
	happy: {
		desc:"",
		angles:[
				[100,90,80,100,90,80],
				[80,90,100,80,90,100],
				[100,90,80,100,90,80],
				[80,90,100,80,90,100]
			],
		access_cmd:[
				servoCmd.easing500.cmd,
				servoCmd.easing500.cmd,
				servoCmd.easing500.cmd,
				servoCmd.easing500.cmd
			],
		duration: [
				servoCmd.easing500.duration,
				servoCmd.easing500.duration,
				servoCmd.easing500.duration,
				servoCmd.easing500.duration
			]
	},
	bye: {
		desc:"",
		angles:[
				[100,90,80,100,90,80],
				[80,90,100,80,90,100],
				[100,90,80,100,90,80],
				[80,90,100,80,90,100]
			],
		access_cmd:[
				servoCmd.easing500.cmd,
				servoCmd.easing500.cmd,
				servoCmd.easing500.cmd,
				servoCmd.easing500.cmd
			],
		duration: [
				servoCmd.easing500.duration,
				servoCmd.easing500.duration,
				servoCmd.easing500.duration,
				servoCmd.easing500.duration
			]
	},
	curious: {
		desc:"",
		angles:[
				[94,82,82,98,98,86],		// double to increase duration that is stops for
				[94,82,82,98,98,86],
			],
		access_cmd:[
				servoCmd.easing500.cmd,
				servoCmd.easing500.cmd
			],
		duration: [
				servoCmd.easing500.duration,
				servoCmd.easing500.duration
			]
	},
	boop: {
		desc:"",
		angles:[
				[90,100,80,80,100,90],		// double to increase duration that is stops for
				[90,100,80,80,100,90],
			],
		access_cmd:[
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd
			],
		duration: [
				servoCmd.easing200.duration,
				servoCmd.easing200.duration
			]
	},
	no: {
		desc:"",
		angles:[
				[96,96,96,96,96,96],		
				[84,84,84,84,84,84],
				[96,96,96,96,96,96],
			],
		access_cmd:[
				servoCmd.easing1000.cmd,
				servoCmd.easing1000.cmd,
				servoCmd.easing1000.cmd,
			],
		duration: [
				servoCmd.easing1000.duration,
				servoCmd.easing1000.duration,
				servoCmd.easing1000.duration,
			]
	},

	yes: {
		desc:"",
		angles:[
				[83,94,94,90,94,83],		
				[97,87,87,90,87,97],
				[83,94,94,90,94,83],
				[97,87,87,90,87,97]
			],
		access_cmd:[
				servoCmd.easing500.cmd,
				servoCmd.easing500.cmd,
				servoCmd.easing500.cmd,
				servoCmd.easing500.cmd,
			],
		duration: [
				servoCmd.easing500.duration,
				servoCmd.easing500.duration,
				servoCmd.easing500.duration,
				servoCmd.easing500.duration,
			]
	},
	lookup: {
		desc:"",
		angles:[
				[83,94,94,90,94,83],
				[83,94,94,90,94,83],
				[83,94,94,90,94,83]
			],
		access_cmd:[
				servoCmd.easing1000.cmd,
				servoCmd.easing500.cmd,
				servoCmd.easing500.cmd
			],
		duration: [
				servoCmd.easing500.duration,
				servoCmd.easing500.duration,
				servoCmd.easing500.duration
			]
	},
	nod: {
		desc:"",
		angles:[
				[100,85,85,90,85,100],
				[80,95,95,90,95,80],
				[100,85,85,90,85,100],
				[80,95,95,90,95,80],
			],
		access_cmd:[
				servoCmd.easing500.cmd,
				servoCmd.easing500.cmd,
				servoCmd.easing500.cmd,
				servoCmd.easing500.cmd
			],
		duration: [
				servoCmd.easing500.duration,
				servoCmd.easing500.duration,
				servoCmd.easing500.duration,
				servoCmd.easing500.duration
			]
	},
	musicSway: {
		desc:"",
		angles:[
				[100,90,80,100,90,80],		
				[80,90,100,80,90,100],
				[100,90,80,100,90,80],	
				[80,90,100,80,90,100],
				[100,90,80,100,90,80],
				[80,90,100,80,90,100],
				[100,90,80,100,90,80],		
				[80,90,100,80,90,100],
				[100,90,80,100,90,80],	
				[80,90,100,80,90,100],
				[100,90,80,100,90,80],
				[80,90,100,80,90,100],	
			],
		access_cmd:[
				servoCmd.easing2000.cmd,
				servoCmd.easing2000.cmd,
				servoCmd.easing2000.cmd,
				servoCmd.easing2000.cmd,
				servoCmd.easing2000.cmd,
				servoCmd.easing2000.cmd,
				servoCmd.easing2000.cmd,
				servoCmd.easing2000.cmd,
				servoCmd.easing2000.cmd,
				servoCmd.easing2000.cmd,
				servoCmd.easing2000.cmd,
				servoCmd.easing2000.cmd,
			],
		duration: [
				servoCmd.easing2000.duration,
				servoCmd.easing2000.duration,
				servoCmd.easing2000.duration,
				servoCmd.easing2000.duration,
				servoCmd.easing2000.duration,
				servoCmd.easing2000.duration,
				servoCmd.easing2000.duration,
				servoCmd.easing2000.duration,
				servoCmd.easing2000.duration,
				servoCmd.easing2000.duration,
				servoCmd.easing2000.duration,
				servoCmd.easing2000.duration,
			]
	},
	headBang: {
		desc:"",
		angles:[
				[105,83,83,90,83,105],		
				[94,91,89,88,87,92],
				[105,83,83,90,83,105],		
				[94,91,89,88,87,92],
				[105,83,83,90,83,105],		
				[94,91,89,88,87,92],
				[105,83,83,90,83,105],		
				[94,91,89,88,87,92],
				[105,83,83,90,83,105],		
				[94,91,89,88,87,92],
				[105,83,83,90,83,105],		
				[94,91,89,88,87,92],
				[105,83,83,90,83,105],		
				[94,91,89,88,87,92],
				[105,83,83,90,83,105],		
				[94,91,89,88,87,92],
				[105,83,83,90,83,105],		
				[94,91,89,88,87,92]
			],
		access_cmd:[
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
			],
		duration: [
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
			]
	},

	dance: {
		desc:"",
		angles:[
				[100,90,80,100,90,80],		
				[90,80,100,100,80,90],
				[80,90,100,80,90,100],	
				[90,100,80,80,100,90],
				[100,90,80,100,90,80],		
				[90,80,100,100,80,90],
				[80,90,100,80,90,100],	
				[90,100,80,80,100,90],
				[80,90,100,80,90,100],
				[100,90,80,100,90,80],

			],
		access_cmd:[
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easingBounce.cmd,
				servoCmd.easingBounce.cmd
			],
		duration: [
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easingBounce.duration,
				servoCmd.easingBounce.duration,
			]
	},

	angry:{
		desc:"",
		angles:[
				[65,115,65,115,65,115],		
				[115,65,115,65,115,65]

			],
		access_cmd:[
				servoCmd.easing200.cmd,
				servoCmd.easing2000.cmd,
			],
		duration: [
				servoCmd.easing200.duration,
				servoCmd.easing2000.duration,
			]
	},
	abouttime:{
		desc:"",
		angles:[
				[90,100,80,80,100,90],		
				[94,91,89,88,87,92]

			],
		access_cmd:[
				servoCmd.easing1500.cmd,
				servoCmd.easingBounce.cmd
			],
		duration: [
				servoCmd.easing1500.duration,
				servoCmd.easingBounce.duration,
			]
	},

	excited: {
		desc:"",
		angles:[
				[65,115,65,115,65,115],
				[115,65,115,65,115,65],
				[65,115,65,115,65,115],
				[115,65,115,65,115,65],
				[65,115,65,115,65,115],
				[115,65,115,65,115,65],
			],
		access_cmd:[
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd
			],
		duration: [
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration
			]
	},
	tickle: {
		desc:"",
		angles:[
				[105,90,75,105,90,75],		// double to increase duration that is stops for
				[105,90,75,105,90,75],
				[105,90,75,105,90,75],
				[105,90,75,105,90,75],
			],
		access_cmd:[
				servoCmd.easing200.cmd,
				servoCmd.easing3000.cmd,
				servoCmd.easing3000.cmd,
				servoCmd.easing3000.cmd
			],
		duration: [
				servoCmd.easing200.duration,
				servoCmd.easing3000.duration,
				servoCmd.easing3000.duration,
				servoCmd.easing3000.duration,
			]
	},

	
	confused: {
		desc:"",
		angles:[
				[94,82,82,98,98,86],		// double to increase duration that is stops for
				[94,82,82,98,98,86],
			],
		access_cmd:[
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd
			],
		duration: [
				servoCmd.easing200.duration,
				servoCmd.easing200.duration
			]
	},

	wakeup:{
		desc:"",
		angles:[
				[96,96,96,96,96,96],		
				[84,84,84,84,84,84],
				[96,96,96,96,96,96],
				[84,84,84,84,84,84],
				[65,115,65,115,65,115],
			],
		access_cmd:[
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easing200.cmd,
				servoCmd.easingBounce.cmd
			],
		duration: [
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easing200.duration,
				servoCmd.easingBounce.duration
			]
	},
	sleep:{
		desc:"",
		angles:[
				[90,100,80,80,100,90],		
				[90,80,100,100,80,90],
				[90,100,80,80,100,90],		
				[90,80,100,100,80,90],
				[90,100,80,80,100,90],		
				[90,80,100,100,80,90],
				[90,100,80,80,100,90],		
				[90,80,100,100,80,90],
				[90,100,80,80,100,90],		
				[90,80,100,100,80,90],
				[90,100,80,80,100,90],		
				[90,80,100,100,80,90],
			],
		access_cmd:[
				servoCmd.easing2000.cmd,
				servoCmd.easing500.cmd,
				servoCmd.easing2000.cmd,
				servoCmd.easing500.cmd,
				servoCmd.easing2000.cmd,
				servoCmd.easing500.cmd,
				servoCmd.easing2000.cmd,
				servoCmd.easing500.cmd,
				servoCmd.easing2000.cmd,
				servoCmd.easing500.cmd,
				servoCmd.easing2000.cmd,
				servoCmd.easing500.cmd,
			],
		duration: [
				servoCmd.easing2000.duration,
				servoCmd.easing500.duration,
				servoCmd.easing2000.duration,
				servoCmd.easing500.duration,
				servoCmd.easing2000.duration,
				servoCmd.easing500.duration,
				servoCmd.easing2000.duration,
				servoCmd.easing500.duration,
				servoCmd.easing2000.duration,
				servoCmd.easing500.duration,
				servoCmd.easing2000.duration,
				servoCmd.easing500.duration,
			]
	}
}