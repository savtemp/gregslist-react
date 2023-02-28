import { observer } from "mobx-react"
import React, { useEffect } from "react";
import { AppState } from "../AppState.js";
import CarCard from "../components/CarCard.jsx";
import CarForm from "../components/CarForm.jsx";
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

  // REVIEW why are we mapping the cars here instead of in the service?
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
    <section className="home-page">
      <div className="container my-3">
        <div className="row">
          <div className="col-md-1">
            {/* TODO add onclick={createCar} */}
            <button className="btn btn-success m-3" onClick={createCar} data-bs-toggle="modal" data-bs-target="#carModal" >Create Car</button>
          </div>
        </div>
        <div className="row">
          {cars}
        </div>
      </div>

    {/* BOOSTRAP MODAL */}
    <div className="modal fade" id="carModal" tabIndex={-1} aria-labelledby="carModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Car</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              {AppState.car ? <CarForm /> : null}
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}
export default observer(HomePage)
