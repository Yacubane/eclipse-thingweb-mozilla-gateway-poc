class ThingValue {
    constructor(value) {
        this.value = value;
        this.listeners = [];
    }

    addListener(listener) {
        this.listeners.push(listener);
        listener(this.value)
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
        this.listeners.forEach(listener => listener(this.value));
    }
}

class ThingConnection {
    constructor() {
        this.values = {
            'outside-lights': new ThingValue(),
            'gate': new ThingValue(),
            'garage-door': new ThingValue(),
            'outside-temperature': new ThingValue(),
            'outside-humidity': new ThingValue(),
            'outside-pressure': new ThingValue()
        }

        this._startMock();
    }

    _startMock() {
        this.values['outside-lights'].setValue(false);
        this.values['gate'].setValue(false);
        this.values['garage-door'].setValue(false);
        this.values['outside-temperature'].setValue(22);
        this.values['outside-humidity'].setValue(25);
        this.values['outside-pressure'].setValue(1020);
    }

    on(event, listener) {
        this.values[event].addListener(listener);
    }

    perform(action) {
        if (action === 'toggle-outside-lights') {

        } else if (action === 'turn-on-outside-lights') {
            if (this.values['outside-lights'].getValue() === false) {
                this.values['outside-lights'].setValue(true);
            }
        } else if (action === 'turn-off-outside-lights') {
            if (this.values['outside-lights'].getValue() === true) {
                this.values['outside-lights'].setValue(false);
            }
        } else if (action === 'open-gate') {
            if (this.values['gate'] == false) {
                this.values['gate'], setValue(true);
            }
        } else if (action === 'close-gate') {
            if (this.values['gate'] === true) {
                this.values['gate'], setValue(false);
            }
        } else if (action === 'toggle-gate') {
            let value = this.values['gate'].getValue();
            this.values['gate'].setValue(!value);
        } else if (action === 'open-garage-door') {
            if (this.values['garage-door'] === false) {
                this.values['garage-door'], setValue(true);
            }
        } else if (action === 'close-garage-door') {
            if (this.values['garage-door'] === true) {
                this.values['garage-door'], setValue(false);
            }
        } else if (action === 'toggle-garage-door') {
            let value = this.values['garage-door'].getValue();
            this.values['garage-door'].setValue(!value);
        }
    }

