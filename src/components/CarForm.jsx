import PropTypes  from "prop-types"
import { observer } from "mobx-react-lite"
import React from "react"
import { Car } from "../models/Car.js"


/**@param {{car: Car}} props */

function CarForm({car}){

  async function createCar(){}

  return(
    <div>
      <form action="">
        <input type="text" />
      </form>
    </div>
  )
}

CarForm.proptypes = {
  car: PropTypes.instanceOf(Car)
}

export default observer(CarForm)