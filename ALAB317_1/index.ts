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

  // the index starts at 0 if we do not give the method a number
  print(index: number = 0): void {
    // checking if both make and model are single values
    if (!Array.isArray(this.make) && !Array.isArray(this.model)) {
      console.log(`This is a ${this.make} ${this.model} NCycle.`);
    } else if (
      // checking if both values are arrays before using an index
      Array.isArray(this.make) &&
      Array.isArray(this.model) &&
      index >= 0 &&
      index < this.make.length &&
      index < this.model.length
    ) {
      console.log(
        `This NCycle has a ${this.make[index]} ${this.model[index]} at ${index}.`
      );
    } else {
      console.log("This NCycle was not created properly.");
    }
  }

  printAll(): void {
    // this part works when make and model are both single values
    if (!Array.isArray(this.make) && !Array.isArray(this.model)) {
      console.log(`This is a ${this.make} ${this.model} NCycle.`);
    } else if (Array.isArray(this.make) && Array.isArray(this.model)) {
      // Math.min gives us the length of the shorter array
      // this keeps the loop from going past either array
      const amount = Math.min(this.make.length, this.model.length);

      if (amount === 0) {
        console.log("This NCycle was not created properly.");
      } else {
        // this prints every make and model pair that exists in both arrays
        for (let index = 0; index < amount; index++) {
          console.log(
            `This NCycle has a ${this.make[index]} ${this.model[index]} at ${index}.`
          );
        }
      }
    } else {
      // one value is an array and the other value is not an array
      console.log("This NCycle was not created properly.");
    }
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

// these are simple tests for the NCycle class
// this first test uses numbers for the single make and model values
const numberNCycle = new NCycle<number>(100, 200, 2);
numberNCycle.print();
numberNCycle.printAll();

// this test uses strings for the single make and model values
const stringNCycle = new NCycle<string>("Honda", "CBR", 2);
stringNCycle.print();

// both make and model are arrays in this test
// index 1 exists in both arrays but index 5 does not exist
const arrayNCycle = new NCycle<string>(
  ["Honda", "Yamaha"],
  ["CBR", "R1"],
  2
);
arrayNCycle.print(1);
arrayNCycle.print(5);
arrayNCycle.printAll();

// these arrays have different lengths
// printAll only prints the values that have a match in both arrays
const differentLengthNCycle = new NCycle<string>(
  ["Honda", "Yamaha", "Suzuki"],
  ["CBR"],
  2
);
differentLengthNCycle.printAll();

// both arrays are empty so there are no matching values to print
const emptyNCycle = new NCycle<string>([], [], 2);
emptyNCycle.printAll();

// the union lets this test use a string array and a single number
// the class is still typed without using a loose type
const wrongNCycle = new NCycle<string | number>(["Honda"], 500, 2);
wrongNCycle.print();
wrongNCycle.printAll();
