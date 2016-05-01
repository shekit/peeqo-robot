#include <Wire.h>
#include <Adafruit_NeoPixel.h>

#define PIXEL_PIN 6
#define PIXEL_COUNT 12
#define RING_BRIGHTNESS 32

#define I2C_ADDR 0x04

Adafruit_NeoPixel ring = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, NEO_GRB + NEO_KHZ800);

unsigned long previousMillis=0;

// WIPE ANIMATION
unsigned long wipeInterval=50;
int currentPixel = 0;

// FADE ANIMATION
int r = 0;
int rspeed = 5;
int g = 0;
int gspeed = 5;
int b = 0;
int bspeed = 5;

// BLINK ANIMATION
unsigned long blinkinterval = 300;
boolean lights = false;

// LED STATES
boolean red = false;
boolean green = false;
boolean blue = false;
boolean off = false;
boolean fade = false;
boolean blinky = false;

// colors
uint32_t redColor = ring.Color(255,0,0);
uint32_t greenColor = ring.Color(0,255,0);
uint32_t blueColor = ring.Color(0,0,255);
uint32_t offColor = ring.Color(0,0,0);

void setup() {
  
  Wire.begin(I2C_ADDR);
  Wire.onReceive(receiveEvent);
  
  // turn on for debugging
  //Serial.begin(9600);
  
  ring.begin();
  ring.setBrightness(RING_BRIGHTNESS);
  switchOff();
}

void loop() {
  // DEBUG CODE
//  if(Serial.available()>0){
//     char i = Serial.read();
//     
//     switch(i){
//        case 'r':
//          setStatesToFalse()
//           red = true;
//           break;
//        case 'g':
//          setStatesToFalse()
//           green = true;
//           break;
//        case 'b':
//          setStatesToFalse()
//           blue = true;
//           break; 
//        case 'o':
//          setStatesToFalse()
//           off = true;
//           break;
//        case 't':
//          setStatesToFalse()
//           blinky = true;
//           break;
//        case 'p':
//          setStatesToFalse()
//           rainbow = true;
//           break;
//        case 'f':
//          setStatesToFalse()
//           fade = true;
//           break;
//        default:
//          break;
//     }  
//  }
  
  
  //i2c commands set these states
  
  if(red){
    if(millis()-previousMillis >= wipeInterval){
       previousMillis = millis();
       colorWipeMillis(redColor); 
    }
  }
  
  if(green){
    if(millis()-previousMillis >= wipeInterval){
       previousMillis = millis();
       colorWipeMillis(greenColor); 
    }
  }
  
  if(blue){
    if(millis()-previousMillis >= wipeInterval){
       previousMillis = millis();
       colorWipeMillis(blueColor); 
    }
  }
  
  if(blinky){
      if(millis()-previousMillis >= blinkinterval){
         previousMillis = millis();
         if(lights == false){
           lights = true;
         } else {
           lights = false; 
         }
         
         lightsBlink(lights);
       }
  }
    
  if(fade){
    if(millis()-previousMillis >= 20){
       previousMillis = millis();
       fadeLights();
    }
  }
  
  if(off){
    switchOff();
  }
}

void lightsBlink(boolean f){
   if(f==true){
      for(uint16_t i=0; i<ring.numPixels(); i++) {
        ring.setPixelColor(i, ring.Color(255,0,0));
        ring.show();
      }  
   } else {
       for(uint16_t i=0; i<ring.numPixels(); i++) {
        ring.setPixelColor(i, offColor);
        ring.show();
      }
   }
}

void colorWipeMillis(uint32_t c){
   ring.setPixelColor(currentPixel, c);
   ring.show();
   currentPixel++;
   if(currentPixel >= PIXEL_COUNT){
      currentPixel = 0; 
      for(uint16_t i=0; i<ring.numPixels(); i++) {
        ring.setPixelColor(i, offColor);
        ring.show();
      }
   }
}

void fadeLights(){
   
   for(int i=0; i<ring.numPixels();i++){
      ring.setPixelColor(i,ring.Color(r,g,0));
      ring.show();
   } 
   //r+=5;
   
   r+=rspeed;
   g+=gspeed;
   
   if(r >= 255 || r<=0){
      rspeed *= -1; 
      gspeed *= -1;
   }
}

void switchOff(){
  currentPixel = 0;
  for(uint16_t i=0; i<ring.numPixels(); i++) {
     ring.setPixelColor(i, offColor);
     ring.show();
  }
}


void receiveEvent(int howMany){
   while(Wire.available()>0){
      int c = Wire.read();
      
      if(c!=1){
         setLightState(c);
      }
   } 
}

void setLightState(int val){
   switch(val){
      case 2:
        setStatesToFalse();
        red = true;
        break;
      case 3:
        setStatesToFalse();
        blinky = true;
        break;
      case 4:
        setStatesToFalse();
        off = true;
        break;
      default:
        Serial.println("rubbish");
        break;
   } 
}

void setStatesToFalse(){
   //set all states to false
   red = false;
   green = false;
   blue = false;
   off = false;
   blinky = false;
   fade = false;
}

