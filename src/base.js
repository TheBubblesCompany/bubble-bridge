// import { EventEmitter } from 'events'
import * as event from './events'

export default class Base {
  constructor() {
    this.version = '1.2.0'
    this.fireEventOnReady = true
    this.isBridgeReady = false
    this.isApplicationReady = false

    this.environmentIOS = 'iOS'
    this.environmentAndroid = 'Android'
    this.environmentWeb = 'Web'
    this.environment = 'Web'
    this.bridge = {
      callHandler(method, data, callback) {}, // eslint-disable-line
      registerHandler(event, callback) {}, // eslint-disable-line
    }
  }

  log(data) {
    console.log(data)
  }

  /**
   * Fires application ready event
   */
  fireReadyEvent() {
    const bridgeReadyEvent = new Event(event.EventOnReady)
    document.dispatchEvent(bridgeReadyEvent)
  }

  /**
   * Fires event before on ready
   *
   * Internal only
   */
  fireBeforeOnReady() {
    const bridgeReadyEvent = new Event(event.EventBeforeOnReady)
    document.dispatchEvent(bridgeReadyEvent)
  }

  /**
   * Fires ready event
   *
   * Internal only
   */
  ready() {
    console.log('Debug on Web!')
    this.isBridgeReady = true
    const bridgeReadyEvent = new Event(event.EventOnBridgeReady)
    document.dispatchEvent(bridgeReadyEvent)
  }

  /**
   * Callback fires from Android when user clicks on hardware back button
   */
  onBackEvent() {
    this.log('Back from application')
  }

  /**
   * Callback fires from application when user leaves service
   */
  onPauseEvent() {
    this.log('Pause from application')
  }

  /**
   * Callback fires from application when user returns to service
   */
  onResumeEvent() {
    this.log('Resume from application')
  }

  /**
   * Retrieves beacons around
   *
   * @param callback
   */
  getBeaconsAround(callback) {
    this.log('getBeaconsAround')
    callback([])
  }

  /**
   * Callback fires from application when bluetooth state changes
   *
   * @param state
   */
  onBluetoothStateChange(state) {
    this.log('Bluetooth state change from application')
    this.log(state)
  }

  /**
   * Callback fires from application when location state changes
   *
   * @param state
   */
  onLocationStateChange(state) {
    this.log('Location state change from application')
    this.log(state)
  }

  /**
   * Callback fires when Beacon information changes
   *
   * @param beacon
   */
  onBeaconChangeEvent(beacon) {
    this.log('Beacon change from application')
    this.log(beacon)
  }

  /**
   * Retrieves Bubble Two Ids
   *
   * @param callback
   */
  getBubbles(callback) {
    this.log('getBubbles')
    callback([])
  }

  /**
   * Callback fires when Bubble information changes
   *
   * @param bubble Id get with getBubbles
   * @param event ENTER or EXIT
   */
  onBubbleChangeEvent(bubble, event) {
    this.log('Bubble change from application')
    this.log(`Bubble ${bubble}`)
    this.log(`Event ${event}`)
  }

  /**
   * Selects a specific Bubble by ID
   *
   * @param bubbleId Id get with getBubbles
   * @param callback
   */
  chooseBubble(bubbleId, callback) {
    this.log(`chooseBubble ${bubbleId}`)
    if (callback) {
      callback(true)
    }
  }

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
  writeIfNotification(color, glowing, intMin, intMax, timestamp, ttl, callback) {
    this.log('writeIfNotification')
    this.log(`color ${color}`)
    this.log(`glowing ${glowing}`)
    this.log(`intMin ${intMin}`)
    this.log(`intMax ${intMax}`)
    this.log(`timestamp ${timestamp}`)
    this.log(`ttl ${ttl}`)

    callback(true)
  }

  /**
   * Close service
   */
  closeService() {
    this.log('CloseService')
  }

  /**
   * Open an URI from application
   *
   * @param uri
   * @param callback
   */
  openURI(uri, callback) {
    this.log('START openURI')
    this.log(`uri ${uri}`)
    window.location = uri
    if (callback) {
      callback(true)
    }
  }

  /**
   * Gets current environment
   *
   * @returns {string} iOS, Android or Web
   */
  getEnvironment() {
    return this.environment
  }

  /**
   * Gets current bridge version implemented in application
   *
   * @returns {string}
   */
  getVersion() {
    return this.version
  }
}
