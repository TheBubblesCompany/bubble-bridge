/* global document */

import Base from './base'
import * as event from './events'

export default class Bridge extends Base {
  start() {
    document.addEventListener(event.EventOnApplicationReady, () => {
      console.log('bubblesBridge.eventOnApplicationReady fired')
      if (this.isBridgeReady && this.isApplicationReady) {
        this.fireBeforeOnReady()
        if (this.fireEventOnReady) {
          this.fireReadyEvent()
        }
      }
    })

    document.addEventListener(event.EventOnBridgeReady, () => {
      console.log('bubblesBridge.eventOnBridgeReady fired')
      if (this.isBridgeReady && this.isApplicationReady) {
        this.fireBeforeOnReady()
        if (this.fireEventOnReady) {
          this.fireReadyEvent()
        }
      }
    })

    const timeout = setTimeout(() => {
      this.environment = this.environmentWeb
      this.ready()
    }, 1000)
    document.addEventListener('WebViewJavascriptBridgeReady', (ev) => {
      this.environment = this.environmentAndroid
      this.bridge = ev.bridge
      this.setupHandlers()
      clearTimeout(timeout)
    }, false)

    this.setupWebViewJavascriptBridge((bridge) => {
      this.environment = this.environmentIOS
      this.bridge = bridge
      this.setupHandlers()
      clearTimeout(timeout)
    })
  }

  init(fireEventOnReady = true) {
    this.fireEventOnReady = fireEventOnReady
    this.isApplicationReady = true
    const bubblesApplicationReady = new Event(event.EventOnApplicationReady)
    document.dispatchEvent(bubblesApplicationReady)
  }

  setupWebViewJavascriptBridge(callback) {
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
  }

  setupHandlers() {
    console.log('setupHandlers!')
    this.bridge.log = function(data) {
      this.bridge.callHandler('log', JSON.stringify(data))
    }
    this.ready = function() {
      console.log('Bridge is ready!')
      this.isBridgeReady = true
      const bridgeReadyEvent = new Event(event.EventOnBridgeReady)
      document.dispatchEvent(bridgeReadyEvent)
    }

    this.fireReadyEvent = function() {
      this.callHandler('ready')
      const bridgeReadyEvent = new Event(event.EventOnReady)
      document.dispatchEvent(bridgeReadyEvent)
    }

    this.getBubbles = function(callback) {
      this.log('START getBubbles')
      this.getBubblesCallback = function(data) {
        this.log(`getBubbles ${data}`)
        const parsedData = JSON.parse(data)
        if (parsedData.success === true) {
          const bubbles = parsedData.bubbles
          callback(bubbles)
        } else {
          callback([])
        }
      }
      this.bridge.callHandler('getBubbles', '', this.getBubblesCallback)
      this.log('END getBubbles')
    }

    this.getBeaconsAround = function(callback) {
      this.log('START getBeaconsAround')
      this.getBeaconsAroundCallback = function(data) {
        this.log(`getBeaconsAround ${data}`)
        const parsedData = JSON.parse(data)
        if (parsedData.success === true) {
          const beacons = parsedData.beacons
          callback(beacons)
        } else {
          callback([])
        }
      }
      this.bridge.callHandler('getBeaconsAround', '', this.getBeaconsAroundCallback)
      this.log('END getBeaconsAround')
    }

    this.chooseBubble = function(bubbleId, callback) {
      this.log(`START chooseBubble: ${bubbleId}`)
      this.chooseBubbleCallback = function(data) {
        const parsedData = JSON.parse(data)
        callback(parsedData.success)
      }
      this.bridge.callHandler('chooseBubble', JSON.stringify(bubbleId), this.chooseBubbleCallback)
      this.log('END chooseBubble')
    }

    this.writeIfNotification = function(color, glowing, intMin, intMax, timestamp, ttl, callback) {
      this.log('START writeIfNotification')
      this.log(`color ${color}`)
      this.log(`glowing ${glowing}`)
      this.log(`intMin ${intMin}`)
      this.log(`intMax ${intMax}`)
      this.log(`timestamp ${timestamp}`)
      this.log(`ttl ${ttl}`)
      const data = {
        color,
        glowing,
        intMin,
        intMax,
        timestamp,
        ttl,
      }
      this.writeIfNotificationCallback = function(data) {
        const parsedData = JSON.parse(data)
        if (callback) {
          callback(parsedData.success)
        }
      }
      this.bridge.callHandler('writeIfNotification', JSON.stringify(data), this.writeIfNotificationCallback)
      this.log('END writeIfNotification')
    }

    this.closeService = function() {
      this.log('Close Service')
      this.bridge.callHandler('closeService')
    }

    this.openURI = function(uri, callback) {
      this.log('START openURI')
      this.log(`uri ${uri}`)
      const data = {
        uri,
      }
      this.openURICallback = function(data) {
        const parsedData = JSON.parse(data)
        if (callback) {
          callback(parsedData.success)
        }
      }
      this.bridge.callHandler('openURI', JSON.stringify(data), this.openURICallback)
      this.log('END openURI')
    }

    this.bridge.registerHandler('onBackPressed', (data, responseCallback) => {
      this.log('Back from application')
      const response = this.onBackEvent()
      if (responseCallback) {
        responseCallback(response)
      }
    })

    this.bridge.registerHandler('onPause', (data, responseCallback) => {
      this.log('Back from application')
      const response = this.onPauseEvent()
      if (responseCallback) {
        responseCallback(response)
      }
    })

    this.bridge.registerHandler('onResume', (data, responseCallback) => {
      this.log('Back from application')
      const response = this.onResumeEvent()
      if (responseCallback) {
        responseCallback(response)
      }
    })

    this.bridge.registerHandler('onBluetoothStateChange', (data, responseCallback) => {
      this.log('onBluetoothStateChange')
      const parsedData = JSON.parse(data)
      const response = this.onBluetoothStateChange(parsedData.isActivated)
      if (responseCallback) {
        responseCallback(response)
      }
    })

    this.bridge.registerHandler('onLocationStateChange', (data, responseCallback) => {
      this.log('onLocationStateChange')
      const parsedData = JSON.parse(data)
      const response = this.onLocationStateChange(parsedData.isActivated)
      if (responseCallback) {
        responseCallback(response)
      }
    })

    this.bridge.registerHandler('onBeaconChange', (data, responseCallback) => {
      this.log('onBeaconChange')
      const parsedData = JSON.parse(data)
      const beacon = parsedData.beacon
      const response = this.onBeaconChangeEvent(beacon)
      if (responseCallback) {
        responseCallback(response)
      }
    })

    this.bridge.registerHandler('onBubbleChange', (data, responseCallback) => {
      this.log('onBubbleChange')
      const parsedData = JSON.parse(data)
      const bubble = parsedData.bubble
      const ev = parsedData.event
      const response = this.onBubbleChangeEvent(bubble, ev)
      if (responseCallback) {
        responseCallback(response)
      }
    })

    this.version = '1.0.0.0'
    const timeoutVersion = setTimeout(() => {
      this.ready()
    }, 200)
    this.bridge.callHandler('getVersion', '', (data) => {
      const parsedData = JSON.parse(data)
      clearTimeout(timeoutVersion)
      if (parsedData.success) {
        this.version = parsedData.version
      } else {
        this.version = '1.0.0.0'
      }
      this.ready()
    })
  }
}
