import { Answer } from './answer.interface';
import { MathOperation } from './operation.enum';

export interface OperationComponent {
  operation: MathOperation;
  numbers: number[];
  isCorrect?: boolean;
  checkAnswer(answer: Answer): void;
  generateNewQestion(): void;
}
