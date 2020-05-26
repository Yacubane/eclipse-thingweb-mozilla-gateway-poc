# Eclipse thingweb mozilla gateway poc
This is a prove of concept project for Mozilla Gateway adapter to Eclipse Thingweb wot available here: [adapter homepage](https://github.com/jakubdybczak/w3c-web-of-things-adapter).

## Usage

Currently there are available two protocols to communicate between adapter and Eclipse Thingweb, HTTP and MQTT.

### Prerequisites
You need to build Eclipse Thingweb.
1. Clone Eclipse Thingweb repository:
```
git clone https://github.com/eclipse/thingweb.node-wot
```
2. Go into Eclipse Thingweb repository:
```
cd thingweb.node-wot
```
3. Install root dependencies:
```
npm install 
```
4. Build dependencies:
```
npm run build
```

Then you need to clone this repository and follow steps for protocol which you want to use.

### HTTP
1. Go to http subfolder:
```
cd eclipse-thingweb-mozilla-gateway-poc/http/
```
2. Run script:
```
./start.sh 
```
3. Now all things specified in smarthome.js should be available on [localhost:8082](http://localhost:8082/).

### MQTT
(*Note: in order to run mqtt examples you need to have installed and running [mosquitto](https://mosquitto.org/download/).*)

1. Start mosquitto:
```
mosquitto
```
2. Go to mqtt subfolder:
```
cd eclipse-thingweb-mozilla-gateway-poc/mqtt/
```
3. Run script:
```
./start.sh
```
## Example communication with device via HTTP protocol (changing device property value)
1. List of devices:
<p align="center">
    <img alt="Device description" title="Devices list" width=300 src="https://github.com/jakubdybczak/eclipse-thingweb-mozilla-gateway-poc/blob/master/readme_assets/http_example_1.png">
</p>

2. On every item from above list you can get device information by going to URL (HTTP GET)
<p align="center">
    <img alt="New propertyvalue" title="Device descriptione" width=300 src="https://github.com/jakubdybczak/eclipse-thingweb-mozilla-gateway-poc/blob/master/readme_assets/http_example_2.png">
</p>

3. You can check property value by going to property endpoint with HTTP GET
<p align="center">
    <img alt="Property value" title="Property value" width=450 src="https://github.com/jakubdybczak/eclipse-thingweb-mozilla-gateway-poc/blob/master/readme_assets/http_example_3.png">
</p>

4. To change value of device property, you have to make PUT request on property endpoint with data (for example with Postman):
<p align="center">
    <img alt="Change property value" title="Change property value" width=450 src="https://github.com/jakubdybczak/eclipse-thingweb-mozilla-gateway-poc/blob/master/readme_assets/http_example_4.png">
</p>

5. Now you can check whether property changed (just like in third step):
<p align="center">
    <img alt="New propertyvalue" title="New property value" width=450 src="https://github.com/jakubdybczak/eclipse-thingweb-mozilla-gateway-poc/blob/master/readme_assets/http_example_5.png">
</p>


## Example communication with device via MQTT protocol (changing device property value)
1. Device description send by Eclipse Thingweb in JSON format (you can notice url to writeproperty):
<p align="center">
    <img alt="Device description" title="Device description" width=600 src="https://github.com/jakubdybczak/eclipse-thingweb-mozilla-gateway-poc/blob/master/readme_assets/mqtt_example_1.png">
</p>

2. You can check property value using valid MQTT topic, for example:
<p align="center">
    <img alt="Property value" title="Property value" width=150 src="https://github.com/jakubdybczak/eclipse-thingweb-mozilla-gateway-poc/blob/master/readme_assets/mqtt_example_2.png">
</p>

3. To change value of device property, you have to publish message on valid topic:
<p align="center">
    <img alt="Change property value" title="Change property value" width=300 src="https://github.com/jakubdybczak/eclipse-thingweb-mozilla-gateway-poc/blob/master/readme_assets/mqtt_example_3.png">
</p>

4. Now you can check whether property changed (just like in second step):
<p align="center">
    <img alt="New propertyvalue" title="New property value" width=150 src="https://github.com/jakubdybczak/eclipse-thingweb-mozilla-gateway-poc/blob/master/readme_assets/mqtt_example_4.png">
</p>

*Note: screenshots are from MQTTfx.*
