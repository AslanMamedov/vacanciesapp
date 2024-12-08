import { IUserData, IVacany } from './interface';

export type IUserResultData = Omit<IUserData, 'id'>;
export type IVacancyResultData = Omit<IVacany, 'id' | 'questionId'>;
