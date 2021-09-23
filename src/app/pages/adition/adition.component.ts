import { Component, OnInit } from '@angular/core';
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
  maxNumberOfNumbers = 3;
  minNumberOfNumbers = 2;
  minNumberValue = 0;
  maxNumberValue = 5000;
  isCorrect?: boolean;

  ngOnInit(): void {
    this.generateNewQestion();
  }

  checkAnswer(answer: number): void {
    const sum = this.numbers.reduce((a: number, b: number) => a + b);
    this.isCorrect = answer === sum;
  }

  generateNewQestion(): void {
    const min = this.minNumberOfNumbers;
    const max = this.maxNumberOfNumbers;
    const quantity = Math.floor(Math.random() * (max - min + 1)) + min;

    const randomNumbers: number[] = [];

    for (let i = 0; i < quantity; i++) {
      const num = Math.floor(Math.random() * this.maxNumberValue) + 1;
      randomNumbers.push(num);
    }

    this.numbers = randomNumbers;
    this.isCorrect = undefined;
  }
}
