#include <Wire.h>
#include <Adafruit_NeoPixel.h>

#define PIXEL_PIN 6
#define PIXEL_COUNT 12
#define RING_BRIGHTNESS 32

#define I2C_ADDR 0x04

Adafruit_NeoPixel ring = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, NEO_GRB + NEO_KHZ800);

unsigned long previousMillis=0;

int animationCount = 0;
boolean limitAnimation = false;

// WIPE ANIMATION
unsigned long wipeInterval=50;
int currentPixel = 0;
int numWipes = 3;

// FADE ANIMATION
int r = 0;
int rspeed = 5;
int g = 0;
int gspeed = 5;
int b = 0;
int bspeed = 5;

// BLINK ANIMATION
unsigned long blinkinterval = 300;
boolean lightsOn = false;
int numBlinks = 6;

// LED STATES
// add all to setStatesToFalse function
boolean red = false;
boolean green = false;
boolean blue = false;
boolean black = false;
boolean off = false;
boolean fadeRed = false;
boolean fadeGreen = false;
boolean fadeBlue = false;
boolean redBlink = false;
boolean greenBlink = false;
boolean blueBlink = false;

// colors
const uint32_t redColor = ring.Color(255,0,0);
const uint32_t greenColor = ring.Color(0,255,0);
const uint32_t blueColor = ring.Color(0,0,255);
const uint32_t offColor = ring.Color(0,0,0);

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
       colorWipeMillis(redColor, limitAnimation); 
    }
  }
  
  if(green){
    if(millis()-previousMillis >= wipeInterval){
       previousMillis = millis();
       colorWipeMillis(greenColor, limitAnimation); 
    }
  }
  
  if(blue){
    if(millis()-previousMillis >= wipeInterval){
       previousMillis = millis();
       colorWipeMillis(blueColor, limitAnimation); 
    }
  }
  
  if(black){
    if(millis()-previousMillis >= wipeInterval){
       previousMillis = millis();
       colorWipeMillis(offColor, true); 
    }
  }
  
  if(redBlink){
      if(millis()-previousMillis >= blinkinterval){
         previousMillis = millis();
         if(lightsOn == false){
           lightsOn = true;
         } else {
           lightsOn = false; 
         }
         
         lightsBlink(lightsOn, redColor, limitAnimation);
       }
  }
  
  if(greenBlink){
      if(millis()-previousMillis >= blinkinterval){
         previousMillis = millis();
         if(lightsOn == false){
           lightsOn = true;
         } else {
           lightsOn = false; 
         }
         
         lightsBlink(lightsOn, greenColor, limitAnimation);
       }
  }
  
  if(blueBlink){
      if(millis()-previousMillis >= blinkinterval){
         previousMillis = millis();
         if(lightsOn == false){
           lightsOn = true;
         } else {
           lightsOn = false; 
         }
         
         lightsBlink(lightsOn, blueColor, limitAnimation);
       }
  }
    
  if(fadeRed){
    if(millis()-previousMillis >= 20){
       previousMillis = millis();
       fadeRedLights();
    }
  }
  
  if(fadeGreen){
    if(millis()-previousMillis >= 20){
       previousMillis = millis();
       fadeGreenLights();
    }
  }
  
  if(fadeBlue){
    if(millis()-previousMillis >= 20){
       previousMillis = millis();
       fadeBlueLights();
    }
  }
  
  if(off){
    switchOff();
  }
  
}

void lightsBlink(boolean lightState, uint32_t c, boolean limitBlinks){
   if(lightState==true){
      for(uint16_t i=0; i<ring.numPixels(); i++) {
        ring.setPixelColor(i, c);
        ring.show();
      }  
   } else {
       for(uint16_t i=0; i<ring.numPixels(); i++) {
        ring.setPixelColor(i, offColor);
        ring.show();
      }
   }
   
   if(limitBlinks){
     animationCount++;
     
     if(animationCount >= numBlinks){
        setStatesToFalse(); 
     }
   }
}

void colorWipeMillis(uint32_t c, boolean limitWipes){
   ring.setPixelColor(currentPixel, c);
   ring.show();
   currentPixel++;
   if(currentPixel >= PIXEL_COUNT){
      animationCount++;
      currentPixel = 0; 
      for(uint16_t i=0; i<ring.numPixels(); i++) {
        ring.setPixelColor(i, offColor);
        ring.show();
      }
   }
   
   if(limitWipes){
     if(animationCount >= numWipes){
        setStatesToFalse();
     }
   }
}

void fadeRedLights(){
   
   for(int i=0; i<ring.numPixels();i++){
      ring.setPixelColor(i,ring.Color(r,0,0));
      ring.show();
   } 
   
   r+=rspeed;
   
   if(r >= 255 || r<=0){
      rspeed *= -1; 
   }
}

void fadeGreenLights(){
   
   for(int i=0; i<ring.numPixels();i++){
      ring.setPixelColor(i,ring.Color(0,g,0));
      ring.show();
   } 
   
   g+=gspeed;
   
   if(g >= 255 || g<=0){
      gspeed *= -1; 
   }
}

void fadeBlueLights(){
   
   for(int i=0; i<ring.numPixels();i++){
      ring.setPixelColor(i,ring.Color(0,0,b));
      ring.show();
   } 
   
   b+=bspeed;
   
   if(b >= 255 || b<=0){
      bspeed *= -1; 
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
      
      // the first byte is the command parameter sent from node 0x01 so ignore it
      if(c!=1){
         setLightState(c);
      }
   } 
}

void setStatesToFalse(){
   //set all states to false
   red = false;
   green = false;
   blue = false;
   black = false;
   off = false;
   redBlink = false;
   greenBlink = false;
   blueBlink = false;
   fadeRed = false;
   fadeGreen = false;
   fadeBlue = false;
   
   // reset counter and common variables
   limitAnimation = false;
   animationCount = 0;
   currentPixel = 0;
   
}

void setLightState(int val){
   switch(val){
      case 2:
        setStatesToFalse();
        red = true;
        limitAnimation = true;
        break;
      case 3:
        setStatesToFalse();
        red = true;
        limitAnimation = false;
        break;
      case 4:
        setStatesToFalse();
        off = true;
        break;
      default:
        break;
   } 
}



