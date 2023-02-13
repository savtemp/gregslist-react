import { AppState } from "../AppState.js"
import { Car } from "../models/Car.js"
import { api } from "./AxiosService.js"


class CarsService{
  async setActiveCar() {
      // console.log('setting the active car');
      // const res = await api.get(`/api/cars/${Car.id}`)
      // console.log('[GETTING A CAR FROM THE RES]', res.data);
      // AppState.activeCar = new Car(res.data)
      AppState.activeCar = Car 
      console.log('this is an active car');
    }

    async getCars() {
    const res = await api.get('api/cars')
    AppState.cars = res.data.map(c => new Car(c))
    console.log(AppState.cars);
  }

  async editCar(carData) {
    let res = await api.put(`api/cars/${carData.id}`, carData)
    let car = new Car(res.data)
    let carIndex = AppState.cars.findIndex(c => c.id == carData.id)
    AppState.cars.splice(carIndex, 1, car)
  }

  // Example for making a POST request
  async createCar(carFormData) {

    let res = await api.post('api/cars', carFormData)
    // ALWAYS LOOK AT YOUR RESPONSE
    let car = new Car(res.data)
    AppState.cars = [...AppState.cars, car]
  }

  async deleteCar(carId) {
    let url = `api/cars/${carId}` // string interpolation
    await api.delete(url)
    AppState.cars = AppState.cars.filter(c => c.id != carId)
  }


}

export const carsService = new CarsService()