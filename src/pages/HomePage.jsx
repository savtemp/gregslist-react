import { observer } from "mobx-react";
import React, { useState } from "react";
import { AppState } from "../AppState.js";
import CarCard from "../components/CarCard.jsx";
import { carsService } from "../services/CarsService.js";

export default function HomePage() {
  
  let cars = (AppState.cars.map(c => {
    return (
      <div className="col-md-4" key={c.id} >
        <CarCard car={c} />
      </div>
    )
  
  }))


  // TODO react onMounted hook
  carsService.getCars()

  return (
    <div className="home-page">
      <div className="container my-3">
        <div className="row">
          {cars}
        </div>
      </div>
    </div>
  )
}
