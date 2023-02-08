
import PropTypes  from "prop-types"
import { observer } from "mobx-react-lite"
import React from "react"
import { Car } from "../models/Car.js"

function CarCard({car}){


  return (
    <div className="card">
      <img className="img-fluid" src="https://thiscatdoesnotexist.com/" alt="" />
      <p className="text-center"> {car.make} | {car.model} | {car.year} </p>
    </div>
  )
}

CarCard.propTypes = {
  car: PropTypes.instanceOf(Car)
}

export default observer(CarCard)