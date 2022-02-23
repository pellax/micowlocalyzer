//Library for WiFi
#include <WiFi.h>


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

//Data structure libraries
//#include <pseudostack.h>

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RST);

String LoRaData;

WiFiClient client;

//WiFi parameters
const char* ssid = "MOVISTAR_44B6";
const char* password = "E2zeYs8s4t6uZJ86z2C9";
//const char* ssid = "niicoiphone";
//const char* password =  "aaaaaaaa";

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

  Serial.println("CowLocator receptor");
  
  //SPI LoRa pins
  SPI.begin(SCK, MISO, MOSI, SS);
  //setup LoRa transceiver module
  LoRa.setPins(SS, RST, DIO0);

  if (!LoRa.begin(BAND)) {
    Serial.println("No se ha podido iniciar LoRa");
    while (1);
  }
  Serial.println("He iniciado LoRa!");
  display.setCursor(0,10);
  display.println("LoRa Initializing OK!");
  display.display();  

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Me estoy conectando a WiFi");
    display.display();
    delay(1000);
  }
  Serial.println("Contectado a WiFi!");
  display.display();
  display.clearDisplay();
  display.setCursor(0,0);
  
  display.display();
  create();
  delay(1000);
}

void sendToServer(String LoRaData) {
  const char * message = LoRaData.c_str();  
  String mid ="";
  String id = "";
  String sats = "";
  String lt = "";
  String lg = "";

  int i = 0;
  
  while (message[i] != 'd') {
    mid += message[i];
    ++i;
  }

  ++i;

  while (message[i] != 'd') {
    id += message[i];
    ++i;
  }
  ++i;

  while (message[i] != 'd') {
    sats += message[i];
    ++i; 
  }
  ++i;

  while (message[i] != 'd') {
    lt += message[i];
    ++i; 
  }
  ++i;

  while (i < strlen(message)) {
    lg += message[i];
    ++i;
  }
  if (sats != "0") { 
    HTTPClient http;
    http.begin("http://192.168.1.60:8080/send_gps");
    http.addHeader("User-Agent", "CowLocalizer/1.0", true, true);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded", false, true);
    int res = http.POST("id=" +id+"&lat="+lt+"&lon="+lg);
    if (res == -1) Serial.println("He intentado enviar el mensaje al servidor, pero he recibido error -1. Parece que el servidor está desconectado o no responde");
    else {
      Serial.print("He enviado el mensaje al servidor, y me ha devuelto un código HTTP ");
      Serial.println(res);
    }
    http.end();
  } else Serial.println("No he enviado el mensaje, ya que contenía una latitud y longitud incorrectas.");
  push(atoi(mid.c_str()));
}

void loop() {
  //example();
  //try to parse packet
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    //read packet
    while (LoRa.available()) {
      LoRaData = LoRa.readString();
    }
    if (!exists(atoi(LoRaData.c_str()))) {
      Serial.print("He recibido este mensaje: ");
      Serial.print(LoRaData);
      Serial.println(". Procedo a enviarlo al servidor");
      sendToServer(LoRaData);
    }
    else {
      Serial.print("He recibido este mensaje: ");
      Serial.print(LoRaData);
      Serial.println(". Pero ya lo he enviado al servidor, así que no lo voy a hacer otra vez");
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
