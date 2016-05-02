#include <Wire.h>
#include <Servo.h>
#include "ServoEaser.h"

#define I2C_ADDR 0x07

const int numServos = 2;

int servoPins[6] = {2,3,4,5,6,7};

int servoFrameMillis = 20; // min time between servo updates

int easeDuration = 1000; //default duration



Servo servo[6];
ServoEaser servoEaser[6];

// EASING FUNCTIONS

float easeInOutQuad (float t, float b, float c, float d) {
	if ((t/=d/2) < 1) return c/2*t*t + b;
	return -c/2 * ((--t)*(t-2) - 1) + b;
}

float easeInOutCubic (float t, float b, float c, float d) {
	if ((t/=d/2) < 1) return c/2*t*t*t + b;
	return c/2*((t-=2)*t*t + 2) + b;
}

float easeInOutQuart (float t, float b, float c, float d) {
	if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
	return -c/2 * ((t-=2)*t*t*t - 2) + b;
}

float easeInOutQuint (float t, float b, float c, float d) {
	if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
	return c/2*((t-=2)*t*t*t*t + 2) + b;
}

float easeOutBounce (float t, float b, float c, float d) {
	if ((t/=d) < (1/2.75)) {
		return c*(7.5625*t*t) + b;
	} else if (t < (2/2.75)) {
		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
	} else if (t < (2.5/2.75)) {
		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
	} else {
		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
	}
}

void setup() {
  // put your setup code here, to run once:
  Wire.begin(I2C_ADDR);
  Wire.onReceive(receiveEvent);
  
  for(int i=0;i<numServos;i++){
     servo[i].attach(servoPins[i]); 
  }
  
  for(int i=0;i<numServos;i++){
    servoEaser[i].begin(servo[i], servoFrameMillis);
    servoEaser[i].useMicroseconds(true);
    servoEaser[i].setEasingFunc(easeInOutCubic);
  }
  
  resetServos();
  
}

void loop() {

  for(int i=0;i<numServos;i++){
     servoEaser[i].update(); 
  }

}

void receiveEvent(int howMany){
   
   uint8_t myAngles[numServos]; 
    
   int i = -1; //set this to -1 because first byte is command sent from node which i dont want 
   
   while(Wire.available()>0){
      uint8_t c = Wire.read();
      
      // use cmd parameter from node to set duration of easing
      // since they are so small i can expect servo angles to not conflict with these
      if(c==1){
         easeDuration = 1000; 
      }
      
      if(c==2){
         easeDuration = 2000; 
      }
      
      if(c==3){
         easeDuration = 4000; 
      }
      
      // define a cmd or char to reset servos
      if(c==4){
         resetServos();
      }
       
      // this is done only if the bytes dont match the cmd parameter
      // helps eliminate first cmd para sent from node
      if(c>4){
         myAngles[i] = c;
      } 
      
      i++;
   }
   
   for(uint8_t i=0;i<sizeof(myAngles)/sizeof(uint8_t);i+=1){
      runServo(i, myAngles[i]); 
   }
}

void runServo(uint8_t servoNum, uint8_t angle){
    servoEaser[servoNum].easeTo(angle, easeDuration);
}

void resetServos(){
  
  // these values were calibrated for each servo
  
  servo[0].writeMicroseconds(1515);
  servo[1].writeMicroseconds(1485);
  servo[2].writeMicroseconds(1465);
  servo[3].writeMicroseconds(1455);
  servo[4].writeMicroseconds(1450);
  servo[5].writeMicroseconds(1500);
}
