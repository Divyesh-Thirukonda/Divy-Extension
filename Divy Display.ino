#include <Arduino.h>
#include <U8g2lib.h>
#include <SoftwareSerial.h>
#include <EEPROM.h>


U8G2_SH1107_SEEED_128X128_1_SW_I2C u8g2(U8G2_R0, A5, A4, U8X8_PIN_NONE);

int rx = 8;
int tx = 7;
SoftwareSerial bluetoothSerial(rx, tx); // RX, TX pins on Arduino for Bluetooth module
void setup() {
         
  pinMode(13, OUTPUT); 

  pinMode(rx, INPUT); 
  pinMode(tx, OUTPUT); 

  Serial.begin(9600); // open the serial port at 9600 bps:
  bluetoothSerial.begin(9600);

  u8g2.begin();
  randomSeed(analogRead(0)); // Initialize random seed
}

char Incoming_value = 0;
String spotifyPackage = "";

String spotifyTitle = "";
String spotifyArtist = "";

String time = "";
String date = "";
String weather = "";
String nextTask = "";

int myCounter = 0;

bool spotifyDisplay;
bool weatherDisplay;
bool timeDisplay;
bool taskDisplay;

void loop() {
  u8g2.firstPage();
  do {
    myCounter++;
    // every 5 sec
    if (myCounter < 100) {
      spotifyDisplay = true;
      weatherDisplay = false;
      timeDisplay = false;
      taskDisplay = false;
    } else if (myCounter < 200) {
      spotifyDisplay = false;
      weatherDisplay = true;
      timeDisplay = false;
      taskDisplay = false;
    } else if (myCounter < 300) {
      spotifyDisplay = false;
      weatherDisplay = false;
      timeDisplay = true;
      taskDisplay = false;
    } else if (myCounter < 400) {
      spotifyDisplay = false;
      weatherDisplay = false;
      timeDisplay = false;
      taskDisplay = true;
    } else {
      myCounter = 0;
    }
    
    if (bluetoothSerial.available() > 0) {
      spotifyPackage = bluetoothSerial.readStringUntil('\n'); // Assuming data is sent line by line
      if (spotifyPackage != "" && spotifyPackage.substring(0, 2) != "OK") {
        updateStringToEEPROM(1, spotifyPackage); // Assuming 0 as the starting address

      }
    }
    if (spotifyPackage == "" || spotifyPackage.substring(0, 2) == "OK") {
      spotifyPackage = readStringFromEEPROM(1);
    }


    if (spotifyDisplay) {
      u8g2.setFont(u8g2_font_ncenB10_tr);
      u8g2.drawRFrame(5, 5, 118, 118, 8);
      u8g2.drawStr(10, 25, "Spotify");
      u8g2.setCursor(10, 80);

      if (spotifyPackage == "") {
        u8g2.print("...");
      } else {
        spotifyTitle = spotifyPackage.substring(0, spotifyPackage.indexOf("`"));
        spotifyArtist = spotifyPackage.substring(spotifyPackage.indexOf("`")+1, spotifyPackage.indexOf("/"));
        // spotifyTitle = "Artist"; // Sample
        // spotifyArtist = "Title"; // Sample
        u8g2.print(spotifyTitle.substring(0, 12));
        u8g2.setCursor(10, 110);
        u8g2.print(spotifyArtist.substring(0, 12));
      }


    } else if (timeDisplay) {



      u8g2.drawRFrame(5, 5, 118, 118, 8);

      if (spotifyPackage == "") {
        String ponderance = "...";
        u8g2.setFont(u8g2_font_ncenB24_tr);
        int newx = (128 - u8g2.getStrWidth(ponderance.c_str())) / 2;
        int newy = 64 / 2 + u8g2.getAscent() - u8g2.getFontDescent();
        u8g2.drawStr(newx, newy, ponderance.c_str());
      } else {
        String timeVar = "8:45";
        String dateVar = "Sat, Dec 16";

        timeVar = extractVariable(spotifyPackage, "/", "@").substring(0, 5);
        dateVar = extractVariable(spotifyPackage, "@", "^");

        // timeVar = "8:45"; // Sample
        // dateVar = "Sat, Dec 16"; // Sample


        
        u8g2.setFont(u8g2_font_ncenB24_tr);
        int newx = (128 - u8g2.getStrWidth(timeVar.c_str())) / 2;
        int newy = 64 / 2 + u8g2.getAscent() - u8g2.getFontDescent();
        u8g2.drawStr(newx, newy, timeVar.c_str());

        
        u8g2.setFont(u8g2_font_ncenB12_tr);
        newx = (128 - u8g2.getStrWidth(dateVar.c_str())) / 2;
        newy = 64 / 2 + u8g2.getAscent() - u8g2.getFontDescent();
        u8g2.drawStr(newx, newy+60, dateVar.c_str());
      }


      

    } else if (weatherDisplay) {
      u8g2.setFont(u8g2_font_ncenB24_tr);

      u8g2.drawRFrame(5, 5, 118, 118, 8);

      if (spotifyPackage == "") {
        String ponderance = "...";
        int newx = (128 - u8g2.getStrWidth(ponderance.c_str())) / 2;
        int newy = 64 / 2 + u8g2.getAscent() - u8g2.getFontDescent();
        u8g2.drawStr(newx, newy, ponderance.c_str());
      } else {
        String weatherVar = "10F in Edina";
        weatherVar = extractVariable(spotifyPackage, "^", "*");
        // weatherVar = weatherVar.substring(0, 12);

        // weatherVar = "Weather"; // Sample

        int newx = (128 - u8g2.getStrWidth(weatherVar.c_str())) / 2;
        int newy = 64 / 2 + u8g2.getAscent() - u8g2.getFontDescent();
        u8g2.drawStr(newx, newy, weatherVar.c_str());
      }


    } else if (taskDisplay) {


      u8g2.setFont(u8g2_font_ncenB10_tr);
      u8g2.drawRFrame(5, 5, 118, 118, 8);
      u8g2.drawStr(10, 25, "Next Task");
      u8g2.setCursor(10, 80);

      if (spotifyPackage == "") {
        u8g2.print("...");
      } else {
        String nextTaskArduino = spotifyPackage.substring(spotifyPackage.indexOf("*")+1);
        // nextTaskArduino = "Next Task"; // Sample

        u8g2.setCursor(10, 110);
        u8g2.print(nextTaskArduino.substring(0, 12));
      }


      
    } else {
      u8g2.drawStr(10, 25, "Uh Oh, the dev messed up!");
    }
    
    



  } while (u8g2.nextPage());
}


String extractVariable(String input, String startDelimiter, String endDelimiter) {
  int startIndex = input.indexOf(startDelimiter) + startDelimiter.length();
  int endIndex = input.indexOf(endDelimiter, startIndex);
  
  if (startIndex >= 0 && endIndex >= 0) {
    return input.substring(startIndex, endIndex);
  } else {
    return "";
  }
}
void updateStringToEEPROM(int address, String data) {
    for (int i = 0; i < data.length(); ++i) {
        EEPROM.update(address + i, data[i]);
    }
    EEPROM.update(address + data.length(), '\0'); // Null-terminate the string
}

String readStringFromEEPROM(int address) {
    String result = "";
    char ch = EEPROM.read(address);
    int i = 0;

    while (ch != '\0' && i < 50) {
        result += ch;
        ch = EEPROM.read(address + (++i));
    }

    return result;
}


