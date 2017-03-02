/* =========================================================================
 Stewart Platform
 Read incomming data from processing 
 * ========================================================================= */

//libraries
#include <Servo.h>

//servo stuff
//MIN and MAX PWM pulse sizes, they can be found in servo documentation
#define MAX 2300
#define MIN 700

Servo servo[6];  // create servo object to control a servo 

int zeroAll = 90; // variable to store the servo position 


void setup() {  

  // initialize serial communication
  // The rate is up to you depending on your project)
  Serial.begin(115200);
  while (!Serial); // wait for Leonardo enumeration, others continue immediately

  //servo stuff
  //attachment of servos to PWM digital pins of arduino
  servo[0].attach(2);   //change MIN & MAX to calibrate servo
  servo[1].attach(3);  
  servo[2].attach(4);
  servo[3].attach(5);
  servo[4].attach(6);
  servo[5].attach(7);
  
  servo[0].writeMicroseconds(1515);
  servo[1].writeMicroseconds(1485);
  servo[2].writeMicroseconds(1465);
  servo[3].writeMicroseconds(1455);
  servo[4].writeMicroseconds(1450);
  servo[5].writeMicroseconds(1500);
} 

void loop() 
{ 
  //read and write to servos
  servoControl(); 
}




