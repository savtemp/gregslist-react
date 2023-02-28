
import PropTypes  from "prop-types"
import React from "react"
import { Car } from "../models/Car.js"
import { carsService } from "../services/CarsService.js"
import Pop from "../utils/Pop.js"
import { AppState } from "../AppState.js"

// NOTE react can only export one default function at a time
// export default function CarCard({car}) {
  // return <p>{{car}}</p>
// }

// NOTE using this to get intellisense 
/**@param {{car:Car}} props */
export default function CarCard({car}){

  async function deleteCar(){
    try {
      const yes = await Pop.confirm('Remove this car?')
      if(!yes){return}
      await carsService.deleteCar(car.id)
    } catch (error) {
      Pop.error(error)
    }
  }

  async function setActiveCar(){
    AppState.car = car
  }

  return (
    <div className="card" onClick={setActiveCar}>
      <img className="img-fluid" src={car.img} alt="" />
      <p className="text-center"> {car.make} | {car.model} | {car.year} </p>
      <button className="btn btn-danger" onClick={deleteCar}>Delete Car</button>
    </div>
  )
}

CarCard.propTypes = {
  car: PropTypes.instanceOf(Car)
}

// export default observer(CarCard)