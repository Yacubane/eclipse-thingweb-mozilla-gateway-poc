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

        } else if (action === 'toggle-gate') {

        } else if (action === 'toggle-garage-door') {

        } else if (action === 'turn-on-outside-lights') {
            if(this.values['outside-lights'].getValue() === false){
                this.values['outside-lights'].setValue(true);
            }
        } else if (action === 'turn-off-outside-lights') {
            if(this.values['outside-lights'].getValue() === true){
                this.values['outside-lights'].setValue(false);
            }
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
            if(value) {
                thingConnection.perform('turn-on-outside-lights');
            } else {
                thingConnection.perform('turn-off-outside-lights');
            }
        })

        thing.setActionHandler("toggle", (params, options) => {
            thingConnection.perform("toggle-outside-lights")
        });
        thing.expose().then(() => { console.info(thing.getThingDescription().title + " ready"); });
    })
    .catch((e) => {
        console.log(e);
    });
