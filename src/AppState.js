import { action, makeAutoObservable } from "mobx"
import { isValidProp } from "./utils/isValidProp.js"

// create a class and makes properties observable 
class ObservableAppState {

  user = null
  /** @type {import('./models/Account.js').Account | null} */
  account = null

  /** @type {import('./models/Car.js').Car[]} */
  cars = []

  /** @type {import('./models/Car.js').Car | null} */
  car = null


  // sets up emits comes from mobx import (popular AppState management app)
  constructor() {
    // auto-observable will be the default 
    makeAutoObservable(this)
  }

}

// sets up an object that will sit in front of object with getter and setter in front of it, if using '=' will check for valid prop and will run action to set the value inside the observable state
// eslint-disable-next-line no-undef
export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    action(() => {
      // with mobx if reactive magic needs to happen, it has to be inside of an action call
      // where 'reactive' will happen without having to create an action call each time, also prevents you from having to use a provider-layer wrapped in react component 
      target[prop] = value
    })()
    return true
  }
})