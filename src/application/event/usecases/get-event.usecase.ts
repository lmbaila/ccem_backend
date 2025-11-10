import { BadRequestException, Injectable, NotFoundException, Inject } from '@nestjs/common';
import { EVENT_REPOSITORY, IEventRepository } from '../../../core/repositories/event.repository';
import { GetEventByIdOrCodeDto } from '../dto/get-event-by-id-param.dto';

@Injectable()
export class GetEventUseCase {
  constructor(@Inject(EVENT_REPOSITORY) private readonly repo: IEventRepository) {}

  async execute(input: GetEventByIdOrCodeDto) {
    const { id, code } = input;

    // ✅ Validacao: precisa de pelo menos um parametro
    if (!id && !code) {
      throw new BadRequestException('Deve ser informado o ID ou o código do evento.');
    }

    // ✅ Buscar por ID ou Código
    const event = id ? await this.repo.get(id) : await this.repo.getByCode(code!);

    // ✅ Verificar se existe
    if (!event) {
      throw new NotFoundException('Evento não encontrado.');
    }

    return event;
  }
}
