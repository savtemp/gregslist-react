
import PropTypes  from "prop-types"
import { observer } from "mobx-react-lite"
import React from "react"
import { Car } from "../models/Car.js"
import { carsService } from "../services/CarsService.js"
import Pop from "../utils/Pop.js"

// NOTE react can only export one default function at a time
// export default function CarCard({car}) {
  // return <p>{{car}}</p>
// }

// NOTE using this to get intellisense 
/**@param {{car:Car}} props */


function CarCard({car}){

  async function setActiveCar(){
    try {
      await carsService.setActiveCar()
    } catch (error) {
      Pop.error(error)
    }
  }

  return (
    <div className="card" onClick={setActiveCar}>
      <img className="img-fluid" src={car.img} alt="" />
      <p className="text-center"> {car.make} | {car.model} | {car.year} </p>
    </div>
  )
}

CarCard.propTypes = {
  car: PropTypes.instanceOf(Car)
}

export default observer(CarCard)