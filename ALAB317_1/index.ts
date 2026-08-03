// @ts-check

// this is the main vehicle class
// every vehicle will get the same basic information from this class
class Vehicle {
  make: string;
  model: string;
  wheels: number;

  // this is a literal union type
  // status can only be started or stopped
  status: "started" | "stopped" = "stopped";

  // these types tell typescript what information the constructor needs
  constructor(make: string, model: string, wheels: number) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  // void means this method does not return anything
  start(): void {
    this.status = "started";
  }

  stop(): void {
    this.status = "stopped";
  }
}

class Car extends Vehicle {
  constructor(make: string, model: string) {
    super(make, model, 4);
  }
}

class MotorCycle extends Vehicle {
  constructor(make: string, model: string) {
    super(make, model, 2);
  }
}

// this is a generic class
// T is a placeholder for the type we want to use when we create an NCycle
class NCycle<T> {
  // make and model can each be one T value or an array of T values
  make: T | T[];
  model: T | T[];
  wheels: number;

  constructor(make: T | T[], model: T | T[], wheels: number) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }
}

// this parameter has the Vehicle type
// this means the function expects a Vehicle or a class that extends Vehicle
function printStatus(vehicle: Vehicle): void {
  if (vehicle.status === "started") {
    console.log("The vehicle is running.");
  } else {
    console.log("The vehicle is stopped.");
  }
}

const myHarley = new MotorCycle("Harley-Davidson", "Low Rider S");
myHarley.start();
printStatus(myHarley);
console.log(myHarley.make.toUpperCase());

const myBuick = new Car("Buick", "Regal");
myBuick.wheels = myBuick.wheels - 1;
console.log(myBuick.wheels);
console.log(myBuick.model);
