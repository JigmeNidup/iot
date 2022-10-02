#include<WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

//wifi credentials
const char* ssid = "Heh12345";
const char* password = "Heh12345";
//mqtt broker credentials
const char* host = "broker.hivemq.com";
const int port = 1883;

//temp and humidity sensor
#define DHTTYPE DHT22
const int DHTPin = 13;

DHT dht(DHTPin, DHTTYPE);

float temp;
float humidity;

//light Class Component
class Light {
  public:
    String title;
    char * topic;
    int pin;
    Light(String x, char * y, int z) {
      title = x;
      topic = y;
      pin = z;
    };
    void mqttSwitch(String message) {
      if (message == "ON") {
        digitalWrite(pin, HIGH);
      } else if (message == "OFF") {
        digitalWrite(pin, LOW);
      }
    }
};
//Relay details (title, Mqtt-topic, Arduino-pin)
Light R1("Relay1", "iothomeroomlight1", 23);
Light R2("Relay2", "iothomeroomlight2", 22);
Light R3("Relay3", "iothomeroomlight3", 21);
Light R4("Relay4", "iothomeroomlight4", 19);
Light R5("Relay5", "iothomeroomlight5", 18);
Light R6("Relay6", "iothomeroomlight6", 5);
Light R7("Relay7", "iothomeroomlight7", 17);
Light R8("Relay8", "iothomeroomlight8", 16);

const int num_relays = 8;
Light Relays[8] = {R1, R2, R3, R4, R5, R6, R7, R8};

WiFiClient esp32;
PubSubClient client(esp32);

void mqttConnect() {
  while (!client.connected()) {
    String clientId = "ESP32Client_" + String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("Mqtt Connected");
      //subscribe topic
      for (int i = 0; i < num_relays; i++) {
        client.subscribe(Relays[i].topic);
      }
    } else {
      delay(500);
    }
  }
}


void onMessageRecieved(char* topic, byte* payload, unsigned int length) {
  String Topic = topic;
  String message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  for (int i = 0; i < num_relays; i++) {
    if ((String)Relays[i].topic == Topic) {
      Relays[i].mqttSwitch(message);
    }
  }


}
void setup() {
  //setting all realys as output
  for (int i = 0; i < num_relays; i++) {
    pinMode(Relays[i].pin, OUTPUT);
  }
  Serial.begin(115200);
  dht.begin();
  //wifi setup
  WiFi.mode(WIFI_STA);
  Serial.println("Starting WiFi connection..");
  WiFi.begin(ssid, password);

  //wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println(".");
  Serial.println("WiFi Connected");
  //mqtt setup
  Serial.println("Starting MQTT connection..");
  client.setServer(host, port);
  client.setCallback(onMessageRecieved);

}

void TempAndHumi(){
  humidity = dht.readHumidity();
  temp = dht.readTemperature();
  Serial.println("Temp: ");
  Serial.println(temp);
  Serial.println("Humidity: ");
  Serial.println(humidity);
  delay(100);
}

void loop() {
  // put your main code here, to run repeatedly:
  if (!client.connected()) {
    mqttConnect();
  }
  client.loop();
  TempAndHumi();
}