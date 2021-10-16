import { Component, OnInit } from '@angular/core';
import { Answer } from '@shared/models/answer.interface';
import { QuestionConfigService } from 'src/app/core/services/question-config/question-config.service';
import { OperationComponent } from 'src/app/shared/models/operation-component.interface';
import { MathOperation } from 'src/app/shared/models/operation.enum';

@Component({
  selector: 'app-multiplication',
  templateUrl: './multiplication.component.html',
  styleUrls: ['./multiplication.component.scss'],
})
export class MultiplicationComponent implements OnInit, OperationComponent {
  operation = MathOperation.Multiplication;
  numbers: number[] = [];
  isCorrect?: boolean | undefined;
  private minNumberOfNumbers = 2;

  constructor(private questionConfigService: QuestionConfigService) {}

  ngOnInit(): void {
    this.generateNewQestion();
  }

  checkAnswer(answer: Answer): void {
    const product = this.numbers.reduce((a: number, b: number) => a * b);
    this.isCorrect = answer.quotient === product;
  }

  generateNewQestion(): void {
    const multiplicationConfig =
      this.questionConfigService.getConfig().multiplication;

    const minQuantity = this.minNumberOfNumbers;
    const maxQuantity = multiplicationConfig.maxNumberOfNumbers;
    const maxValues = multiplicationConfig.maxValues;

    const quantity =
      Math.floor(Math.random() * (maxQuantity - minQuantity + 1)) + minQuantity;

    const randomNumbers: number[] = [];

    for (let i = 0; i < quantity; i++) {
      const maxValue = maxValues[i] || maxValues[0] || 10;
      const num = Math.floor(Math.random() * maxValue) + 1;
      randomNumbers.push(num);
    }

    this.numbers = randomNumbers;
    this.isCorrect = undefined;
  }
}
