import processing.serial.*;

//Serial port;   // The serial port

int time;
int wait = 0;

int N = 90; //neutral for calculations

String [] valueString = new String[6];

void calcServo(){
 // clean up X & Y
  float[] xy = XY.getArrayValue(); //get value
  float X = xy[0];
  float Y = xy[1];

  int [] Xcalc = new int[6];
  Xcalc[0] = round(180 - X - N); //pos=0
  Xcalc[1] = round(0.5*X + 45 - N); //pos=45 but reads neg=135 -> inverse
  Xcalc[2] = round(0.5*X + 45 - N);  //pos=135
  Xcalc[3] = round(90 - N); //pos=90 but reads neg=90 -> inverse
  Xcalc[4] = round(0.5*X + 45 - N);//pos=135
  Xcalc[5] = round(180 -X - N);//pos=180 but reads 0 -> inverse

  int [] Ycalc = new int[6];
  Ycalc[5] = round(-0.5*Y + 135 - N); //pos=0
  Ycalc[4] = round(Y - N); //pos=45 but reads neg=135 -> inverse
  Ycalc[3] = round(Y - N);  //pos=135
  Ycalc[2] = round(180 - Y - N); //pos=90 but reads neg=90 -> inverse
  Ycalc[1] = round(180 - Y - N);//pos=135
  Ycalc[0] = round(0.5*Y + 45 - N);//pos=180 but reads 0 -> inverse


  // clean up Roll & Pitch
  float[] rollpitch = RollPitch.getArrayValue(); //get value
  float Roll = rollpitch[0];
  float Pitch = rollpitch[1];

  int [] Rollcalc = new int[6];
  Rollcalc[5] = round(90 - N); //pos=0
  Rollcalc[4] = round(Roll - N); //pos=45 but reads neg=135 -> inverse
  Rollcalc[3] = round(180 - Roll - N);  //pos=135
  Rollcalc[2] = round(180 - Roll - N); //pos=90 but reads neg=90 -> inverse
  Rollcalc[1] = round(Roll - N);//pos=135
  Rollcalc[0] = round(90 - N);//pos=180 but reads 0 -> inverse

  int Rollcon0 = constrain(Rollcalc[0], -90, 0);
  int Rollcon5 = constrain(Rollcalc[5], 0, 90);

  int [] Pitchcalc = new int[6];
  Pitchcalc[5] = round(180 - Pitch - N); //pos=0
  Pitchcalc[4] = round(90 - N); //pos=45 but reads neg=135 -> inverse
  Pitchcalc[3] = round(Pitch - N);  //pos=135
  Pitchcalc[2] = round(180 - Pitch - N); //pos=90 but reads neg=90 -> inverse
  Pitchcalc[1] = round(90 - N);//pos=135
  Pitchcalc[0] = round(Pitch - N);//pos=180 but reads 0 -> inverse

  // clean Z & Yaw
  float z = Z.getValuePosition(); //get value
  float yaw = Yaw.getValuePosition(); //get value

  String valZ = nf(z, 3, 0); //3 bits at the time
  String valYaw = nf(yaw, 3, 0); //3 bits at the time

  String cleanZ = valZ.substring(0, 3); //substring of 000.
  String cleanYaw = valYaw.substring(0, 3); //substring of 000.

  int YAW = parseInt(cleanYaw) - N;  //get YAW int to calculate
  int ZAX = parseInt(cleanZ);  //get Z int to calculate

  int POS = ZAX + YAW;  //make it int to calcultae with
  int NEG = 180 - ZAX + YAW;  //calculate neg

  int positive = constrain(POS, 0, 180);
  int negative = constrain(NEG, 0, 180);


  //calculate values
  int [] calc = new int[6];
  calc[0] =  constrain(negative + Xcalc[0] + Ycalc[0] + Rollcon0 + Pitchcalc[0], 0, 180); //string is ready for arduino
  calc[1] =  constrain(positive + Xcalc[1] + Ycalc[1] + Rollcalc[1] + Pitchcalc[1], 0, 180);
  calc[2] =  constrain(negative + Xcalc[2] + Ycalc[2] + Rollcalc[2] + Pitchcalc[2], 0, 180); //string is ready for arduino
  calc[3] =  constrain(positive + Xcalc[3] + Ycalc[3] + Rollcalc[3] + Pitchcalc[3], 0, 180);
  calc[4] =  constrain(negative + Xcalc[4] + Ycalc[4] + Rollcalc[4] + Pitchcalc[4], 0, 180); //string is ready for arduino
  calc[5] =  constrain(positive + Xcalc[5] + Ycalc[5] + Rollcon5 + Pitchcalc[5], 0, 180);

  String [] str = new String[6]; //string is ready for arduino
  str[0] =  str(calc[0]); //pos
  str[1] =  str(calc[1]);
  str[2] =  str(calc[2]); //pos
  str[3] =  str(calc[3]);
  str[4] =  str(calc[4]); //pos
  str[5] =  str(calc[5]); 
  
  valueString = str;
  
  //check the difference between now and the previously stored time is greater than the wait interval
  if (millis() - time >= wait) {
    for (String i : str) {
      //port.write(i + '@');
      //println(i); 
      //delay(1);
    }
    time = millis();//also update the stored time
  }
}
