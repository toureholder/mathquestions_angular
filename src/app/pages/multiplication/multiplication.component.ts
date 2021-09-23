import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.generateNewQestion();
  }

  checkAnswer(answer: number): void {
    const product = this.numbers.reduce((a: number, b: number) => a * b);
    this.isCorrect = answer === product;
  }

  generateNewQestion(): void {
    const numberOfnumbers = 2;
    const maxNumberValue = 10;

    const randomNumbers: number[] = [];

    for (let i = 0; i < numberOfnumbers; i++) {
      const num = Math.floor(Math.random() * maxNumberValue) + 1;
      randomNumbers.push(num);
    }

    this.numbers = randomNumbers;
    this.isCorrect = undefined;
  }
}
