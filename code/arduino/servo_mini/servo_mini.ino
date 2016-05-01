#include <Wire.h>
#include <Servo.h>
#include "ServoEaser.h"

#define I2C_ADDR 0x04

const int numServos = 2;

int servoPins[6] = {2,3,4,5,6,7};

int servoFrameMillis = 20; // min time between servo updates

int easeDuration = 1000;

Servo servo[6];
ServoEaser servoEaser[6];

int myServoMovesCount = 8;
// configurable list of servo moves
ServoMove myServoMoves[] = {
// angle, duration
    {0,   500},
    {45,  500},
    {20,   500},
    {90,  1000},
    {45,  500},
    {135, 2000},
    {75,  500},
    {165, 1000},
};


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
      if(c==1){
         easeDuration = 1000; 
      }
      
      if(c==2){
         easeDuration = 2000; 
      }
      
      if(c==3){
         easeDuration = 4000; 
      }
       
      // this is done only if the bytes dont match the cmd parameter
      // helps eliminate first cmd para sent from node
      if(c>3){
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
    //servoEaser[servoNum].play( myServoMoves, myServoMovesCount );
}
