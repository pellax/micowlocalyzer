//Library for WiFi
#include "WiFi.h"

//Library for HTTP Comm
#include "HTTPClient.h"

//Libraries for LoRa
#include <SPI.h>
#include <LoRa.h>

//Libraries for OLED Display
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

//define the pins used by the LoRa module
#define SCK 5
#define MISO 19
#define MOSI 27
#define SS 18
#define RST 14 //npi
#define DIO0 26

//define LoRa BAND (886E6 for Europe)
#define BAND 866E6

//define OLED pins and size
#define OLED_SDA 21
#define OLED_SCL 22 
#define OLED_RST 16 //npi
#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RST);

String LoRaData;

WiFiClient client;

//WiFi parameters
const char* ssid = "VodafoneLF";
const char* password =  "934601797LF";

//Server parameters
const uint16_t port = 40351;
const char* host = "nattech.fib.upc.edu";

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
  display.print("LORA RECEIVER ");
  display.display();
  
  //initialize Serial Monitor
  Serial.begin(115200);

  Serial.println("LoRa Receiver Test");
  
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
  display.println("LoRa Initializing OK!");
  display.display();  

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    display.println("Connecting to WiFi..");
    display.display();
    delay(1000);
  }
  display.println("Connected to WiFi");
  display.display();
  display.clearDisplay();
  display.setCursor(0,0);
  
  if (!client.connect(host, port)) {
    display.println("Connection failed");
  } else {
    display.println("Connection OK");
    client.print("Hello");
  }
  display.display();
  
  delay(1000);
}

void example() {
  HTTPClient http;
  http.begin("http://nattech.fib.upc.edu:40350/send_gps");
  http.addHeader("User-Agent", "curl/7.26.0", true, true);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded", false, true);
  Serial.print(http.POST("id=1&lat=41.3851&lon=2.1734"));
  http.end();
}

void loop() {
  example();
  //try to parse packet
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    //received a packet
    Serial.print("Received packet ");

    //read packet
    while (LoRa.available()) {
      LoRaData = LoRa.readString();
    }

    //print RSSI of packet

   // Display information
   display.clearDisplay();
   display.setCursor(0,0);
   display.print("LORA RECEIVER");
   display.setCursor(0,20);
   display.print("Received packet:");
   display.setCursor(0,30);
   display.print(LoRaData);
   client.println(LoRaData);
   display.setCursor(0,40);
   display.print("RSSI:");
   display.setCursor(30,40);
   display.display();   
   
  }
}
