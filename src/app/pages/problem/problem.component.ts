import { Component, OnInit } from '@angular/core';
import { Answer } from '@shared/models/answer.interface';
import { AditionService } from 'src/app/core/services/adition/adition.service';
import { MultiplicationService } from 'src/app/core/services/multiplication/multiplication.service';
import { SubtractionService } from 'src/app/core/services/subtraction/subtraction.service';
import { OperationComponent } from 'src/app/shared/models/operation-component.interface';
import { MathOperation } from 'src/app/shared/models/operation.enum';
import { Problem } from './models/problem.interface';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss'],
})
export class ProblemComponent implements OnInit, OperationComponent {
  problem?: Problem;
  operation = MathOperation.Subtraction;
  numbers: number[] = [];
  isCorrect?: boolean | undefined;
  userInput: { quotient?: number; remainder?: number } = {};

  constructor(
    private subractionService: SubtractionService,
    private aditionService: AditionService,
    private multiplicationService: MultiplicationService
  ) {}

  ngOnInit(): void {
    this.generateNewQestion();
  }

  checkAnswer(answer: { quotient?: number; remainder?: number }): void {
    if (!this.problem) {
      return;
    }

    const correctAnswer = this.problem.correctAnswer;

    this.isCorrect =
      answer.quotient === correctAnswer.quotient &&
      answer.remainder === correctAnswer.remainder;
  }

  generateNewQestion(): void {
    const pool = [
      this.subractionService.getProblem(),
      this.aditionService.getProblem(),
      this.multiplicationService.getProblem(),
    ];

    const index = Math.floor(Math.random() * pool.length);

    this.problem = pool[index];

    this.isCorrect = undefined;
    this.userInput = {};
  }
}
