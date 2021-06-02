import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicencePlate(licence_plate: string): Promise<Car>;
  listAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]>;
}

export { ICarsRepository };
