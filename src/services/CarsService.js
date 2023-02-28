import { AppState } from "../AppState.js"
import { Car } from "../models/Car.js"
import { api } from "./AxiosService.js"


class CarsService{

    async getCars() {
      // REVIEW why are we setting the empty array first 
      AppState.cars = []
      const res = await api.get('api/cars')
      // console.log('[GETTING CARS]', res.data);
      AppState.cars = res.data.map(car => new Car(car))
      console.log(AppState.cars);
  }

  async editCar(carData, carId) {
    let res = await api.put(`api/cars/${carData.id}`, carData)
    // console.log('[EDITING CAR]', res.data);
    let carIndex = AppState.cars.findIndex(c => c.id == carId)
    AppState.cars.splice(carIndex, 1, new Car(res.data))
  }

  async createCar(carFormData) {
    let res = await api.post('api/cars', carFormData)
    // console.log('[CREATING CAR]', res.data);
    let car = new Car(res.data)
    AppState.cars.push(car)
  }

  async deleteCar(carId) {
    const res = await api.delete('api/cars/' + carId)
    console.log('[DELETING CAR]', res.data);
    AppState.cars = AppState.cars.filter(car => car.id != carId)
  }


}

export const carsService = new CarsService()