
import controlP5.*;  //sliders and buttons
ControlP5 cp5;
int myColor = color(0, 0, 0);  //color

int sliderValue;

int increment = 1;

Slider Yaw;
Slider Z;
Slider2D XY;
Slider2D RollPitch;

boolean record = false;

//Button showValue;

float n = 90.0; //neatral float for setting value


void setup() {
  size(500, 500, OPENGL);
  frame.setTitle("control panel");
  fill(0);
  noStroke();

  // display serial port list for debugging/clarity
  //println(Serial.list());

  // get the first available port (use EITHER this OR the specific port code below)
  //String portName = Serial.list()[5];

  // get a specific serial port (use EITHER this OR the first-available code above)
  String portName = "/dev/cu.usbmodemFA131";

  // open the serial port
  //port = new Serial(this, portName, 115200);

  
  //sliders
  cp5 = new ControlP5(this);
  
  cp5.addButton("resetAll")
    .setValue(100)
    .setPosition(300,200)
    .setSize(200,19);
  
  cp5.addButton("showValues")
    .setValue(100)
    .setPosition(300,100)
    .setSize(200,19);
    
  cp5.addButton("record")
    .setValue(100)
    .setPosition(300,300)
    .setSize(200,19);
    
  cp5.addButton("printRecorded")
    .setValue(100)
    .setPosition(300,400)
    .setSize(200,19);
  
  cp5.addButton("showValues")
    .setValue(100)
    .setPosition(300,100)
    .setSize(200,19);
  
  cp5.addButton("showValues")
    .setValue(100)
    .setPosition(300,100)
    .setSize(200,19);

  Yaw = cp5.addSlider("Yaw")
    .setPosition(270, 350)
      .setRange(0, 180)
        .setSize(180, 20)
          .setValue(n)
            ;
  Z = cp5.addSlider("Z axis")
    .setPosition(270, 50)
      .setRange(0, 180)
        .setSize(20, 180)
          .setValue(n)
            ;
  XY = cp5.addSlider2D("XY axis")
    .setPosition(50, 50)
      .setSize(180, 180)
        .setMaxX (180)
          .setMaxY (180)
            .setMinX (0)
              .setMinY (0)
              .setArrayValue(new float[] {
                n, n
              }
  )

    //.disableCrosshair()
    ;
  RollPitch = cp5.addSlider2D("Roll Pitch")
    .setPosition(50, 270)
      .setSize(180, 180)
        .setMaxX (180)
          .setMaxY (180)
            .setMinX (0)
              .setMinY (0)
              .setArrayValue(new float[] {
                n, n
              }
  )

    .setSize(180, 180)
      //.disableCrosshair()
      ;
}

public void showValues(int theValue){
   println(valueString); 
}

public void resetAll(int theValue){
    Z.setValue(n);
    XY.setArrayValue(new float[] {n,n});
    Yaw.setValue(n);
    RollPitch.setArrayValue(new float[] {n,n});
}

public void record(int theValue){
   record = !record; 
}

public void printRecorded(int theValue){
   println(recorded); 
}

void draw() {
  background(myColor);
  fill(sliderValue);

  //calculate servo position
  calcServo();
}

void keyReleased(){
   if(key=='z'){
      float temp = Z.getValuePosition();
      Z.setValue(temp+=increment);
   } 
   if(key=='Z'){
      float temp = Z.getValuePosition();
      Z.setValue(temp-=increment);
   }
   
   if(keyCode == RIGHT){
      float[] xy = XY.getArrayValue(); //get value
      float X = xy[0];
      float Y = xy[1];
      XY.setArrayValue(new float[] {X+=increment,Y}); 
   }
   
   if(keyCode == LEFT){
      float[] xy = XY.getArrayValue(); //get value
      float X = xy[0];
      float Y = xy[1];
      XY.setArrayValue(new float[] {X-=increment,Y}); 
   }
   
   if(keyCode == UP){
      float[] xy = XY.getArrayValue(); //get value
      float X = xy[0];
      float Y = xy[1];
      XY.setArrayValue(new float[] {X,Y+=increment}); 
   }
   
   if(keyCode == DOWN){
      float[] xy = XY.getArrayValue(); //get value
      float X = xy[0];
      float Y = xy[1];
      XY.setArrayValue(new float[] {X,Y-=increment}); 
   }
   
   if(key=='y'){
      float temp = Yaw.getValuePosition();
      Yaw.setValue(temp+=increment);
   }
   
   if(key=='Y'){
      float temp = Yaw.getValuePosition();
      Yaw.setValue(temp-=increment);
   }
   
   if(key == 'd'){
      float[] xy = RollPitch.getArrayValue(); //get value
      float X = xy[0];
      float Y = xy[1];
      RollPitch.setArrayValue(new float[] {X+=increment,Y}); 
   }
   
   if(key == 'a'){
      float[] xy = RollPitch.getArrayValue(); //get value
      float X = xy[0];
      float Y = xy[1];
      RollPitch.setArrayValue(new float[] {X-=increment,Y}); 
   }
   
   if(key == 'w'){
      float[] xy = RollPitch.getArrayValue(); //get value
      float X = xy[0];
      float Y = xy[1];
      RollPitch.setArrayValue(new float[] {X,Y+=increment}); 
   }
   
   if(key == 's'){
      float[] xy = RollPitch.getArrayValue(); //get value
      float X = xy[0];
      float Y = xy[1];
      RollPitch.setArrayValue(new float[] {X,Y-=increment}); 
   }
}



