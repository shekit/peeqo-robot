'use strict';

const electron = require('electron');
const spawn = require('child_process').spawn
const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on('ready', function(){
	mainWindow = new BrowserWindow({
		width: 800,
		height: 480
	})

	mainWindow.loadURL('file://'+__dirname+'/app/index.html')

	if(process.platform == 'darwin'){
		mainWindow.webContents.openDevTools();
	} else {
		// for full screen on pi
		mainWindow.webContents.openDevTools();
		//mainWindow.setMenu(null);
		//mainWindow.setFullScreen(true);
		//mainWindow.maximize();
	}

})

var listenProcess = spawn('node', ['./listen.js'], {detached: false})

listenProcess.stderr.on('data', function (data) {
  var message = data.toString()
  console.log("ERROR", message.substring(4))
})

listenProcess.stdout.on('data', function (data) {
	var message = data.toString()
	if (message.startsWith('!h:')) {
	    mainWindow.webContents.send('hotword', true)
	  } else if (message.startsWith('!p:')) {
	    mainWindow.webContents.send('partial-results', message.substring(4))
	  } else if (message.startsWith('!f:')) {
	    mainWindow.webContents.send('final-results', message.substring(4))
	  } else {
	    console.error(message.substring(3))
	  }
})

app.on('will-quit', function () {
  listenProcess.kill()
})

app.on('window-all-closed', function(){
	app.quit();
})

