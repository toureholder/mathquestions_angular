import { Component, OnInit } from '@angular/core';
import { QuestionConfigService } from 'src/app/core/services/question-config/question-config.service';
import { OperationComponent } from 'src/app/shared/models/operation-component.interface';
import { MathOperation } from 'src/app/shared/models/operation.enum';

@Component({
  selector: 'app-subtraction',
  templateUrl: './subtraction.component.html',
  styleUrls: ['./subtraction.component.scss'],
})
export class SubtractionComponent implements OnInit, OperationComponent {
  operation = MathOperation.Subtraction;
  numbers: number[] = [];
  isCorrect?: boolean | undefined;
  private minNumberOfNumbers = 2;

  constructor(private questionConfigService: QuestionConfigService) {}

  ngOnInit(): void {
    this.generateNewQestion();
  }

  checkAnswer(answer: number): void {
    const diff = this.numbers.reduce((a: number, b: number) => a - b);
    this.isCorrect = answer === diff;
  }

  generateNewQestion(forcedOptions?: NewSubtractionsQuestionOptions): void {
    let randomNumbers: number[] = [];
    let diff = -1;

    while (diff < 0) {
      randomNumbers = this.getRandomNumbers();
      diff = randomNumbers.reduce((a: number, b: number) => a - b);
    }

    const numbers = forcedOptions?.numbers || randomNumbers;

    this.numbers = numbers.sort(this.descending);
    this.isCorrect = undefined;
  }

  private getRandomNumbers(): number[] {
    const subtractionConfig =
      this.questionConfigService.getConfig().subtraction;

    const minQuantity = this.minNumberOfNumbers;
    const maxQuantity = subtractionConfig.maxNumberOfNumbers;
    const maxValue = subtractionConfig.maxValue;

    const quantity =
      Math.floor(Math.random() * (maxQuantity - minQuantity + 1)) + minQuantity;

    const randomNumbers: number[] = [];

    for (let i = 0; i < quantity; i++) {
      const num = Math.floor(Math.random() * maxValue) + 1;
      randomNumbers.push(num);
    }

    return randomNumbers;
  }

  private descending(a: number, b: number): number {
    return b < a ? -1 : a < b ? 1 : 0;
  }
}

export interface NewSubtractionsQuestionOptions {
  numbers?: number[];
}
