

String val; //store incomming string
char command[3];
boolean started = false; //has the comunication started?

void servoControl(){

  // send data only when you receive data:
  while(Serial.available() > 0) {  

    for (int i = 0; i < 6; i = i + 1) {

      // read string unitil @ received from processing
      val = Serial.readStringUntil('@');
      //Serial.println(val);

      // turn val into an int and wrotate servo
      servo[i].write(val.toInt());
      // print what is going on
      // Serial.println(val.toInt());
    }    
  }
}    



