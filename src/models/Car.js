export class Car{
  constructor(data){
    this.id = data.id || ''
    this.createdAt = data.createdAt
    this.description = data.description
    this.img = data.imgUrl
    this.make = data.make
    this.model = data.model
    this.price = data.price
    this.year = data.year
  }
}