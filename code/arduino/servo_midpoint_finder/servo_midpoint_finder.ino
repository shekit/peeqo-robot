#include <Servo.h>

Servo myservo;

char c = 'a';

int val = 1475;

void setup(){
  myservo.attach(7);
  myservo.writeMicroseconds(1475); 
  //myservo.write(90);
  Serial.begin(9600);
}

void loop(){
  if(Serial.available() > 0){
    c = Serial.read();
    
    changeServo(c);
  }
}

void changeServo(char b){
   switch(b){
      case 'w':
        val+=5;
        myservo.writeMicroseconds(val);
        Serial.println(val);
        break;
      case 's':
        val -= 5;
        myservo.writeMicroseconds(val);
        Serial.println(val);
        break;
      default:
        Serial.println("invalid char");
        break;
   }

}
