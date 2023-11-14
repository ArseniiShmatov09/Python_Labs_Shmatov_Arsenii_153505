function New_Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this._speed = 0; // Приватное свойство
  }
  
  // Геттер и сеттер для скорости
  New_Car.prototype.getSpeed = function () {
    return this._speed;
  };
  
  New_Car.prototype.setSpeed = function (speed) {
    if (speed >= 0) {
      this._speed = speed;
    } else {
      console.log("Скорость не может быть отрицательной.");
    }
  };
  
  // Метод для ускорения
  New_Car.prototype.accelerate = function (amount) {
    this.setSpeed(this.getSpeed() + amount);
  };
  
  // Метод для торможения
  New_Car.prototype.brake = function (amount) {
    this.setSpeed(this.getSpeed() - amount);
  };
  
  // Класс-наследник ElectricCar
  function New_ElectricCar(make, model, year, batteryCapacity) {
    New_Car.call(this, make, model, year);
    this.batteryCapacity = batteryCapacity;
  }
  
  // Наследование прототипа
  New_ElectricCar.prototype = Object.create(New_Car.prototype);
  New_ElectricCar.prototype.constructor = New_ElectricCar;
  
  // Добавим декоратор для метода accelerate
  function withTurboAcceleration(car) {
    const originalAccelerate = car.accelerate;
    car.accelerate = function (amount) {
      originalAccelerate.call(this, amount * 2); // Ускоряем вдвое
    };
    return car;
  }
  
  const my2Car = new New_ElectricCar("Tesla", "Model 3", 2022, 75);
  console.log(myCar);
  
  my2Car.accelerate(50);
  console.log("Current speed:", my2Car.getSpeed());
  
  // Применение декоратора
  const turboCar = withTurboAcceleration(my2Car);
  turboCar.accelerate(50);
  console.log("Turbo speed:", turboCar.getSpeed());