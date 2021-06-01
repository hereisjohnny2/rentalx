import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class ClassRepositoryIMemory implements ICarsRepository {
  private cars: Car[] = [];
  async create({
    name,
    description,
    daily_rate,
    licence_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<void> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      licence_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);
  }
}

export { ClassRepositoryIMemory };
