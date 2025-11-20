export const ORIGIN_REPOSITORY = Symbol('ORIGIN_REPOSITORY');
import { CreateOriginDto } from 'src/application/origin/dto/create-origin.dto';
import { UpdateOriginDto } from 'src/application/origin/dto/update-origin.dto';

export interface IOriginRepository {
  create(data: CreateOriginDto): Promise<any>;
  update(id: number, data: UpdateOriginDto): Promise<any>;
  delete(id: number): Promise<any>;
  findOne(id: number): Promise<any>;
  findByName(name: string): Promise<any>;
  list(search?: string, page?: number, limit?: number): Promise<any>;
}
