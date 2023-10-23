class Car {
    constructor(make, model, year) {
      this.make = make;
      this.model = model;
      this.year = year;
      this._speed = 0;
    }
  
    get speed() {
      return this._speed;
    }
  
    get model() {
        return this.model;
    }

    set model(model) {
        this.model = model;

    }
    
    set speed(speed) {
      if (speed >= 0) {
        this._speed = speed;
      } else {
        console.log("Скорость не может быть отрицательной.");
      }
    }
  
    accelerate(amount) {
      this.speed += amount;
    }
  
    brake(amount) {
      this.speed -= amount;
    }
}

class ElectricCar extends Car {
    constructor(make, model, year, batteryCapacity) {
      super(make, model, year);
      this.batteryCapacity = batteryCapacity;
    }
  }