#include <Wire.h>
#include <Servo.h>
#include "ServoEaser.h"

#define I2C_ADDR 0x04

const int servo0pin = 2;
const int servo1pin = 3;
const int servo2pin = 4;
const int servo3pin = 5;
const int servo4pin = 6;
const int servo5pin = 7;

const int numServos = 2;

int servoPins[6] = {2,3,4,5,6,7};

int servoFrameMillis = 20; // min time between servo updates

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
     
      if(c!=1){
         myAngles[i] = c;
      } 
      
      i++;
   }
   
   for(uint8_t i=0;i<sizeof(myAngles)/sizeof(uint8_t);i+=1){
      runServo(i, myAngles[i]); 
   }
}

void runServo(uint8_t servoNum, uint8_t angle){
    servoEaser[servoNum].easeTo(angle, 1000);
    //servoEaser[servoNum].play( myServoMoves, myServoMovesCount );
}
