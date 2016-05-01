#include <Wire.h>
#include <Adafruit_NeoPixel.h>

#define PIXEL_PIN 6
#define PIXEL_COUNT 12

Adafruit_NeoPixel ring = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, NEO_GRB + NEO_KHZ800);

unsigned long interval=50;
unsigned long previousMillis=0;
int currentPixel = 0;

boolean red = false;
boolean green = false;
boolean blue = false;
boolean off = false;

void setup() {
  // put your setup code here, to run once:
  Wire.begin(0x04);
  Wire.onReceive(receiveEvent);
  
  Serial.begin(9600);
  
  ring.begin();
  ring.show();
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
           break;
        case 'g':
           green = true;
           red = false;
           blue = false;
           off = false;
           break;
        case 'b':
           blue = true;
           green = false;
           red = false;
           off = false;
           break; 
        case 'o':
           red = false;
           green = false;
           blue = false;
           off = true;
        default:
          break;
     }
     
  }
  
  if(red){
    if(millis()-previousMillis >= interval){
       previousMillis = millis();
       colorWipeMillis(ring.Color(255,0,0)); 
    }
  }
  
  if(green){
    if(millis()-previousMillis >= interval){
       previousMillis = millis();
       colorWipeMillis(ring.Color(0,255,0)); 
    }
  }
  
  if(blue){
    if(millis()-previousMillis >= interval){
       previousMillis = millis();
       colorWipeMillis(ring.Color(0,0,255)); 
    }
  }
  
  if(off){
    switchOff();
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

void printit(char c){
   
}

void receiveEvent(int howMany){
   while(Wire.available()>0){
      int c = Wire.read();
      
      if(c!=1){
         runLights(c); 
      }
   } 
}

void runLights(char val){
   
  switch (val){
     case 'q':
       colorWipe(ring.Color(255, 0, 0), 50);
       break;
     case 'w':
       colorWipe(ring.Color(0, 255, 0), 50);
       break;
     case 'e':
       colorWipe(ring.Color(0, 0, 255), 50);
       break;
     case 'r':
       theaterChase(ring.Color(127,   0,   0), 50);
       break;
     case 't':
       theaterChaseRainbow(50);
       break;
     default:
       colorWipe(ring.Color(0, 0, 0), 50);
       break;
  } 
  
}

void colorWipe(uint32_t c, uint8_t wait) {
  for(uint16_t i=0; i<ring.numPixels(); i++) {
      ring.setPixelColor(i, c);
      ring.show();
      delay(wait);
  }
}


//Theatre-style crawling lights.
void theaterChase(uint32_t c, uint8_t wait) {
  for (int j=0; j<10; j++) {  //do 10 cycles of chasing
    for (int q=0; q < 3; q++) {
      for (int i=0; i < ring.numPixels(); i=i+3) {
        ring.setPixelColor(i+q, c);    //turn every third pixel on
      }
      ring.show();
     
      delay(wait);
     
      for (int i=0; i < ring.numPixels(); i=i+3) {
        ring.setPixelColor(i+q, 0);        //turn every third pixel off
      }
    }
  }
}

//Theatre-style crawling lights with rainbow effect
void theaterChaseRainbow(uint8_t wait) {
  for (int j=0; j < 256; j++) {     // cycle all 256 colors in the wheel
    for (int q=0; q < 3; q++) {
        for (int i=0; i < ring.numPixels(); i=i+3) {
          ring.setPixelColor(i+q, Wheel( (i+j) % 255));    //turn every third pixel on
        }
        ring.show();
       
        delay(wait);
       
        for (int i=0; i < ring.numPixels(); i=i+3) {
          ring.setPixelColor(i+q, 0);        //turn every third pixel off
        }
    }
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
