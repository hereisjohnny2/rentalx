import { Specification } from "../../entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../ISpectificationRepository";

class SpecificationsRepository implements ISpecificationRepository {
  private spectifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.spectifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }
    return SpecificationsRepository.INSTANCE;
  }

  create({ description, name }: ICreateSpecificationDTO): void {
    const spectification = new Specification();
    Object.assign(spectification, {
      name,
      description,
      created_at: new Date(),
    });
    this.spectifications.push(spectification);
  }

  findByName(name: string): Specification {
    const specification = this.spectifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }

  list(): Specification[] {
    return this.spectifications;
  }
}

export { SpecificationsRepository };
