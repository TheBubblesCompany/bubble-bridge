// import _Bridge from './bridge'

// const SingletonBridge = {
//   bridge: null,
//   readyCallbacks: [],
//   ready(cb) {
//     if (this.bridge) return cb()
//     if (typeof window !== 'undefined') {
//       this.readyCallbacks.push(cb)
//     }
//   },
// }

// const bridgeEvents = ['bubblesApplicationReady', 'bubblesSystemBridgeReady', 'bubblesBridgeReady', 'beforeBubblesBridgeReady']

// bridgeEvents.forEach((event) => {
//   SingletonBridge.ready(() => {
//     SingletonBridge.bridge.on(event, (...args) => {
//       const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`
//       if (SingletonBridge[eventField]) {
//         SingletonBridge[eventField](...args)
//       }
//     })
//   })
// })

// export default SingletonBridge

// export const createBridge = () => {
//   SingletonBridge.bridge = new _Bridge()
//   SingletonBridge.readyCallbacks.forEach(cb => cb())
//   SingletonBridge.readyCallbacks = []
//   return SingletonBridge.bridge
// }

// export const Bridge = _Bridge

var bubblesSystemBridge = {
    callHandler: function(method, data, callback) {},
    registerHandler: function(event, callback) {}
};

var bubblesBridge = {
    /**
     * Constant
     */
    version: '1.1.1.0',

    /**
     * Events
     */
    eventOnApplicationReady: 'bubblesApplicationReady',
    eventOnBridgeReady: 'bubblesSystemBridgeReady',
    eventOnVersionReady: 'versionReadyEvent',
    eventOnReady: 'bubblesBridgeReady',
    eventBeforeOnReady: 'beforeBubblesBridgeReady',

    /**
     * Environment
     */
    environmentIOS: 'iOS',
    environmentAndroid: 'Android',
    environmentWeb: 'Web',

    /**
     * Colors
     */
    colorOff: 0,
    colorWhite: 1,
    colorRed: 2,
    colorOrangeDark: 3,
    colorOrange: 4,
    colorYellowTangerine: 5,
    colorYellow: 6,
    colorLimeElectric: 7,
    colorLimeSpring: 8,
    colorGreenApple: 9,
    colorGreen: 10,
    colorGreenSpring: 11,
    colorGreenSpringMedium: 12,
    colorTurquoise: 13,
    colorAqua: 14,
    colorCyan: 15,
    colorBlueDeepSky: 16,
    colorBlue: 17,
    colorPurpleElectric: 18,
    colorPurplePsychedelic: 19,
    colorMagenta: 20,
    colorPink: 21,
    colorRedTorch: 22,

    /**
     * Glowing
     */
    glowingOff: 0,
    glowingSlow: 1,
    glowingMedium: 2,
    glowingFast: 3,

    /**
     * Internal
     */

    /**
     * Option
     */
    fireEventOnReady: true,

    /**
     * Internal only
     */
    isBridgeReady: false,
    isApplicationReady: false,
    environment: 'Web',

    /**
     * Methods
     */

    /**
     * Writes log to console or application
     *
     * @param data
     */
    log: function(data) {
        console.log(data);
    },

    /**
     * Fires application ready event
     */
    fireReadyEvent: function() {
        var bridgeReadyEvent = new Event(bubblesBridge.eventOnReady);
        document.dispatchEvent(bridgeReadyEvent);
    },

    /**
     * Fires event before on ready
     *
     * Internal only
     */
    fireBeforeOnReady: function() {
        var bridgeReadyEvent = new Event(bubblesBridge.eventBeforeOnReady);
        document.dispatchEvent(bridgeReadyEvent);
    },

    /**
     * Fires ready event
     *
     * Internal only
     */
    ready: function() {
        console.log("Debug on Web!");
        bubblesBridge.isBridgeReady = true;
        var bridgeReadyEvent = new Event(bubblesBridge.eventOnBridgeReady);
        document.dispatchEvent(bridgeReadyEvent);
    },

    /**
     * Callback fires from Android when user clicks on hardware back button
     */
    onBackEvent: function() {
        bubblesBridge.log("Back from application");
    },

    /**
     * Callback fires from application when user leaves service
     */
    onPauseEvent: function() {
        bubblesBridge.log("Pause from application");
    },

    /**
     * Callback fires from application when user returns to service
     */
    onResumeEvent: function() {
        bubblesBridge.log("Resume from application");
    },

    /**
     * Retrieves beacons around
     *
     * @param callback
     */
    getBeaconsAround: function(callback) {
        bubblesBridge.log("getBeaconsAround");
        callback([]);
    },

    /**
     * Callback fires from application when bluetooth state changes
     * 
     * @param state
     */
    onBluetoothStateChange: function(state) {
        bubblesBridge.log("Bluetooth state change from application");
        bubblesBridge.log(state);
    },

    /**
     * Callback fires from application when location state changes
     * 
     * @param state
     */
    onLocationStateChange: function(state) {
        bubblesBridge.log("Location state change from application");
        bubblesBridge.log(state);
    },

    /**
     * Callback fires when Beacon information changes
     *
     * @param beacon
     */
    onBeaconChangeEvent: function(beacon) {
        bubblesBridge.log("Beacon change from application");
        bubblesBridge.log(beacon);
    },

    /**
     * Retrieves Bubble Two Ids
     *
     * @param callback
     */
    getBubbles: function(callback) {
        bubblesBridge.log("getBubbles");
        callback([]);
    },

    /**
     * Callback fires when Bubble information changes
     *
     * @param bubble Id get with getBubbles
     * @param event ENTER or EXIT
     */
    onBubbleChangeEvent: function(bubble, event) {
        bubblesBridge.log("Bubble change from application");
        bubblesBridge.log("Bubble " + bubble);
        bubblesBridge.log("Event " + event);
    },

    /**
     * Selects a specific Bubble by ID
     *
     * @param bubbleId Id get with getBubbles
     * @param callback
     */
    chooseBubble: function(bubbleId, callback) {
        bubblesBridge.log("chooseBubble " + bubbleId);
        if (callback) {
            callback(true);
        }
    },

    /**
     * Sends an IF notification (light modification)
     *
     * @param color
     * @param glowing
     * @param intMin
     * @param intMax
     * @param timestamp
     * @param ttl
     * @param callback
     */
    writeIfNotification: function(color, glowing, intMin, intMax, timestamp, ttl, callback) {
        bubblesBridge.log("writeIfNotification");
        bubblesBridge.log("color " + color);
        bubblesBridge.log("glowing " + glowing);
        bubblesBridge.log("intMin " + intMin);
        bubblesBridge.log("intMax " + intMax);
        bubblesBridge.log("timestamp " + timestamp);
        bubblesBridge.log("ttl " + ttl);

        callback(true);
    },

    /**
     * Close service
     */
    closeService: function() {
        bubblesBridge.log("CloseService");
    },

    /**
     * Open an URI from application
     *
     * @param uri
     * @param callback
     */
    openURI: function(uri, callback) {
        bubblesBridge.log("START openURI");
        bubblesBridge.log("uri " + uri);
        window.location = uri;
        if (callback) {
            callback(true);
        }
    },

    /**
     * Gets current environment
     *
     * @returns {string} iOS, Android or Web
     */
    getEnvironment: function() {
        return bubblesBridge.environment;
    },

    /**
     * Gets current bridge version implemented in application
     *
     * @returns {string}
     */
    getVersion: function() {
        return bubblesBridge.version;
    },

    /**
     * Declares bridge handlers
     *
     * Internal only
     */
    setupHandlers: function() {
        console.log('setupHandlers!');
        bubblesBridge.log = function(data) {
            bubblesSystemBridge.callHandler("log", JSON.stringify(data));
        };
        bubblesBridge.ready = function() {
            console.log("Bridge is ready!");
            bubblesBridge.isBridgeReady = true;
            var bridgeReadyEvent = new Event(bubblesBridge.eventOnBridgeReady);
            document.dispatchEvent(bridgeReadyEvent);
        };

        bubblesBridge.fireReadyEvent = function() {
            bubblesSystemBridge.callHandler("ready");

            var bridgeReadyEvent = new Event(bubblesBridge.eventOnReady);
            document.dispatchEvent(bridgeReadyEvent);
        };
        bubblesBridge.getBubbles = function(callback) {
            bubblesBridge.log("START getBubbles");
            bubblesBridge.getBubblesCallback = function(data) {
                bubblesBridge.log("getBubbles " + data);
                var parsedData = JSON.parse(data);
                if (parsedData.success == true) {
                    var bubbles = parsedData.bubbles;
                    callback(bubbles);
                }
                else {
                    callback([]);
                }
            };
            bubblesSystemBridge.callHandler("getBubbles", "", bubblesBridge.getBubblesCallback);
            bubblesBridge.log("END getBubbles");
        };

        bubblesBridge.getBeaconsAround = function(callback) {
            bubblesBridge.log("START getBeaconsAround");
            bubblesBridge.getBeaconsAroundCallback = function(data) {
                bubblesBridge.log("getBeaconsAround " + data);
                var parsedData = JSON.parse(data);
                if (parsedData.success == true) {
                    var beacons = parsedData.beacons;
                    callback(beacons);
                }
                else {
                    callback([]);
                }
            };
            bubblesSystemBridge.callHandler("getBeaconsAround", "", bubblesBridge.getBeaconsAroundCallback);
            bubblesBridge.log("END getBeaconsAround");
        };

        bubblesBridge.chooseBubble = function(bubbleId, callback) {
            bubblesBridge.log("START chooseBubble: " + bubbleId);
            bubblesBridge.chooseBubbleCallback = function(data) {
                var parsedData = JSON.parse(data);
                callback(parsedData.success);
            };
            bubblesSystemBridge.callHandler("chooseBubble", JSON.stringify(bubbleId), bubblesBridge.chooseBubbleCallback);
            bubblesBridge.log("END chooseBubble");
        };

        bubblesBridge.writeIfNotification = function(color, glowing, intMin, intMax, timestamp, ttl, callback) {
            bubblesBridge.log("START writeIfNotification");
            bubblesBridge.log("color " + color);
            bubblesBridge.log("glowing " + glowing);
            bubblesBridge.log("intMin " + intMin);
            bubblesBridge.log("intMax " + intMax);
            bubblesBridge.log("timestamp " + timestamp);
            bubblesBridge.log("ttl " + ttl);
            var data = {
                color: color,
                glowing: glowing,
                intMin: intMin,
                intMax: intMax,
                timestamp: timestamp,
                ttl: ttl
            };
            bubblesBridge.writeIfNotificationCallback = function(data) {
                var parsedData = JSON.parse(data);
                if (callback) {
                    callback(parsedData.success);
                }
            };
            bubblesSystemBridge.callHandler("writeIfNotification", JSON.stringify(data), bubblesBridge.writeIfNotificationCallback);
            bubblesBridge.log("END writeIfNotification");
        };
		
        bubblesBridge.closeService = function() {
            bubblesBridge.log("Close Service");
            bubblesSystemBridge.callHandler("closeService");
        };
		
        bubblesBridge.openURI = function(uri, callback) {
            bubblesBridge.log("START openURI");
            bubblesBridge.log("uri " + uri);
            var data = {
                uri: uri
            };
            bubblesBridge.openURICallback = function(data) {
                var parsedData = JSON.parse(data);
                if (callback) {
                    callback(parsedData.success);
                }
            };
            bubblesSystemBridge.callHandler("openURI", JSON.stringify(data), bubblesBridge.openURICallback);
            bubblesBridge.log("END openURI");
        };

        bubblesSystemBridge.registerHandler("onBackPressed", function(data, responseCallback) {
            bubblesBridge.log("Back from application");
            var response = bubblesBridge.onBackEvent();
            if (responseCallback) {
                responseCallback(response);
            }
        });

        bubblesSystemBridge.registerHandler("onPause", function(data, responseCallback) {
            bubblesBridge.log("Back from application");
            var response = bubblesBridge.onPauseEvent();
            if (responseCallback) {
                responseCallback(response);
            }
        });

        bubblesSystemBridge.registerHandler("onResume", function(data, responseCallback) {
            bubblesBridge.log("Back from application");
            var response = bubblesBridge.onResumeEvent();
            if (responseCallback) {
                responseCallback(response);
            }
        });

        bubblesSystemBridge.registerHandler("onBluetoothStateChange", function(data, responseCallback) {
            bubblesBridge.log("onBluetoothStateChange");
            var parsedData = JSON.parse(data);
            var response = bubblesBridge.onBluetoothStateChange(parsedData.isActivated);
            if (responseCallback) {
                responseCallback(response);
            }
        });

        bubblesSystemBridge.registerHandler("onLocationStateChange", function(data, responseCallback) {
            bubblesBridge.log("onLocationStateChange");
            var parsedData = JSON.parse(data);
            var response = bubblesBridge.onLocationStateChange(parsedData.isActivated);
            if (responseCallback) {
                responseCallback(response);
            }
        });

        bubblesSystemBridge.registerHandler("onBeaconChange", function(data, responseCallback) {
            bubblesBridge.log("onBeaconChange");
            var parsedData = JSON.parse(data);
            var beacon = parsedData.beacon;
            var response = bubblesBridge.onBeaconChangeEvent(beacon);
            if (responseCallback) {
                responseCallback(response);
            }
        });

        bubblesSystemBridge.registerHandler("onBubbleChange", function(data, responseCallback) {
            bubblesBridge.log("onBubbleChange");
            var parsedData = JSON.parse(data);
            var bubble = parsedData.bubble;
            var event = parsedData.event;
            var response = bubblesBridge.onBubbleChangeEvent(bubble, event);
            if (responseCallback) {
                responseCallback(response);
            }
        });

        bubblesBridge.version = '1.0.0.0';
        var timeoutVersion = setTimeout(function() {
            bubblesBridge.ready();
        }, 200);
        bubblesSystemBridge.callHandler("getVersion", "", function(data) {
            var parsedData = JSON.parse(data);
            clearTimeout(timeoutVersion);
            if (parsedData.success) {
                bubblesBridge.version = parsedData.version;
            }
            else {
                bubblesBridge.version = '1.0.0.0';
            }
            bubblesBridge.ready();
        });
    },

    /**
     * Setup bridge
     *
     * Internal only
     *
     * @param callback
     * @returns {*}
     */
    setupWebViewJavascriptBridge: function(callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() {
            document.documentElement.removeChild(WVJBIframe)
        }, 0);
    },

    /**
     * Constructor
     */
    start: function() {
        document.addEventListener(bubblesBridge.eventOnApplicationReady, function() {
            console.log("bubblesBridge.eventOnApplicationReady fired");
            if (bubblesBridge.isBridgeReady && bubblesBridge.isApplicationReady) {
                bubblesBridge.fireBeforeOnReady();
                if (bubblesBridge.fireEventOnReady) {
                    bubblesBridge.fireReadyEvent();
                }
            }
        });

        document.addEventListener(bubblesBridge.eventOnBridgeReady, function() {
            console.log("bubblesBridge.eventOnBridgeReady fired");
            if (bubblesBridge.isBridgeReady && bubblesBridge.isApplicationReady) {
                bubblesBridge.fireBeforeOnReady();
                if (bubblesBridge.fireEventOnReady) {
                    bubblesBridge.fireReadyEvent();
                }
            }
        });

        var timeout = setTimeout(function() {
            bubblesBridge.environment = bubblesBridge.environmentWeb;
            bubblesBridge.ready();
        }, 1000);
        document.addEventListener('WebViewJavascriptBridgeReady', function(event) {
            bubblesBridge.environment = bubblesBridge.environmentAndroid;
            bubblesSystemBridge = event.bridge;
            bubblesBridge.setupHandlers();
            clearTimeout(timeout);
        }, false);

        bubblesBridge.setupWebViewJavascriptBridge(function(bridge) {
            bubblesBridge.environment = bubblesBridge.environmentIOS;
            bubblesSystemBridge = bridge;
            bubblesBridge.setupHandlers();
            clearTimeout(timeout);
        });

    },

    /**
     * Initializes bridge
     *
     * @param fireEventOnReady automatically fires application ready event (default: yes)
     */
    init: function(fireEventOnReady) {
        fireEventOnReady = typeof fireEventOnReady !== 'undefined' ? fireEventOnReady : true;
        this.fireEventOnReady = fireEventOnReady;
        bubblesBridge.isApplicationReady = true;
        var bubblesApplicationReady = new Event(bubblesBridge.eventOnApplicationReady);
        document.dispatchEvent(bubblesApplicationReady);
    }
};

export default bubblesBridge