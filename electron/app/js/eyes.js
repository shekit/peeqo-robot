const event = require('js/events')
const Snap = require('snapsvg')
const snap = Snap("#eyes")

module.exports = function(){

	console.log("EYES")

	function randRange(data){
		var newTime = data[Math.floor(data.length * Math.random())];
       	return newTime;
	}

	var peeqoEyes = {}

	peeqoEyes.eyeSize = 87.5
	peeqoEyes.closedEye = 1
	peeqoEyes.sleepEye = 10
	peeqoEyes.closeEyeDuration = 120;
	peeqoEyes.openEyeDuration = 200;
	peeqoEyes.fastCloseEyeDuration = 90;
	peeqoEyes.fastOpenEyeDuration = 120;
	peeqoEyes.blinkIntervalStart = 4000;
	peeqoEyes.blinkIntervals = [4000, 6000, 10000, 1000, 500, 8000, 500]
	peeqoEyes.transitionSize = 1000
	peeqoEyes.transitionSpeed = 100
	peeqoEyes.transitionFromSpeed = 200
	peeqoEyes.blinking = null
	peeqoEyes.isBlinking = false;

	peeqoEyes.left_eye = snap.ellipse(202.5,330,peeqoEyes.eyeSize, peeqoEyes.eyeSize);
	peeqoEyes.right_eye = snap.ellipse(604.5,330,peeqoEyes.eyeSize, peeqoEyes.eyeSize);

	peeqoEyes.eyes = snap.group(peeqoEyes.left_eye, peeqoEyes.right_eye)

	peeqoEyes.eyes.attr({
		fill:"#000000"
	})

	peeqoEyes.startBlinking = function(){
		peeqoEyes.setIsSleeping(false)
		peeqoEyes.setIsBlinking(true)
		peeqoEyes.blinking = setInterval(peeqoEyes.blink, peeqoEyes.blinkIntervalStart);
	}

	peeqoEyes.setIsBlinking = function(state){
		peeqoEyes.isBlinking = state
	}

	peeqoEyes.open = function(){
		peeqoEyes.setIsSleeping(false)
		peeqoEyes.left_eye.animate({ry:peeqoEyes.eyeSize}, peeqoEyes.openEyeDuration, mina.easein());
		peeqoEyes.right_eye.animate({ry:peeqoEyes.eyeSize}, peeqoEyes.openEyeDuration, mina.easein(), function(){
			if(!peeqoEyes.isBlinking){
				event.emit("start-blinking")
			}
			
		});
	}

	peeqoEyes.transitionToGif = function(cb){
		console.log("TRANSITION TO GIF")
		if(peeqoEyes.isBlinking){
			event.emit("stop-blinking")
		}
		peeqoEyes.left_eye.animate({ry:peeqoEyes.transitionSize,rx:peeqoEyes.transitionSize}, peeqoEyes.transitionSpeed*3, mina.elastic())
		peeqoEyes.right_eye.animate({ry:peeqoEyes.transitionSize,rx:peeqoEyes.transitionSize}, peeqoEyes.transitionSpeed*3, mina.elastic(), function(){
			cb()
		})
		
	}

	peeqoEyes.getIsSleeping = function(){
		return global.isSleeping
	}

	peeqoEyes.setIsSleeping = function(bool){
		isSleeping = bool
		console.log(isSleeping)
	}

	peeqoEyes.transitionFromGif = function(obj){
		peeqoEyes.left_eye.animate({ry:peeqoEyes.eyeSize,rx:peeqoEyes.eyeSize}, peeqoEyes.transitionFromSpeed, mina.easein())
		peeqoEyes.right_eye.animate({ry:peeqoEyes.eyeSize,rx:peeqoEyes.eyeSize}, peeqoEyes.transitionFromSpeed, mina.easein(), function(){
			if(!peeqoEyes.isBlinking){
				event.emit("start-blinking")
			}
			if(obj && typeof(obj.callback)=='function'){
				obj.callback()
			}
			
		})
	}

	peeqoEyes.close = function(){
		peeqoEyes.setIsSleeping(true)
		if(peeqoEyes.isBlinking){
			event.emit("stop-blinking")
		}
		
		peeqoEyes.left_eye.animate({ry:peeqoEyes.sleepEye}, peeqoEyes.closeEyeDuration,mina.elastic())

		peeqoEyes.right_eye.animate({ry:peeqoEyes.sleepEye}, peeqoEyes.closeEyeDuration,mina.elastic())
	}

	peeqoEyes.blink = function(){
		peeqoEyes.left_eye.animate({ry:peeqoEyes.closedEye}, peeqoEyes.closeEyeDuration,mina.elastic(), function(){
			peeqoEyes.left_eye.animate({ry:peeqoEyes.eyeSize}, peeqoEyes.openEyeDuration, mina.easein());
		})

		peeqoEyes.right_eye.animate({ry:peeqoEyes.closedEye}, peeqoEyes.closeEyeDuration,mina.elastic(), function(){
			peeqoEyes.right_eye.animate({ry:peeqoEyes.eyeSize}, peeqoEyes.openEyeDuration, mina.easein());
		})

		clearInterval(peeqoEyes.blinking)

		peeqoEyes.blinking = setInterval(peeqoEyes.blink, randRange(peeqoEyes.blinkIntervals));
	}

	peeqoEyes.fastBlink = function(){
		peeqoEyes.left_eye.animate({ry:peeqoEyes.closedEye}, peeqoEyes.fastCloseEyeDuration,mina.elastic(), function(){
			peeqoEyes.left_eye.animate({ry:peeqoEyes.eyeSize}, peeqoEyes.fastOpenEyeDuration, mina.easein(), function(){
				peeqoEyes.left_eye.animate({ry:peeqoEyes.closedEye}, peeqoEyes.fastCloseEyeDuration,mina.elastic(), function(){
					peeqoEyes.left_eye.animate({ry:peeqoEyes.eyeSize}, peeqoEyes.fastOpenEyeDuration, mina.easein())
				})
			});
		})

		peeqoEyes.right_eye.animate({ry:peeqoEyes.closedEye}, peeqoEyes.fastCloseEyeDuration,mina.elastic(), function(){
			peeqoEyes.right_eye.animate({ry:peeqoEyes.eyeSize}, peeqoEyes.fastOpenEyeDuration, mina.easein(), function(){
				peeqoEyes.right_eye.animate({ry:peeqoEyes.closedEye}, peeqoEyes.fastCloseEyeDuration,mina.elastic(), function(){
					peeqoEyes.right_eye.animate({ry:peeqoEyes.eyeSize}, peeqoEyes.fastOpenEyeDuration, mina.easein())
				})
			});
		})
	}

	peeqoEyes.stopBlinking = function(){
		peeqoEyes.setIsBlinking(false)
		clearInterval(peeqoEyes.blinking);
	}



	return peeqoEyes


}