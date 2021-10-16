import { Component, OnInit } from '@angular/core';
import { Answer } from '@shared/models/answer.interface';
import { QuestionConfigService } from 'src/app/core/services/question-config/question-config.service';
import { OperationComponent } from 'src/app/shared/models/operation-component.interface';
import { MathOperation } from 'src/app/shared/models/operation.enum';

@Component({
  selector: 'app-adition',
  templateUrl: './adition.component.html',
  styleUrls: ['./adition.component.scss'],
})
export class AditionComponent implements OnInit, OperationComponent {
  operation = MathOperation.Adition;
  numbers: number[] = [];
  isCorrect?: boolean;
  private minNumberOfNumbers = 2;

  constructor(private questionConfigService: QuestionConfigService) {}

  ngOnInit(): void {
    this.generateNewQestion();
  }

  checkAnswer(answer: Answer): void {
    const sum = this.numbers.reduce((a: number, b: number) => a + b);
    this.isCorrect = answer.quotient === sum;
  }

  generateNewQestion(): void {
    const aditionConfig = this.questionConfigService.getConfig().adition;

    const minQuantity = this.minNumberOfNumbers;
    const maxQuantity = aditionConfig.maxNumberOfNumbers;
    const maxValue = aditionConfig.maxValue;

    const quantity =
      Math.floor(Math.random() * (maxQuantity - minQuantity + 1)) + minQuantity;

    const randomNumbers: number[] = [];

    for (let i = 0; i < quantity; i++) {
      const num = Math.floor(Math.random() * maxValue) + 1;
      randomNumbers.push(num);
    }

    this.numbers = randomNumbers;
    this.isCorrect = undefined;
  }
}
