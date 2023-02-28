import { observer } from "mobx-react"
import React, { useEffect } from "react";
import { AppState } from "../AppState.js";
import CarCard from "../components/CarCard.jsx";
import { Car } from "../models/Car.js";
import { carsService } from "../services/CarsService.js";
import Pop from "../utils/Pop.js";

function HomePage() {

  async function getCars(){
    try {
      await carsService.getCars()
    } catch (error) {
      Pop.error(error.message)
    }
  }

  async function createCar(){
    AppState.car = new Car({})
  }

  let cars = (AppState.cars.map(c => {
    return (
      <div className="col-md-4" key={c.id}>
        <CarCard car={c} />
      </div>
    )
  
  }))

  // global hook, 'useEffect' will take care of onMounted, onChange, etc. 
  // contains an array that will have the list of variables that will be watched 
  useEffect(() => {
    getCars()
  }, [])

// NOTE return is used here because this is a function-based component (as opposed to a class-based component)
  return (
    <div className="home-page">
      <div className="container my-3">
        <div className="row">
          <div className="col-md-1">
            {/* TODO add onclick={createCar} */}
            <button className="btn btn-success m-3" onClick={createCar}>Create Car</button>
          </div>
        </div>
        <div className="row">
          {cars}
        </div>
      </div>
    </div>
  )
}
export default observer(HomePage)
