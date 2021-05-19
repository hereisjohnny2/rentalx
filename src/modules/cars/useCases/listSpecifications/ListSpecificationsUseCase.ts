import { Specification } from "../../entities/Specification";
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationRepository";

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) {}
  execute(): Specification[] {
    return this.specificationsRepository.list();
  }
}

export { ListSpecificationsUseCase };