    update(id, newValue) {
        this.values[id].setValue(newValue);
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
    "@type": ["Light", "OnOffSwitch"],
    properties: {
        on: {
            "@type": "OnOffProperty",
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
        thingConnection.on('outside-lights', (lightState) => {
            thing.writeProperty("on", lightState);
        });
        thing.setPropertyWriteHandler("on", (value) => {
            if (value) {
                thingConnection.perform('turn-on-outside-lights');
            } else {
                thingConnection.perform('turn-off-outside-lights');
            }
        })

        thing.setActionHandler("toggle", (params, options) => {
            thingConnection.perform("toggle-outside-lights");
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
    description: "Front yard gate",
    descriptions: {
        "en": "Front yard gate",
    },
    support: "git://github.com/eclipse/thingweb.node-wot.git",
    "@context": ["https://www.w3.org/2019/wot/td/v1", { "iot": "http://example.org/iot" }],
    "@type": ["DoorSensor"],
    properties: {
        state: {
            "@type": "OpenProperty",
            type: "boolean",
            title: "Gate state",
            description: "Determines if gate is open",
            descriptions: {
                "en": "Determines if gate is open"
            },
            observable: true
        },
    },
    actions: {
        open: {
            description: "Open gate",
            description: {
                "en": "Open gate",
            }
        },
        close: {
            description: "Close gate",
            descriptions: {
                "en": "Close gate",
            }
        },
        toggle: {
            description: "Toggle gate state",
            description: {
                "en": "Toggle gate state",
            }
        }
    }
})
    .then((thing) => {
        thingConnection.on('gate', (gateState) => {
            thing.writeProperty("state", gateState);
        });
        thing.setPropertyWriteHandler('state', (state) => {
            if (state) {
                thingConnection.perform('close-gate');
            } else if (!state) {
                thingConnection.perform('open-gate');
            }
        });
        thing.setActionHandler("open", (params, options) => {
            return thing.readProperty("state").then((state) => {
                console.log(options, state);
                if (!state) {
                    thingConnection.perform("open-gate");
                    thing.writeProperty("state", true);
                }
            });
        });
        thing.setActionHandler("close", (params, options) => {
            return thing.readProperty("state").then((state) => {
                console.log(options, state);
                if (state) {
                    thingConnection.perform("close-gate");
                    thing.writeProperty("state", false);
                }
            });
        });
        thing.setActionHandler("toggle", (params, options) => {
            return thing.readProperty("state").then((state) => {
                console.log(options, state);

                thingConnection.perform("toggle-gate");
                thing.writeProperty("state", !state);
            });
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
    description: "Door to garage",
    descriptions: {
        "en": "Door to garage",
    },
    support: "git://github.com/eclipse/thingweb.node-wot.git",
    "@context": ["https://www.w3.org/2019/wot/td/v1", { "iot": "http://example.org/iot" }],
    "@type": ["DoorSensor"],
    properties: {
        state: {
            "@type": "OpenProperty",
            type: "boolean",
            title: "Door state",
            description: "Determines if garage door is open",
            descriptions: {
                "en": "Determines if garage door is open"
            },
            observable: true
        },
    },
    actions: {
        open: {
            description: "Open garage door",
            descriptions: {
                "en": "Open garage door",
            }
        },
        close: {
            description: "Close garage door",
            description: {
                "en": "Close garage door",
            }
        },
        toggle: {
            description: "Toggle garage door",
            description: {
                "en": "Toggle garage door"
            }
        }
    }
})
    .then((thing) => {
        thingConnection.on('garage-door', (gateState) => {
            thing.writeProperty("state", gateState);
        });
        thing.setPropertyWriteHandler('state', (state) => {
            if (state) {
                thingConnection.perform('open-garage-door');
            } else {
                thingConnection.perform('close-garage-door');
            }
        });
        thing.setActionHandler("open", (params, options) => {
            return thing.readProperty("state").then((state) => {
                console.log(params, options, state);
                if (!state) {
                    thingConnection.perform("open-garage-door");
                    thing.writeProperty("state", true);
                }
            });
        });
        thing.setActionHandler("close", (params, options) => {
            return thing.readProperty("state").then((state) => {
                console.log(options, state);
                if (state) {
                    thingConnection.perform("close-garage-door");
                    thing.writeProperty("state", false);
                }
            });
        });
        thing.setActionHandler("toggle", (params, options) => {
            return thing.readProperty("state").then((state) => {
                console.log(options, state);
                thing.writeProperty("state", !state);
            });
        });


        thing.expose().then(() => { console.info(thing.getThingDescription().title + " ready"); });
    })
    .catch((e) => {
        console.log(e);
    });

WoT.produce({
    title: "outside-temperature",
    titles: {
        "en": "outside-temperature"
    },
    description: "Temperature outside",
    descriptions: {
        "en": "Temperature outside",
    },
    support: "git://github.com/eclipse/thingweb.node-wot.git",
    "@context": ["https://www.w3.org/2019/wot/td/v1", { "iot": "http://example.org/iot" }],
    "@type": ["TemperatureSensor"],
    properties: {
        val: {
            "@type": "TemperatureProperty",
            type: "integer",
            description: "Contains temperature value",
            descriptions: {
                "en": "Contains temperature value"
            },
            observable: true,
            readOnly: true
        },
    }
})
    .then((thing) => {
        thingConnection.on('outside-temperature', (measurement) => {
            thing.writeProperty('val', measurement);
        });
        thing.setPropertyWriteHandler('val', (measurement) => {
            thingConnection.update('outside-temperature', measurement);
        })

        thing.expose().then(() => { console.info(thing.getThingDescription().title + " ready"); });
    })
    .catch((e) => {
        console.log(e);
    });

WoT.produce({
    title: "outside-humidity",
    titles: {
        "en": "outside-humidity"
    },
    description: "Humidity outside",
    descriptions: {
        "en": "Humidity outside",
    },
    support: "git://github.com/eclipse/thingweb.node-wot.git",
    "@context": ["https://www.w3.org/2019/wot/td/v1", { "iot": "http://example.org/iot" }],
    "@type": ["MultiLevelSensor"],
    properties: {
        val: {
            "@type": "LevelProperty",
            title: "Humidity",
            unit: "Percent",
            type: "integer",
            minimum: 0,
            maximum: 100,
            description: "Contains humidity value",
            descriptions: {
                "en": "Contains humidity value"
            },
            observable: true,
            readOnly: true
        },
    }
})
    .then((thing) => {
        thingConnection.on('outside-humidity', (measurement) => {
            thing.writeProperty('val', measurement);
        });
        thing.setPropertyWriteHandler('val', (measurement) => {
            thingConnection.update('outside-humidity', measurement);
        })

        thing.expose().then(() => { console.info(thing.getThingDescription().title + " ready"); });
    })
    .catch((e) => {
        console.log(e);
    });

WoT.produce({
    title: "outside-pressure",
    titles: {
        "en": "outside-pressure"
    },
    description: "Pressure outside",
    descriptions: {
        "en": "Pressure outside",
    },
    support: "git://github.com/eclipse/thingweb.node-wot.git",
    "@context": ["https://www.w3.org/2019/wot/td/v1", { "iot": "http://example.org/iot" }],
    "@type": ["MultiLevelSensor"],
    properties: {
        val: {
            "@type": "LevelProperty",
            title: "Pressure",
            unit: "hPa",
            type: "integer",
            minimum: 800,
            maximum: 1200,
            description: "Contains pressure value",
            descriptions: {
                "en": "Contains pressure value"
            },
            observable: true,
            readOnly: true
        },
    }
})
    .then((thing) => {
        thingConnection.on('outside-pressure', (measurement) => {
            thing.writeProperty('val', measurement);
        });
        thing.setPropertyWriteHandler('val', (measurement) => {
            thingConnection.update('outside-pressure', measurement);
        })

        thing.expose().then(() => { console.info(thing.getThingDescription().title + " ready"); });
    })
    .catch((e) => {
        console.log(e);
    });
