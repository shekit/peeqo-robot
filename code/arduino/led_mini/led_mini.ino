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
int gspeed = 2;

// BLINK ANIMATION
unsigned long blinkinterval = 300;

// LED STATES
boolean red = false;
boolean green = false;
boolean blue = false;
boolean off = false;
boolean fade = false;
boolean blinky = false;

boolean lights = false;
boolean rainbow = false;


void setup() {
  // put your setup code here, to run once:
  Wire.begin(I2C_ADDR);
  Wire.onReceive(receiveEvent);
  
  Serial.begin(9600);
  
  ring.begin();
  ring.setBrightness(RING_BRIGHTNESS);
  switchOff();
}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available()>0){
     //char i = Serial.read();
     //runLights(i); 
     //runLights(i);
     char i = Serial.read();
     
     switch(i){
        case 'r':
           red = true;
           green = false;
           blue = false;
           off = false;
           blinky = false;
           rainbow = false;
           fade = false;
           break;
        case 'g':
           green = true;
           red = false;
           blue = false;
           off = false;
           blinky = false;
           rainbow = false;
           fade = false;
           break;
        case 'b':
           blue = true;
           green = false;
           red = false;
           off = false;
           blinky = false;
           rainbow = false;
           fade = false;
           break; 
        case 'o':
           red = false;
           green = false;
           blue = false;
           off = true;
           blinky = false;
           rainbow = false;
           fade = false;
           break;
        case 't':
           red = false;
           green = false;
           blue = false;
           off = false;
           blinky = true;
           rainbow = false;
           fade = false;
           break;
        case 'p':
           red = false;
           green = false;
           blue = false;
           off = false;
           blinky = false;
           rainbow = true;
           fade = false;
           break;
        case 'f':
           red = false;
           green = false;
           blue = false;
           off = false;
           blinky = false;
           rainbow = false;
           fade = true;
           break;
        default:
          break;
     }
     
  }
  
  if(red){
    if(millis()-previousMillis >= wipeInterval){
       previousMillis = millis();
       colorWipeMillis(ring.Color(255,0,0)); 
    }
  }
  
  if(green){
    if(millis()-previousMillis >= wipeInterval){
       previousMillis = millis();
       colorWipeMillis(ring.Color(0,255,0)); 
    }
  }
  
  if(blue){
    if(millis()-previousMillis >= wipeInterval){
       previousMillis = millis();
       colorWipeMillis(ring.Color(0,0,255)); 
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
  
  if(rainbow){
    if(millis()-previousMillis >= 20){
       previousMillis = millis();
       fade2();
    }
  }
  
  if(fade){
    if(millis()-previousMillis >= 20){
       previousMillis = millis();
       fade2();
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
        ring.setPixelColor(i, ring.Color(0,0,0));
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
        ring.setPixelColor(i, ring.Color(0,0,0));
        ring.show();
      }
   }
}

void switchOff(){
  currentPixel = 0;
  for(uint16_t i=0; i<ring.numPixels(); i++) {
     ring.setPixelColor(i, ring.Color(0,0,0));
     ring.show();
  }
}


void receiveEvent(int howMany){
   while(Wire.available()>0){
      int c = Wire.read();
      
      if(c!=1){
         //runLights(c); 
         setLightState(c);
      }
   } 
}

void setLightState(int val){
   switch(val){
      case 2:
        red = true;
        green = false;
        blue = false;
        off = false;
        blinky = false;
        rainbow = false;
        fade = false;
        break;
      case 3:
        red = false;
        green = false;
        blue = false;
        off = false;
        blinky = true;
        rainbow = false;
        fade = false;
        break;
      case 4:
        red = false;
        green = false;
        blue = false;
        off = true;
        blinky = false;
        rainbow = false;
        fade = false;
        break;
      default:
        Serial.println("rubbish");
        break;
   } 
}

void fade2(){
   
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

// Input a value 0 to 255 to get a color value.
// The colours are a transition r - g - b - back to r.
uint32_t Wheel(byte WheelPos) {
  WheelPos = 255 - WheelPos;
  if(WheelPos < 85) {
   return ring.Color(255 - WheelPos * 3, 0, WheelPos * 3);
  } else if(WheelPos < 170) {
    WheelPos -= 85;
   return ring.Color(0, WheelPos * 3, 255 - WheelPos * 3);
  } else {
   WheelPos -= 170;
   return ring.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
  }
}
