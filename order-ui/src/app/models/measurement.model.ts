export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export class Measurement {
  measurementId: number;
  userId: number;
  tailorId: number;
  gender: Gender;
  category: string;
  design: string;
  measurements: string;
  price: number;

  constructor(
    measurementId: number,
    userId: number,
    tailorId: number,
    gender: Gender,
    category: string,
    design: string,
    measurements: string,
    price: number
  ) {
    this.measurementId = measurementId;
    this.userId = userId;
    this.tailorId = tailorId;
    this.gender = gender;
    this.category = category;
    this.design = design;
    this.measurements = measurements;
    this.price = price;
  }
}
