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

function withTurboAcceleration(carClass) {
  return class extends carClass {
    accelerate(amount) {
      super.accelerate(amount * 2); 
    }
  };
}

const TurboElectricCar = withTurboAcceleration(ElectricCar);

const myCar = new TurboElectricCar("Tesla", "Model 3", 2022, 75);
console.log(myCar);

myCar.accelerate(50);
console.log("Turbo speed:", myCar.speed);


const allArgsValid = function(fn) {
  return function(...args) {
  if (args.length != fn.length) {
      throw new Error('Only submit required number of params');
    }
    const validArgs = args.filter(arg => Number.isInteger(arg));
    if (validArgs.length < fn.length) {
      throw new TypeError('Argument cannot be a non-integer');
    }
    return fn(...args);
  }
}

let multiply = function(a,b){
	return a*b;
}

multiply = allArgsValid(multiply);
console.log(multiply(4,4));
