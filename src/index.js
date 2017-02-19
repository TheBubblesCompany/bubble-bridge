import _Bridge from './bridge'

const SingletonBridge = {
  bridge: null,
  readyCallbacks: [],
  ready(cb) {
    if (this.bridge) return cb()
    if (typeof window !== 'undefined') {
      this.readyCallbacks.push(cb)
    }
  },
}

const bridgeEvents = ['bubblesApplicationReady', 'bubblesSystemBridgeReady', 'bubblesBridgeReady', 'beforeBubblesBridgeReady']

bridgeEvents.forEach((event) => {
  SingletonBridge.ready(() => {
    SingletonBridge.bridge.on(event, (...args) => {
      const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`
      if (SingletonBridge[eventField]) {
        SingletonBridge[eventField](...args)
      }
    })
  })
})

export default SingletonBridge

export const createBridge = () => {
  SingletonBridge.bridge = new _Bridge()
  SingletonBridge.readyCallbacks.forEach(cb => cb())
  SingletonBridge.readyCallbacks = []
  return SingletonBridge.bridge
}

export const Bridge = _Bridge
