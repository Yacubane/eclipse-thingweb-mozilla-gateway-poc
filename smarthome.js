class ThingConnection {
    constructor() {
        this.listeners = {
            'change-light': [],
            'change-gate': [],
            'change-garage-door': [],
            'change-outside-temperature': [],
            'change-outside-humidity': [],
            'change-outside-pressure': []
        }
    }

    _notify(event, response) {
        this.listeners[event].forEach(listener => listener(response));
    }

    on(event, listener) {
        this.listeners[event].push(listener);
    }

    perform(action) {
        if (action === 'toggle-outside-lights') {

        } else if (action === 'toggle-gate') {

        } else if (action === 'toggle-garage-door') {

        }
    }
}

thingConnection = new ThingConnection();

WoT.produce({
    title: "outside-light",
    titles: {
        "en": "outside-light"
    },
    description: "Lights in garden",
    descriptions: {
        "en": "Lights in garden",
    },
    support: "git://github.com/eclipse/thingweb.node-wot.git",
    "@context": ["https://www.w3.org/2019/wot/td/v1", { "iot": "http://example.org/iot" }],
    properties: {
        on: {
            type: "boolean",
            description: "Determines if lights are turned on",
            descriptions: {
                "en": "Determines if lights are turned on"
            },
            observable: true
        },
    },
    actions: {
        toggle: {
            description: "Toggle lights",
            descriptions: {
                "en": "Toggle lights",
            }
        },
    },
    events: {
        change: {
            description: "Lights toggle event",
            descriptions: {
                "en": "Lights toggle event"
            }
        }
    }
})
    .then((thing) => {
        thingConnection.on('change-outside-lights', (lightState) => {
            thing.writeProperty("on", lightState);
        });
        thing.writeProperty("on", true);
        thing.setActionHandler("toggle", (params, options) => {
            thingConnection.perform("toggle-outside-lights")
        });
        thing.expose().then(() => { console.info(thing.getThingDescription().title + " ready"); });
    })
    .catch((e) => {
        console.log(e);
    });


WoT.produce({
    title: "gate",
    titles: {
        "en": "gate"
    },
    description: "Outside gate device",
    descriptions: {
        "en": "Outside gate device",
    },
    support: "git://github.com/eclipse/thingweb.node-wot.git",
    "@context": ["https://www.w3.org/2019/wot/td/v1", { "iot": "http://example.org/iot" }],
    properties: {
        open: {
            type: "boolean",
            description: "Determines if gate is open",
            descriptions: {
                "en": "Determines if gate is open"
            },
            observable: true
        },
    },
    actions: {
        toggle: {
            description: "Toggles gate",
            descriptions: {
                "en": "Toggles gate",
            }
        },
    },
    events: {
        closed: {
            description: "Closed gate event",
            descriptions: {
                "en": "Closed gate event"
            }
        },
        opened: {
            description: "Opened gate event",
            descriptions: {
                "en": "Opened gate event"
            }
        }
    }
})
    .then((thing) => {
        thingConnection.on('change-gate', (gateState) => {
            thing.writeProperty("open", gateState);
        });
        thing.writeProperty("open", true);
        thing.setActionHandler("toggle", (params, options) => {
            thingConnection.perform("toggle-gate")
        });
        thing.expose().then(() => { console.info(thing.getThingDescription().title + " ready"); });
    })
    .catch((e) => {
        console.log(e);
    });

WoT.produce({
    title: "garage-door",
    titles: {
        "en": "garage-door"
    },
    description: "Garage door",
    descriptions: {
        "en": "Garage door",
    },
    support: "git://github.com/eclipse/thingweb.node-wot.git",
    "@context": ["https://www.w3.org/2019/wot/td/v1", { "iot": "http://example.org/iot" }],
    properties: {
        open: {
            type: "boolean",
            description: "Determines if garage doors are open",
            descriptions: {
                "en": "Determines if garage doors are open"
            },
            observable: true
        },
    },
    actions: {
        toggle: {
            description: "Toggle garage doors",
            descriptions: {
                "en": "Toggle garage doors",
            }
        },
    },
    events: {
        closed: {
            description: "Closed garage door event",
            descriptions: {
                "en": "Closed garage door event"
            }
        },
        opened: {
            description: "Opened garage door event",
            descriptions: {
                "en": "Opened garage door event"
            }
        }
    }
})
    .then((thing) => {
        thingConnection.on('change-garage-door', (garageDoorState) => {
            thing.writeProperty("open", garageDoorState);
        });
        thing.writeProperty("open", true);
        thing.setActionHandler("toggle", (params, options) => {
            thingConnection.perform("toggle-garage-door")
        });
        thing.expose().then(() => { console.info(thing.getThingDescription().title + " ready"); });
    })
    .catch((e) => {
        console.log(e);
    });

WoT.produce({
    title: "outside-sensor",
    titles: {
        "en": "outside-sensor"
    },
    description: "Outside sensor in garden",
    descriptions: {
        "en": "Outside sensor in garden",
    },
    support: "git://github.com/eclipse/thingweb.node-wot.git",
    "@context": ["https://www.w3.org/2019/wot/td/v1", { "iot": "http://example.org/iot" }],
    properties: {
        temperature: {
            type: "integer",
            description: "Determines temperature outside",
            descriptions: {
                "en": "Determines temperature outside"
            },
            observable: true
        },
        humidity: {
            type: "integer",
            description: "Determines humidity outside",
            descriptions: {
                "en": "Determines humidity outside"
            },
            observable: true
        },
        pressure: {
            type: "integer",
            description: "Determines pressure outside",
            descriptions: {
                "en": "Determines pressure outside"
            },
            observable: true
        },
    },
})
    .then((thing) => {
        thingConnection.on('change-outside-temperature', (temperature) => {
            thing.writeProperty("temperature", temperature);
        });
        thingConnection.on('change-outside-humidity', (humidity) => {
            thing.writeProperty("humidity", humidity);
        });
        thingConnection.on('change-outside-pressure', (pressure) => {
            thing.writeProperty("pressure", pressure);
        });
        thing.expose().then(() => { console.info(thing.getThingDescription().title + " ready"); });
    })
    .catch((e) => {
        console.log(e);
    });