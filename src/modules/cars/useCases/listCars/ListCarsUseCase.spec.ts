import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car 1 Description",
      daily_rate: 100,
      licence_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car Brand",
      category_id: "category",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car1]);
  });

  it("should be able to list all available cars by name", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car 1 Description",
      daily_rate: 100,
      licence_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car Brand",
      category_id: "category",
    });

    const cars = await listCarsUseCase.execute({ name: "Car1" });

    expect(cars).toEqual([car1]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car 1 Description",
      daily_rate: 100,
      licence_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car Brand",
      category_id: "category",
    });

    const cars = await listCarsUseCase.execute({ brand: "Car Brand" });

    expect(cars).toEqual([car1]);
  });

  it("should be able to list all available cars by category", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car 1 Description",
      daily_rate: 100,
      licence_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car Brand",
      category_id: "category",
    });

    const cars = await listCarsUseCase.execute({ category_id: "category" });

    expect(cars).toEqual([car1]);
  });
});
