export interface Car {
  id: number;
  brand: string;
  model: string;
  description: string;
  year: number;
  kilometers: number;
  price: string;
}

export type CarId = Pick<Car, 'id'>;
export type CarBrand = Pick<Car, 'brand'>;
export type CarModel = Pick<Car, 'model'>;
export type CarDescription = Pick<Car, 'description'>;
export type CarYear = Pick<Car, 'year'>;
export type CarKilometers = Pick<Car, 'kilometers'>;
export type CarPrice = Pick<Car, 'price'>;

export type CarList = Car[];
