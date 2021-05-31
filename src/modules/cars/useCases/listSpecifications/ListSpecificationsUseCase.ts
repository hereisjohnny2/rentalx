import { inject, injectable } from "tsyringe";

import { Specification } from "../../infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpectificationRepository";

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationRepository
  ) {}
  async execute(): Promise<Specification[]> {
    const repositories = await this.specificationsRepository.list();
    return repositories;
  }
}

export { ListSpecificationsUseCase };
