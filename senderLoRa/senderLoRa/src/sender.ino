//Library for GPS
#include <TinyGPS++.h>
#include <SparkFun_Ublox_Arduino_Library.h>
#include <axp20x.h>

//Libraries for LoRa
#include <SPI.h>
#include <LoRa.h>

//Libraries for OLED Display
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>


//define the pins used by the LoRa transceiver module
#define SCK 5
#define MISO 19
#define MOSI 27
#define SS 18
#define RST 14 //npi
#define DIO0 26

//define LoRa band (866E6 for Europe)
#define BAND 866E6

//define OLED pins and size
#define OLED_SDA 21
#define OLED_SCL 22 
#define OLED_RST 16 //npi
#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels

//packet counter
int counter = 0;
int SN = 3;
TinyGPSPlus gps;
SFE_UBLOX_GPS myGPS;
AXP20X_Class axp;


Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RST);

void setup() {

  //reset OLED display via software
  pinMode(OLED_RST, OUTPUT);
  digitalWrite(OLED_RST, LOW);
  delay(20);
  digitalWrite(OLED_RST, HIGH);

  //initialize OLED
  Wire.begin(OLED_SDA, OLED_SCL);
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3c, false, false)) { // Address 0x3C for 128x32
    Serial.println(F("SSD1306 allocation failed"));
    for(;;); // Don't proceed, loop forever
  }
  
  display.clearDisplay();
  display.setTextColor(WHITE);
  display.setTextSize(1);
  display.setCursor(0,0);
  display.print("LORA SENDER ");
  display.display();
  
  //initialize Serial Monitor
  Serial.begin(115200);
  
  Serial.println("LoRa Sender Test");

  //SPI LoRa pins
  SPI.begin(SCK, MISO, MOSI, SS);
  //setup LoRa transceiver module
  LoRa.setPins(SS, RST, DIO0);
  
  if (!LoRa.begin(BAND)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
  Serial.println("LoRa Initializing OK!");
  display.setCursor(0,10);
  display.print("LoRa Initializing OK!");
  display.display();

  //initialize GPS serial comm
  
  axp.setPowerOutPut(AXP192_LDO3, AXP202_ON); // GPS main power
    axp.setPowerOutPut(AXP192_LDO2, AXP202_ON); // provides power to GPS backup battery
    axp.setPowerOutPut(AXP192_LDO3, AXP202_ON);
    axp.setPowerOutPut(AXP192_DCDC2, AXP202_ON);
    axp.setPowerOutPut(AXP192_EXTEN, AXP202_ON);
    axp.setPowerOutPut(AXP192_DCDC1, AXP202_ON); // enables power to ESP32 on T-beam
    axp.setPowerOutPut(AXP192_DCDC3, AXP202_ON); // I foresee similar benefit for restting T-watch 
                                                 // where ESP32 is on DCDC3 but remember to change I2C pins and GPS pins!
                                                  
  Serial1.begin(9600, SERIAL_8N1, 34, 12);
  if (myGPS.begin(Serial1)) {
      Serial.println("Connected to GPS");
      myGPS.setUART1Output(COM_TYPE_NMEA); //Set the UART port to output NMEA only
      myGPS.saveConfiguration(); //Save the current settings to flash and BBR
      Serial.println("GPS serial connected, output set to NMEA");
      myGPS.disableNMEAMessage(UBX_NMEA_GLL, COM_PORT_UART1);
      myGPS.disableNMEAMessage(UBX_NMEA_GSA, COM_PORT_UART1);
      myGPS.disableNMEAMessage(UBX_NMEA_GSV, COM_PORT_UART1);
      myGPS.disableNMEAMessage(UBX_NMEA_VTG, COM_PORT_UART1);
      myGPS.disableNMEAMessage(UBX_NMEA_RMC, COM_PORT_UART1);
      myGPS.enableNMEAMessage(UBX_NMEA_GGA, COM_PORT_UART1);
      myGPS.saveConfiguration(); //Save the current settings to flash and BBR
      Serial.println("Enabled/disabled NMEA sentences");
    }
  delay(1000);
  if (Serial1.available() > 0) {
    display.println("GPS Initializing OK!");
    display.display();
    delay(3000);
  }

  delay(2000);

}

void loop() {
   if (Serial1.available()) {
      gps.encode(Serial1.read());
      LoRa.beginPacket();
      LoRa.print(SN);
      LoRa.print(counter);
      LoRa.print(gps.location.lat(), 5);
      LoRa.print(gps.location.lng(), 4);
      LoRa.print(gps.satellites.value());
      LoRa.print(gps.time.hour());
      LoRa.print(gps.time.minute());
      LoRa.print(gps.time.second());
      LoRa.endPacket();
    display.clearDisplay();
    display.setCursor(0,0);
   display.print("Latitude  : ");
    display.println(gps.location.lat(), 5);
    display.print("Longitude : ");
    display.println(gps.location.lng(), 4);
    display.print("Satellites: ");
    display.println(gps.satellites.value());
    display.print("Altitude  : ");
    display.print(gps.altitude.feet() / 3.2808);
    display.println("M");
    display.print("Time      : ");
    display.print(gps.time.hour());
    display.print(":");
    display.print(gps.time.minute());
    display.print(":");
    display.println(gps.time.second());
    display.display();
    delay(3000);
    ++counter;
   }
}
