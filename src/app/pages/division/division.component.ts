import { Component, OnInit } from '@angular/core';
import { Answer } from '@shared/models/answer.interface';
import { OperationComponent } from '@shared/models/operation-component.interface';
import { MathOperation } from '@shared/models/operation.enum';
import { QuestionConfigService } from 'src/app/core/services/question-config/question-config.service';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss'],
})
export class DivisionComponent implements OnInit, OperationComponent {
  operation = MathOperation.Division;
  numbers: number[] = [];
  isCorrect?: boolean | undefined;
  private minNumberOfNumbers = 2;

  constructor(private questionConfigService: QuestionConfigService) {}

  ngOnInit(): void {
    this.generateNewQestion();
  }

  checkAnswer(answer: Answer): void {
    const quotient = Math.floor(this.numbers[0] / this.numbers[1]);
    const remainder = this.numbers[0] % this.numbers[1];

    this.isCorrect =
      answer.quotient === quotient &&
      (answer.remainder === remainder || (!remainder && !answer.remainder));
  }

  generateNewQestion(): void {
    const divisionConfig = this.questionConfigService.getConfig().division;

    const minQuantity = this.minNumberOfNumbers;
    const maxQuantity = divisionConfig.maxNumberOfNumbers;
    const maxValues = divisionConfig.maxValues;

    const quantity =
      Math.floor(Math.random() * (maxQuantity - minQuantity + 1)) + minQuantity;

    const randomNumbers: number[] = [];

    for (let i = 0; i < quantity; i++) {
      const maxConfigValue = maxValues[i] || maxValues[0] || 10;

      const maxValue =
        i > 0 ? Math.min(randomNumbers[i - 1], maxConfigValue) : maxConfigValue;

      const num = Math.floor(Math.random() * maxValue) + 1;

      randomNumbers.push(num);
    }

    this.numbers = randomNumbers;
    this.isCorrect = undefined;
  }
}
