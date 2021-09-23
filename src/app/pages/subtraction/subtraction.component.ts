import { Component, OnInit } from '@angular/core';
import { OperationComponent } from 'src/app/shared/models/operation-component.interface';
import { MathOperation } from 'src/app/shared/models/operation.enum';

@Component({
  selector: 'app-subtraction',
  templateUrl: './subtraction.component.html',
  styleUrls: ['./subtraction.component.scss'],
})
export class SubtractionComponent implements OnInit, OperationComponent {
  operation = MathOperation.Subtraction;
  isCorrect?: boolean | undefined;
  numbers: number[] = [];

  ngOnInit(): void {
    this.generateNewQestion();
  }

  checkAnswer(answer: number): void {
    const diff = this.numbers.reduce((a: number, b: number) => a - b);
    this.isCorrect = answer === diff;
  }

  generateNewQestion(forcedNumbers?: number[]): void {
    const numberOfnumbers = 2;
    const maxNumberValue = 9999;

    const randomNumbers: number[] = [];

    for (let i = 0; i < numberOfnumbers; i++) {
      const num = Math.floor(Math.random() * maxNumberValue) + 1;
      randomNumbers.push(num);
    }

    const numbers = forcedNumbers || randomNumbers;

    numbers.sort(this.descending);

    this.numbers = numbers;
    this.isCorrect = undefined;
  }

  private descending(a: number, b: number): number {
    if (b < a) {
      return -1;
    }

    if (a < b) {
      return 1;
    }

    return 0;
  }
}
