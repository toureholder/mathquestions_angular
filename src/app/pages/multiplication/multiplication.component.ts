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
    const firstNumber = Math.floor(Math.random() * 99) + 1;
    const secondNumber = Math.floor(Math.random() * 6) + 1;

    this.numbers = [firstNumber, secondNumber];
    this.isCorrect = undefined;
  }
}
