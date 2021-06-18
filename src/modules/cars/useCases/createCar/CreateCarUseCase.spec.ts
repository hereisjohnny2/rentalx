import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Name",
      description: "Car Description",
      daily_rate: 100,
      licence_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car Brand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with a existent licence plate", async () => {
    await createCarUseCase.execute({
      name: "Car 1",
      description: "Car Description",
      daily_rate: 100,
      licence_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car Brand",
      category_id: "category",
    });

    await expect(
      createCarUseCase.execute({
        name: "Car 2",
        description: "Car Description",
        daily_rate: 100,
        licence_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Car Brand",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  });

  it("should create a car with availability by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car 1",
      description: "Car Description",
      daily_rate: 100,
      licence_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car Brand",
      category_id: "category",
    });
    expect(car.available).toBe(true);
  });
});
