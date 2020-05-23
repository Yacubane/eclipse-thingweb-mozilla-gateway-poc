# Eclipse thingweb mozilla gateway poc
This is a prove of concept project for Mozilla Gateway adapter to Eclipse Thingweb wot available here: [adapter homepage](https://github.com/jakubdybczak/w3c-web-of-things-adapter).

## Usage

Currently there are available two protocols to communicate between adapter and Eclipse Thingweb, http and mqtt.

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

### http
1. Go to http subfolder:
```
cd eclipse-thingweb-mozilla-gateway-poc/http/
```
2. Run script:
```
./start.sh 
```
3. Now all things specified in smarthome.js should be available on [localhost](http://localhost:8082/).

### mqtt
(*Note: in order to run mqtt examples you need to have installed mosquitto.*)

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


