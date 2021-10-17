import { Answer } from '@shared/models/answer.interface';

export interface Problem {
  text: string;
  correctAnswer: Answer;
  divisor?: number;
}
