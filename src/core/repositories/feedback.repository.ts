export const FEEDBACK_REPOSITORY = Symbol('FEEDBACK_REPOSITORY');
export interface DeleteFeedbackInput {
  eventId: string;
  feedbackId: number;
  userId: number;
  userRole?: string;
}
export interface IFeedbackRepository {
  list(): Promise<any[]>;
  create(data: any): Promise<any>;
  update(id: number, data: any): Promise<any>;
  delete(input: DeleteFeedbackInput): Promise<any>;
}
