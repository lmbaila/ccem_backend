export const EVENT_REPOSITORY = Symbol('EVENT_REPOSITORY');

/**
 * Relacionamento de Servicos Impactados (EventService)
 */
export interface ServiceImpactInput {
  serviceId: number;
  startAt: Date;
  endAt?: Date | null;
}

/**
 * Feedbacks associados ao evento (Feedback)
 */
export interface FeedbackInput {
  comment: string;
  rating?: number | null;
}

/**
 * DTO de criacao de Evento
 */
export interface CreateEventInput {
  summary: string;
  description: string;
  ticket?: string | null;
  dashboardId: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

  /** Servicos impactados (obrigatorio pelo menos um) */
  services: ServiceImpactInput[];

  /** IDs dos tecnicos associados */
  technicianIds?: number[];

  /** Feedbacks iniciais opcionais */
  feedbacks?: FeedbackInput[];

  /** Autor do evento (usado no guard JWT -> req.user.sub) */
  createdById: number;

  /** Codigo alfanumerico gerado automaticamente */
  code: string;
}

/**
 * DTO de atualizacao de Evento
 */
export interface UpdateEventInput {
  summary?: string;
  description?: string;
  ticket?: string | null;
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

  services?: ServiceImpactInput[];
  technicianIds?: number[];

  /** Permitir adicionar novos feedbacks */
  feedbacks?: FeedbackInput[];
}

/**
 * Contrato base do repositorio de eventos
 */
export interface IEventRepository {
  list(params: any): Promise<any[]>;
  count(params: any): Promise<number>;
  get(id: string): Promise<any | null>;
  create(input: CreateEventInput): Promise<any>;
  update(id: string, input: UpdateEventInput): Promise<any>;
  delete(id: string): Promise<any>;
  getByCode(code: string): Promise<any>;
}
