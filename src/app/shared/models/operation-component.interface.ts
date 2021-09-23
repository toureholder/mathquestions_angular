import { MathOperation } from './operation.enum';

export interface OperationComponent {
  operation: MathOperation;
  numbers: number[];
  isCorrect?: boolean;
  checkAnswer(answer: number): void;
  generateNewQestion(): void;
}
